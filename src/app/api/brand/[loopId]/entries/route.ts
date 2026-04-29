import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

const PAGE_SIZE = 15

async function verifyOwner(loopId: string) {
  const user = await currentUser()
  if (!user) return null
  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase() ?? ''
  const loop  = await prisma.loop.findFirst({ where: { id: loopId, ownerEmail: email } })
  return loop ?? null
}

export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/api/brand/[loopId]/entries'>
) {
  const { loopId } = await ctx.params
  const loop = await verifyOwner(loopId)
  if (!loop) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = req.nextUrl
  const status = searchParams.get('status') ?? 'pending'
  const page   = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const sort   = searchParams.get('sort') === 'votes' ? 'voteCount' : 'createdAt'

  const where = {
    competition: loop.slug,
    ...(status !== 'all' ? { status } : {}),
  }

  const [entries, total] = await Promise.all([
    prisma.entry.findMany({
      where,
      orderBy: { [sort]: 'desc' },
      skip:  (page - 1) * PAGE_SIZE,
      take:  PAGE_SIZE,
      select: {
        id: true, entryId: true, designerName: true, contact: true,
        setName: true, hook: true, imageUrl: true,
        status: true, voteCount: true, referralVotes: true, createdAt: true,
      },
    }),
    prisma.entry.count({ where }),
  ])

  return NextResponse.json({
    entries,
    total,
    page,
    hasMore: page * PAGE_SIZE < total,
  })
}
