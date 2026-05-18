import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { formLimiter, getIp } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const { success } = await formLimiter.limit(getIp(req))
  if (!success) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

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
