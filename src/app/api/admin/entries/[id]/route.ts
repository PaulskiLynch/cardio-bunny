import type { NextRequest } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import { notifyEntryDecision } from '@/lib/email'

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/admin/entries/[id]'>
) {
  if (!await isAdmin()) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const { status } = await req.json()

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return Response.json({ error: 'Invalid status.' }, { status: 400 })
  }

  try {
    const entry = await prisma.entry.update({ where: { id }, data: { status } })

    if (status === 'approved' || status === 'rejected') {
      await notifyEntryDecision({
        to: entry.contact,
        designerName: entry.designerName,
        setName: entry.setName,
        competition: entry.competition,
        status,
      })
    }

    return Response.json({ id: entry.id, status: entry.status })
  } catch {
    return Response.json({ error: 'Failed to update entry.' }, { status: 500 })
  }
}
