import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

async function isAdmin() {
  const store = await cookies()
  return store.get('admin_auth')?.value === process.env.ADMIN_PASSWORD
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const loops = await prisma.loop.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(loops)
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const loop = await prisma.loop.create({ data: body })
    return NextResponse.json(loop, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create loop'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
