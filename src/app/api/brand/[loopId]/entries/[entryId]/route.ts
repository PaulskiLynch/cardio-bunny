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

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/brand/[loopId]/entries/[entryId]'>
) {
  const { loopId, entryId } = await ctx.params
  const loop = await verifyOwner(loopId)
  if (!loop) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { status } = await req.json()
  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const entry = await prisma.entry.findFirst({
    where: { entryId, competition: loop.slug },
  })
  if (!entry) return NextResponse.json({ error: 'Entry not found' }, { status: 404 })

  const updated = await prisma.entry.update({
    where: { id: entry.id },
    data:  { status },
  })

  return NextResponse.json({ status: updated.status })
}
