import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { competition = '', handle, name = '', specialty = '', role, reach, platform, portfolioUrl } = await req.json()
    if (!handle || !role || !reach || !platform) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    const app = await prisma.partnerApplication.create({
      data: {
        competition,
        handle: handle.trim(),
        name: name.trim(),
        specialty: specialty.trim(),
        role, reach, platform,
        portfolioUrl: portfolioUrl?.trim() ?? '',
      },
    })
    return NextResponse.json({ id: app.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Submission failed.' }, { status: 500 })
  }
}
