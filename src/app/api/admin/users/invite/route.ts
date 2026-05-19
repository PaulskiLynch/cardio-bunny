import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { isAdmin } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { email } = await req.json()
  if (!email?.trim()) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const client = await clerkClient()
  try {
    await client.invitations.createInvitation({
      emailAddress: email.trim().toLowerCase(),
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://crowdloops.com'}/sign-up`,
      ignoreExisting: true,
    })
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to send invitation'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
