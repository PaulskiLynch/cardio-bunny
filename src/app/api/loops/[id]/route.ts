import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

async function isAdmin() {
  const store = await cookies()
  return isAdminCookie(store.get('admin_auth')?.value)
}

const LOOP_PUBLIC_FIELDS = {
  id: true, slug: true, status: true, brandName: true, retailPartner: true,
  market: true, heroTitle: true, heroSubhead: true, ctaText: true,
  deadline: true, accentColor: true, pageBg: true, logoUrl: true,
  heroImageUrl: true, brief: true, guidelines: true, prizes: true,
  questions: true, autoApprove: true, rosterEnabled: true,
  createdAt: true, updatedAt: true,
} as const

const LOOP_ALLOWED_UPDATE_FIELDS = new Set([
  'slug', 'status', 'brandName', 'retailPartner', 'market',
  'heroTitle', 'heroSubhead', 'ctaText', 'deadline',
  'accentColor', 'pageBg', 'logoUrl', 'heroImageUrl',
  'brief', 'guidelines', 'prizes', 'questions',
  'autoApprove', 'moderatorEmails', 'ownerEmail', 'rosterEnabled',
])

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = await isAdmin()
  const loop = await prisma.loop.findUnique({
    where: { id },
    select: admin ? undefined : LOOP_PUBLIC_FIELDS,
  })
  if (!loop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(loop)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const body = await req.json()
    const safeData = Object.fromEntries(
      Object.entries(body).filter(([k]) => LOOP_ALLOWED_UPDATE_FIELDS.has(k))
    )
    if (Object.keys(safeData).length === 0) {
      return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 })
    }
    const loop = await prisma.loop.update({ where: { id }, data: safeData })
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
