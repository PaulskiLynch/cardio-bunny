import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

const DUMMY: {
  handle: string; name: string; specialty: string; role: string
  reach: string; platform: string; portfolioUrl: string; avatarUrl: string
}[] = [
  {
    handle: '@fitmoves_uk',
    name: 'Jamie O\'Brien',
    specialty: 'Activewear & Fitness Content',
    role: 'creator',
    reach: 'micro',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/fitmoves/600/600',
  },
  {
    handle: '@studio_bloom',
    name: 'Studio Bloom',
    specialty: 'Brand Identity & Campaign Strategy',
    role: 'agency',
    reach: 'micro',
    platform: 'multi',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/bloom/600/600',
  },
  {
    handle: '@trendhaus_ie',
    name: 'Ciara Walsh',
    specialty: 'Irish Lifestyle & Fashion',
    role: 'creator',
    reach: 'nano',
    platform: 'tiktok',
    portfolioUrl: 'https://tiktok.com',
    avatarUrl: 'https://picsum.photos/seed/trendhaus/600/600',
  },
  {
    handle: '@designhaus.berlin',
    name: 'Designhaus Berlin',
    specialty: 'European Fashion & Retail Campaigns',
    role: 'agency',
    reach: 'mid',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/designhaus/600/600',
  },
  {
    handle: '@activewear_anna',
    name: 'Anna Kowalski',
    specialty: 'Fitness Lifestyle, Polish Market',
    role: 'creator',
    reach: 'micro',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/anna/600/600',
  },
  {
    handle: '@emerald_media',
    name: 'Emerald Media Group',
    specialty: 'UK Retail PR & Press',
    role: 'pr',
    reach: 'micro',
    platform: 'multi',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/emerald/600/600',
  },
  {
    handle: '@packshot.studio',
    name: 'Lee Park',
    specialty: 'Product Photography & Visual Identity',
    role: 'designer',
    reach: 'nano',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/packshot/600/600',
  },
  {
    handle: '@konkerz_creates',
    name: 'Sam Doyle',
    specialty: 'Toy & Gaming Content, YouTube Reviews',
    role: 'creator',
    reach: 'nano',
    platform: 'youtube',
    portfolioUrl: 'https://youtube.com',
    avatarUrl: 'https://picsum.photos/seed/konkerz/600/600',
  },
]

export async function POST() {
  const store = await cookies()
  if (!isAdminCookie(store.get('admin_auth')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.partnerApplication.deleteMany({ where: { competition: '' } })

  await prisma.partnerApplication.createMany({
    data: DUMMY.map(d => ({ ...d, competition: '', status: 'new' })),
  })

  return NextResponse.json({ seeded: DUMMY.length })
}
