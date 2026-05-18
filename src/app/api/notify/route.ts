import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  let body: { competition?: string; email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { competition, email } = body
  if (!competition || !email?.trim()) {
    return NextResponse.json({ error: 'Email and competition are required.' }, { status: 400 })
  }

  try {
    await prisma.notifySignup.upsert({
      where: { competition_email: { competition, email: email.trim().toLowerCase() } },
      update: {},
      create: { competition, email: email.trim().toLowerCase() },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save signup.' }, { status: 500 })
  }
}
