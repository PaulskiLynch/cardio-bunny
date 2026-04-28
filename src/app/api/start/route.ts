import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { brandName, contactName, email } = body

    if (!brandName?.trim()) return NextResponse.json({ error: 'Brand name is required' }, { status: 400 })
    if (!contactName?.trim()) return NextResponse.json({ error: 'Contact name is required' }, { status: 400 })
    if (!email?.trim()) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    const inquiry = await prisma.loopInquiry.create({
      data: {
        brandName: brandName.trim(),
        retailPartner: (body.retailPartner ?? '').trim(),
        productCategory: (body.productCategory ?? '').trim(),
        market: (body.market ?? '').trim(),
        language: (body.language ?? '').trim(),
        brief: (body.brief ?? '').trim(),
        prize: (body.prize ?? '').trim(),
        campaignType: body.campaignType ?? 'demo',
        contactName: contactName.trim(),
        email: email.trim(),
        phone: (body.phone ?? '').trim(),
      },
    })

    return NextResponse.json({ id: inquiry.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
