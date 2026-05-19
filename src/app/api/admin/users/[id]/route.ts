import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { isAdmin } from '@/lib/adminAuth'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { role } = await req.json()

  if (role !== 'admin' && role !== null) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const client = await clerkClient()
  await client.users.updateUserMetadata(id, {
    publicMetadata: { role: role ?? undefined },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const client = await clerkClient()
  await client.users.deleteUser(id)

  return NextResponse.json({ ok: true })
}
