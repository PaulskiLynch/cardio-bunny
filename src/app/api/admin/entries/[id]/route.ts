import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/admin/entries/[id]'>
) {
  const cookieStore = await cookies()
  if (!isAdminCookie(cookieStore.get('admin_auth')?.value)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const { status } = await req.json()

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return Response.json({ error: 'Invalid status.' }, { status: 400 })
  }

  try {
    const entry = await prisma.entry.update({ where: { id }, data: { status } })
    return Response.json({ id: entry.id, status: entry.status })
  } catch {
    return Response.json({ error: 'Failed to update entry.' }, { status: 500 })
  }
}
