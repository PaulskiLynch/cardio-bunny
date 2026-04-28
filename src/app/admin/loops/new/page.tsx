import { cookies } from 'next/headers'
import Link from 'next/link'
import { isAdminCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import { LoginForm } from '../../AdminClient'
import LoopForm, { type LoopInitial } from '../LoopForm'

export const dynamic = 'force-dynamic'

function mapMarket(market: string, language: string): string {
  const l = language.toLowerCase()
  const m = market.toLowerCase()
  if (l.includes('polish') || m.includes('poland') || m.includes('pl')) return 'pl'
  if (l.includes('turkish') || m.includes('turkey') || m.includes('turkiye') || m.includes('tr')) return 'tr'
  if (m.includes('us') || m.includes('united states') || m.includes('america')) return 'en-us'
  return 'en'
}

export default async function NewLoopPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const cookieStore = await cookies()
  if (!isAdminCookie(cookieStore.get('admin_auth')?.value)) {
    return <main className="page"><LoginForm /></main>
  }

  const { from } = await searchParams
  const inquiry = from
    ? await prisma.loopInquiry.findUnique({ where: { id: from } }).catch(() => null)
    : null

  const initial: LoopInitial | undefined = inquiry
    ? {
        slug: '',
        status: inquiry.campaignType === 'live' ? 'live' : 'demo',
        brandName: inquiry.brandName,
        retailPartner: inquiry.retailPartner,
        market: mapMarket(inquiry.market, inquiry.language),
        heroTitle: '',
        heroSubhead: '',
        ctaText: 'Submit Your Design',
        deadline: '',
        accentColor: '#e8325a',
        logoUrl: '',
        heroImageUrl: '',
        brief: inquiry.brief,
        guidelines: '[]',
        prizes: inquiry.prize
          ? JSON.stringify([{ style: 'grand', badge: '🏆 Grand Winner', cash: inquiry.prize, description: '' }])
          : '[]',
        questions: '[]',
        autoApprove: false,
        moderatorEmails: '[]',
        inquiryId: inquiry.id,
      }
    : undefined

  return (
    <main className="page">
      <section className="feed-title">
        <h1>New Loop</h1>
        {inquiry && (
          <div className="subtitle">Prefilled from inquiry · {inquiry.brandName} · {inquiry.contactName}</div>
        )}
      </section>
      <div style={{ marginBottom: 20 }}>
        <Link href="/admin/loops" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          ← All Loops
        </Link>
        {inquiry && (
          <Link href="/admin/inquiries" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline', marginLeft: 16 }}>
            ← Inquiries
          </Link>
        )}
      </div>
      <LoopForm initial={initial} />
    </main>
  )
}
