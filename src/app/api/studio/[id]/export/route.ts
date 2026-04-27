import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const store = await cookies()
  if (store.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const loop = await prisma.loop.findUnique({ where: { id } })
  if (!loop) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const entries = await prisma.entry.findMany({
    where: { competition: loop.slug },
    orderBy: { voteCount: 'desc' },
  })

  const rows = [
    ['Entry ID', 'Designer', 'Contact', 'Design Name', 'Description', 'Votes', 'Status', 'Submitted'],
    ...entries.map(e => [
      e.entryId,
      e.designerName,
      e.contact,
      e.setName,
      e.hook.replace(/"/g, '""'),
      String(e.voteCount),
      e.status,
      e.createdAt.toISOString(),
    ]),
  ]

  const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${loop.slug}-entries.csv"`,
    },
  })
}
