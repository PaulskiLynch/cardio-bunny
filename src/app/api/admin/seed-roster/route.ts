import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'

const DUMMY: {
  handle: string; name: string; specialty: string; role: string
  reach: string; platform: string; portfolioUrl: string; avatarUrl: string
  followers: string; engagement: string; location: string
}[] = [
  {
    handle: '@fitmoves_uk',
    name: 'Jamie O\'Brien',
    specialty: 'Activewear & Fitness Content',
    role: 'creator',
    reach: 'micro',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/fitmoves/600/400',
    followers: '42k followers',
    engagement: '4.8% eng.',
    location: 'Manchester, UK',
  },
  {
    handle: '@studio_bloom',
    name: 'Studio Bloom',
    specialty: 'Brand Identity & Campaign Strategy',
    role: 'agency',
    reach: 'micro',
    platform: 'multi',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/bloom/600/400',
    followers: '45 campaigns run',
    engagement: 'Avg. reach: 1.2M',
    location: 'London, UK',
  },
  {
    handle: '@trendhaus_ie',
    name: 'Ciara Walsh',
    specialty: 'Irish Lifestyle & Fashion',
    role: 'creator',
    reach: 'nano',
    platform: 'tiktok',
    portfolioUrl: 'https://tiktok.com',
    avatarUrl: 'https://picsum.photos/seed/trendhaus/600/400',
    followers: '8.2k followers',
    engagement: '6.1% eng.',
    location: 'Dublin, IE',
  },
  {
    handle: '@designhaus.berlin',
    name: 'Designhaus Berlin',
    specialty: 'European Fashion & Retail Campaigns',
    role: 'agency',
    reach: 'mid',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/designhaus/600/400',
    followers: '18 active clients',
    engagement: 'Avg. reach: 2.8M',
    location: 'Berlin, DE',
  },
  {
    handle: '@activewear_anna',
    name: 'Anna Kowalski',
    specialty: 'Fitness Lifestyle, Polish Market',
    role: 'creator',
    reach: 'micro',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/anna/600/400',
    followers: '35k followers',
    engagement: '5.2% eng.',
    location: 'Warsaw, PL',
  },
  {
    handle: '@emerald_media',
    name: 'Emerald Media Group',
    specialty: 'UK Retail PR & Press',
    role: 'pr',
    reach: 'micro',
    platform: 'multi',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/emerald/600/400',
    followers: 'PR reach: 2.4M',
    engagement: '12 trade outlets',
    location: 'London, UK',
  },
  {
    handle: '@packshot.studio',
    name: 'Lee Park',
    specialty: 'Product Photography & Visual Identity',
    role: 'designer',
    reach: 'nano',
    platform: 'instagram',
    portfolioUrl: 'https://instagram.com',
    avatarUrl: 'https://picsum.photos/seed/packshot/600/400',
    followers: '7.8k followers',
    engagement: '4.1% eng.',
    location: 'Seoul, KR',
  },
  {
    handle: '@konkerz_creates',
    name: 'Sam Doyle',
    specialty: 'Toy & Gaming Content, YouTube Reviews',
    role: 'creator',
    reach: 'nano',
    platform: 'youtube',
    portfolioUrl: 'https://youtube.com',
    avatarUrl: 'https://picsum.photos/seed/konkerz/600/400',
    followers: '9.4k subscribers',
    engagement: '7.3% eng.',
    location: 'Dublin, IE',
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
