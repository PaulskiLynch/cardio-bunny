import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

export async function POST() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const BATCH = 100
  let cursor: string | undefined
  let checked = 0
  let fixed = 0

  for (;;) {
    const batch = await prisma.entry.findMany({
      take: BATCH,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      select: { id: true, entryId: true, voteCount: true, bonusVotes: true },
      orderBy: { id: 'asc' },
    })
    if (batch.length === 0) break

    await Promise.all(
      batch.map(async (entry) => {
        const actualBase = await prisma.vote.count({ where: { entryId: entry.entryId } })
        const expected = actualBase + entry.bonusVotes
        if (expected !== entry.voteCount) {
          await prisma.entry.update({ where: { id: entry.id }, data: { voteCount: expected } })
          fixed++
        }
      })
    )

    checked += batch.length
    cursor = batch[batch.length - 1].id
    if (batch.length < BATCH) break
  }

  return NextResponse.json({ checked, fixed })
}
