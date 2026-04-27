import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

async function isAdmin() {
  const store = await cookies()
  return store.get('admin_auth')?.value === process.env.ADMIN_PASSWORD
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const loop = await prisma.loop.findUnique({ where: { id } })
  if (!loop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(loop)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const body = await req.json()
    const loop = await prisma.loop.update({ where: { id }, data: body })
    return NextResponse.json(loop)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update loop'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    await prisma.loop.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete loop'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
