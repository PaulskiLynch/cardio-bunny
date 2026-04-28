import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

async function isAdmin() {
  const store = await cookies()
  return isAdminCookie(store.get('admin_auth')?.value)
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const loops = await prisma.loop.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(loops)
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { inquiryId, ...data } = await req.json()
    const loop = await prisma.loop.create({ data })
    if (inquiryId) {
      await prisma.loopInquiry.update({
        where: { id: inquiryId },
        data: { status: 'converted' },
      }).catch(() => {})
    }
    return NextResponse.json(loop, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create loop'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
