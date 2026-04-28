import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { competition, email } = await req.json()
    if (!competition || !email?.trim()) {
      return NextResponse.json({ error: 'Email and competition are required.' }, { status: 400 })
    }
    await prisma.notifySignup.create({
      data: { competition, email: email.trim().toLowerCase() },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save signup.' }, { status: 500 })
  }
}
