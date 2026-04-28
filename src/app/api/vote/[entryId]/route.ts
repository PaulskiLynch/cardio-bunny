import type { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(
  req: NextRequest,
  ctx: RouteContext<'/api/vote/[entryId]'>
) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Sign in to vote.' }, { status: 401 })

  const { entryId } = await ctx.params
  const body = await req.json().catch(() => ({}))
  const shareRef: string | undefined = body?.ref

  const entry = await prisma.entry.findFirst({ where: { entryId, status: 'approved' } })
  if (!entry) return Response.json({ error: 'Entry not found.' }, { status: 404 })

  const isReferral = shareRef === entryId

  try {
    await prisma.vote.create({
      data: { entryId, userId, competition: entry.competition, isReferral },
    })
  } catch {
    return Response.json({ error: 'Already voted.' }, { status: 409 })
  }

  // Every 10 referral votes earns the entry +5 bonus votes
  const newReferralCount = isReferral ? entry.referralVotes + 1 : entry.referralVotes
  const bonusThisVote    = isReferral && newReferralCount % 10 === 0 ? 5 : 0
  const totalVoteInc     = 1 + bonusThisVote

  try {
    const updated = await prisma.entry.update({
      where: { id: entry.id },
      data: {
        voteCount:     { increment: totalVoteInc },
        ...(isReferral     && { referralVotes: { increment: 1 } }),
        ...(bonusThisVote  && { bonusVotes:    { increment: bonusThisVote } }),
      },
    })
    return Response.json({
      voteCount:    updated.voteCount,
      bonusAwarded: bonusThisVote > 0,
    })
  } catch {
    return Response.json({ voteCount: entry.voteCount + totalVoteInc })
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<'/api/vote/[entryId]'>
) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Sign in to vote.' }, { status: 401 })

  const { entryId } = await ctx.params
  const entry = await prisma.entry.findFirst({ where: { entryId, status: 'approved' } })
  if (!entry) return Response.json({ error: 'Entry not found.' }, { status: 404 })

  const deleted = await prisma.vote.deleteMany({ where: { entryId, userId } })
  if (deleted.count === 0) return Response.json({ error: 'No vote to remove.' }, { status: 404 })

  try {
    const updated = await prisma.entry.update({
      where: { id: entry.id },
      data: { voteCount: { decrement: entry.voteCount > 0 ? 1 : 0 } },
    })
    return Response.json({ voteCount: updated.voteCount })
  } catch {
    return Response.json({ voteCount: Math.max(0, entry.voteCount - 1) })
  }
}
