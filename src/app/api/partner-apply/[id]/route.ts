import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/partner-apply/[id]'>
) {
  const store = await cookies()
  if (!isAdminCookie(store.get('admin_auth')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await ctx.params
  const { status } = await req.json()
  try {
    const updated = await prisma.partnerApplication.update({ where: { id }, data: { status } })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Failed to update.' }, { status: 500 })
  }
}
