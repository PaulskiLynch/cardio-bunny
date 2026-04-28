import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

async function isAdmin() {
  const store = await cookies()
  return store.get('admin_auth')?.value === process.env.ADMIN_PASSWORD
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/admin/inquiries/[id]'>
) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  const { status } = await req.json()
  const updated = await prisma.loopInquiry.update({ where: { id }, data: { status } })
  return NextResponse.json(updated)
}
