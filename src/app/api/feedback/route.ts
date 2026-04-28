import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { entryId, competition, responses } = await req.json()

    if (!entryId || !competition || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

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
