import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { formLimiter, getIp } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const { success } = await formLimiter.limit(getIp(req))
  if (!success) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

  try {
    const { entryId, competition, responses } = await req.json()

    if (!entryId || !competition || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const entry = await prisma.entry.findFirst({ where: { entryId, competition }, select: { id: true } })
    if (!entry) return NextResponse.json({ error: 'Entry not found.' }, { status: 404 })

    await prisma.feedbackResponse.createMany({
      data: responses.map((r: { questionId: string; answer: string }) => ({
        entryId,
        competition,
        questionId: r.questionId,
        answer: r.answer,
      })),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
  }
}
