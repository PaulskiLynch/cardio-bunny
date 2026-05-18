import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { saveImage, validateEntryImage } from '@/lib/upload'
import { generateEntryId } from '@/lib/entryId'
import { notifyNewEntry } from '@/lib/email'
import { submitLimiter, getIp } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const { success } = await submitLimiter.limit(getIp(req))
  if (!success) return Response.json({ error: 'Too many submissions. Try again later.' }, { status: 429 })

  try {
    const form = await req.formData()

    const setName      = (form.get('setName') as string)?.trim()
    const designerName = (form.get('designerName') as string)?.trim()
    const contact      = (form.get('contact') as string)?.trim().toLowerCase()
    const hook         = (form.get('hook') as string)?.trim()
    const competition  = (form.get('competition') as string)?.trim() || 'biedronka'
    const image        = form.get('image') as File | null

    if (!setName || !designerName || !contact || !hook) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (contact.length > 255) {
      return Response.json({ error: 'Contact field is too long.' }, { status: 400 })
    }
    if (designerName.length > 100 || setName.length > 200 || hook.length > 500) {
      return Response.json({ error: 'One or more fields exceed the maximum length.' }, { status: 400 })
    }

    if (!image || !image.size) {
      return Response.json({ error: 'A design image is required.' }, { status: 400 })
    }

    const imageError = await validateEntryImage(image)
    if (imageError) return Response.json({ error: imageError }, { status: 400 })

    // One entry per email per competition
    const existing = await prisma.entry.findFirst({ where: { contact, competition } })
    if (existing) {
      return Response.json(
        { error: 'You have already submitted an entry for this competition.' },
        { status: 409 }
      )
    }

    const imageUrl = await saveImage(image)

    let entryId = generateEntryId()
    let attempt = 0
    while (await prisma.entry.findUnique({ where: { entryId } })) {
      entryId = generateEntryId()
      if (++attempt > 10) throw new Error('Could not generate unique entry ID')
    }

    const loop = await prisma.loop.findUnique({ where: { slug: competition } }).catch(() => null)
    const status = loop?.autoApprove ? 'approved' : 'pending'

    const entry = await prisma.entry.create({
      data: { entryId, designerName, contact, setName, hook, imageUrl, competition, status },
    })

    if (status === 'pending') {
      await notifyNewEntry({ entryId: entry.entryId, designerName, competition, setName })
    }

    return Response.json({ entryId: entry.entryId }, { status: 201 })
  } catch {
    return Response.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
