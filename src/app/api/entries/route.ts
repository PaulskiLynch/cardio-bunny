import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { saveImage } from '@/lib/upload'
import { generateEntryId } from '@/lib/entryId'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()

    const setName      = (form.get('setName') as string)?.trim()
    const designerName = (form.get('designerName') as string)?.trim()
    const contact      = (form.get('contact') as string)?.trim()
    const hook         = (form.get('hook') as string)?.trim()
    const competition  = (form.get('competition') as string)?.trim() || 'biedronka'
    const image        = form.get('image') as File | null

    if (!setName || !designerName || !contact || !hook) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!image || !image.size) {
      return Response.json({ error: 'A design image is required.' }, { status: 400 })
    }

    const imageUrl = await saveImage(image)

    // Collision-safe entry ID
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

    return Response.json({ entryId: entry.entryId }, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
