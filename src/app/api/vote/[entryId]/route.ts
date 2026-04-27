import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(
  _req: NextRequest,
  ctx: RouteContext<'/api/vote/[entryId]'>
) {
  const { entryId } = await ctx.params

  const entry = await prisma.entry.findFirst({
    where: { entryId, status: 'approved' },
  })

  if (!entry) {
    return Response.json({ error: 'Entry not found.' }, { status: 404 })
  }

  const updated = await prisma.entry.update({
    where: { id: entry.id },
    data: { voteCount: { increment: 1 } },
  })

  return Response.json({ voteCount: updated.voteCount })
}
