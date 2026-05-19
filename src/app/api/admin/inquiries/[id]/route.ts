import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/admin/inquiries/[id]'>
) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  const { status } = await req.json()
  try {
    const updated = await prisma.loopInquiry.update({ where: { id }, data: { status } })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Failed to update inquiry.' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<'/api/admin/inquiries/[id]'>
) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  try {
    await prisma.loopInquiry.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete inquiry.' }, { status: 500 })
  }
}
