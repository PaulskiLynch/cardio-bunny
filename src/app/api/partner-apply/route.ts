import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const {
      competition = '', handle, name = '', specialty = '',
      role, reach, platform,
      portfolioUrl, avatarUrl = '',
      followers = '', engagement = '', location = '',
    } = await req.json()

    if (!handle || !role || !reach || !platform) {
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
