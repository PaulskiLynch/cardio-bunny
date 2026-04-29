import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

async function verifyOwner(loopId: string) {
  const user = await currentUser()
  if (!user) return null
  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase() ?? ''
  const loop  = await prisma.loop.findFirst({ where: { id: loopId, ownerEmail: email } })
  return loop ?? null
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/brand/[loopId]/export'>
) {
  const { loopId } = await ctx.params
  const loop = await verifyOwner(loopId)
  if (!loop) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const entries = await prisma.entry.findMany({
    where: { competition: loop.slug },
    orderBy: { voteCount: 'desc' },
    select: {
      entryId: true, designerName: true, contact: true,
      setName: true, hook: true,
      status: true, voteCount: true, referralVotes: true, bonusVotes: true,
      createdAt: true,
    },
  })

  const header = 'Entry ID,Designer,Contact,Design Name,Hook,Status,Votes,Referral Votes,Bonus Votes,Submitted'
  const rows   = entries.map(e =>
    [
      e.entryId,
      `"${e.designerName.replace(/"/g, '""')}"`,
      e.contact,
      `"${e.setName.replace(/"/g, '""')}"`,
      `"${e.hook.replace(/"/g, '""')}"`,
      e.status,
      e.voteCount,
      e.referralVotes,
      e.bonusVotes,
      new Date(e.createdAt).toISOString().split('T')[0],
    ].join(',')
  )

  const csv = [header, ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type':        'text/csv',
      'Content-Disposition': `attachment; filename="${loop.slug}-entries.csv"`,
    },
  })
}
