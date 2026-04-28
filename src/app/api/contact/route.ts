import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const contactName = (form.get('name') as string)?.trim()
    const brandName   = (form.get('company') as string)?.trim()
    const email       = (form.get('email') as string)?.trim()
    const phone       = (form.get('phone') as string)?.trim() || ''
    const brief       = (form.get('message') as string)?.trim()

    if (!contactName || !brandName || !email || !brief) {
      return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    await prisma.loopInquiry.create({
      data: { brandName, contactName, email, phone, brief, campaignType: 'contact' },
    })

    return Response.json({ ok: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
