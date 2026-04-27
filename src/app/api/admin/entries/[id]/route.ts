import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/admin/entries/[id]'>
) {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const { status } = await req.json()

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return Response.json({ error: 'Invalid status.' }, { status: 400 })
  }

  const entry = await prisma.entry.update({
    where: { id },
    data: { status },
  })

  return Response.json({ id: entry.id, status: entry.status })
}
