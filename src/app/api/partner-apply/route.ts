import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { formLimiter, getIp } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const { success } = await formLimiter.limit(getIp(req))
  if (!success) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  try {
    const {
      competition = '', handle, name = '', specialty = '',
      role, reach, platform,
      portfolioUrl, avatarUrl = '',
      followers = '', engagement = '', location = '',
    } = body

    if (!handle?.trim() || !role?.trim() || !reach?.trim() || !platform?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const data = {
      competition,
      handle: handle.trim(),
      name: name.trim(),
      specialty: specialty.trim(),
      role, reach, platform,
      portfolioUrl: portfolioUrl?.trim() ?? '',
      avatarUrl: avatarUrl?.trim() ?? '',
      followers: followers?.trim() ?? '',
      engagement: engagement?.trim() ?? '',
      location: location?.trim() ?? '',
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = await (prisma.partnerApplication.create as any)({ data })
    return NextResponse.json({ id: app.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Submission failed.' }, { status: 500 })
  }
}
