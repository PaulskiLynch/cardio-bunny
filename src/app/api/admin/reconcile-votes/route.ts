import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

export async function POST() {
  const store = await cookies()
  if (!isAdminCookie(store.get('admin_auth')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const entries = await prisma.entry.findMany({ select: { id: true, entryId: true, voteCount: true } })

  let fixed = 0
  for (const entry of entries) {
    const actual = await prisma.vote.count({ where: { entryId: entry.entryId } })
    if (actual !== entry.voteCount) {
      await prisma.entry.update({ where: { id: entry.id }, data: { voteCount: actual } })
      fixed++
    }
  }

  return NextResponse.json({ checked: entries.length, fixed })
}
