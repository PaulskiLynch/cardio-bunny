import type { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(
  _req: NextRequest,
  ctx: RouteContext<'/api/vote/[entryId]'>
) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Sign in to vote.' }, { status: 401 })

  const { entryId } = await ctx.params
  const entry = await prisma.entry.findFirst({ where: { entryId, status: 'approved' } })
  if (!entry) return Response.json({ error: 'Entry not found.' }, { status: 404 })

  try {
    await prisma.vote.create({ data: { entryId, userId, competition: entry.competition } })
  } catch {
    return Response.json({ error: 'Already voted.' }, { status: 409 })
  }

  const updated = await prisma.entry.update({
    where: { id: entry.id },
    data: { voteCount: { increment: 1 } },
  })

  return Response.json({ voteCount: updated.voteCount })
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

  const updated = await prisma.entry.update({
    where: { id: entry.id },
    data: { voteCount: { decrement: entry.voteCount > 0 ? 1 : 0 } },
  })

  return Response.json({ voteCount: updated.voteCount })
}
