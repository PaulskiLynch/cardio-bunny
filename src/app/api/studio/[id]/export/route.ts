import { NextRequest } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { isAdmin } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

function esc(v: string) {
  const s = String(v)
  // Prefix formula characters to prevent CSV injection in Excel/Sheets
  const safe = /^[=+\-@\t]/.test(s) ? `\t${s}` : s
  return `"${safe.replace(/"/g, '""')}"`
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/studio/[id]/export'>
) {
  const { id } = await ctx.params
  const loop = await prisma.loop.findUnique({ where: { id } })
  if (!loop) return new Response('Not found', { status: 404 })

  const admin = await isAdmin()
  if (!admin) {
    const user = await currentUser()
    const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase() ?? ''
    let moderatorEmails: string[] = []
    try { moderatorEmails = JSON.parse(loop.moderatorEmails).map((e: string) => e.toLowerCase()) } catch {}
    if (!email || !moderatorEmails.includes(email)) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

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
