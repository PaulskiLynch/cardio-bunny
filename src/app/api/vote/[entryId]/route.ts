import type { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { voteLimiter } from '@/lib/ratelimit'

export async function POST(
  req: NextRequest,
  ctx: RouteContext<'/api/vote/[entryId]'>
) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Sign in to vote.' }, { status: 401 })

  const { success } = await voteLimiter.limit(userId)
  if (!success) return Response.json({ error: 'Too many votes. Try again later.' }, { status: 429 })

  const { entryId } = await ctx.params
  const body = await req.json().catch(() => ({}))
  const shareRef: string | undefined = body?.ref

  const entry = await prisma.entry.findFirst({ where: { entryId, status: 'approved' } })
  if (!entry) return Response.json({ error: 'Entry not found.' }, { status: 404 })

  const isReferral = shareRef === entryId

  try {
    // Single transaction: create vote + update counts atomically
    const result = await prisma.$transaction(async (tx) => {
      await tx.vote.create({
        data: { entryId, userId, competition: entry.competition, isReferral },
      })

      // Increment base counts first; read the new referralVotes to detect bonus threshold
      const afterVote = await tx.entry.update({
        where: { id: entry.id },
        data: {
          voteCount:    { increment: 1 },
          ...(isReferral && { referralVotes: { increment: 1 } }),
        },
        select: { voteCount: true, referralVotes: true },
      })

      // Every 10 referral votes earns +5 bonus — checked against the post-increment value
      const bonusThisVote = isReferral && afterVote.referralVotes % 10 === 0 ? 5 : 0

      if (bonusThisVote > 0) {
        const withBonus = await tx.entry.update({
          where: { id: entry.id },
          data: { voteCount: { increment: bonusThisVote }, bonusVotes: { increment: bonusThisVote } },
          select: { voteCount: true },
        })
        return { voteCount: withBonus.voteCount, bonusAwarded: true }
      }

      return { voteCount: afterVote.voteCount, bonusAwarded: false }
    })

    return Response.json(result)
  } catch (err: unknown) {
    const isUniqueViolation =
      err instanceof Error && err.message.toLowerCase().includes('unique')
    return Response.json(
      { error: isUniqueViolation ? 'Already voted.' : 'Vote failed.' },
      { status: isUniqueViolation ? 409 : 500 }
    )
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

  const result = await prisma.$transaction(async (tx) => {
    const existingVote = await tx.vote.findUnique({
      where: { entryId_userId: { entryId, userId } },
      select: { isReferral: true },
    })
    if (!existingVote) return null

    await tx.vote.delete({ where: { entryId_userId: { entryId, userId } } })

    // Recalculate voteCount from actual votes + preserved bonus votes
    const [actualVotes, current] = await Promise.all([
      tx.vote.count({ where: { entryId } }),
      tx.entry.findUnique({ where: { id: entry.id }, select: { bonusVotes: true } }),
    ])

    return tx.entry.update({
      where: { id: entry.id },
      data: {
        voteCount: actualVotes + (current?.bonusVotes ?? 0),
        ...(existingVote.isReferral && { referralVotes: { decrement: 1 } }),
      },
      select: { voteCount: true },
    })
  })

  if (!result) return Response.json({ error: 'No vote to remove.' }, { status: 404 })
  return Response.json({ voteCount: result.voteCount })
}
