import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

function esc(v: string) { return `"${String(v).replace(/"/g, '""')}"` }

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/studio/[id]/export'>
) {
  const store = await cookies()
  if (store.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { id } = await ctx.params
  const loop = await prisma.loop.findUnique({ where: { id } })
  if (!loop) return new Response('Not found', { status: 404 })

  const entries = await prisma.entry.findMany({
    where: { competition: loop.slug },
    orderBy: { voteCount: 'desc' },
  })

  const header = 'Rank,Entry ID,Designer Name,Contact,Set Name,Description,Votes,Status,Submitted'
  const rows = entries.map((e, i) => [
    i + 1,
    esc(e.entryId),
    esc(e.designerName),
    esc(e.contact),
    esc(e.setName),
    esc(e.hook),
    e.voteCount,
    e.status,
    new Date(e.createdAt).toISOString(),
  ].join(','))

  const csv = [header, ...rows].join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${loop.slug}-entries.csv"`,
    },
  })
}
