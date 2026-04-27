import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const name    = (form.get('name') as string)?.trim()
    const company = (form.get('company') as string)?.trim()
    const email   = (form.get('email') as string)?.trim()
    const phone   = (form.get('phone') as string)?.trim() || null
    const message = (form.get('message') as string)?.trim()

    if (!name || !company || !email || !message) {
      return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    await prisma.demoRequest.create({
      data: { name, company, email, phone, message },
    })

    return Response.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
