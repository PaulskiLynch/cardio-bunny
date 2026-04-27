import { cookies } from 'next/headers'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { LoginForm } from '../AdminClient'

export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<string, string> = {
  new:       '#fff0c0',
  reviewed:  '#d4eaff',
  converted: '#d4f0d4',
  declined:  '#f0f0f0',
}

const CAMPAIGN_LABEL: Record<string, string> = {
  demo:  '🟡 Demo',
  pilot: '🔵 Pilot',
  live:  '🟢 Live',
}

export default async function InquiriesPage() {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return <main className="page"><LoginForm /></main>
  }

  const inquiries = await prisma.loopInquiry.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <main className="page">
      <section className="feed-title">
        <h1>Inquiries</h1>
        <div className="subtitle">{inquiries.filter(i => i.status === 'new').length} new · {inquiries.length} total</div>
      </section>

      <div style={{ marginBottom: 20, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link href="/admin" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>← Moderation</Link>
        <Link href="/admin/loops" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>🔁 Loops</Link>
      </div>

      {inquiries.length === 0 ? (
        <div style={{ color: '#777', fontWeight: 700, padding: '40px 0', textAlign: 'center' }}>
          No inquiries yet. Share <strong>/start</strong> with brands.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {inquiries.map(inq => (
            <div key={inq.id} className="inq-card" style={{ borderLeft: `4px solid ${STATUS_COLORS[inq.status] ?? '#eee'}` }}>
              <div className="inq-header">
                <div className="inq-brand">{inq.brandName}</div>
                <div className="inq-badges">
                  <span className="inq-badge" style={{ background: STATUS_COLORS[inq.status] ?? '#f0f0f0' }}>{inq.status}</span>
                  <span className="inq-badge">{CAMPAIGN_LABEL[inq.campaignType] ?? inq.campaignType}</span>
                </div>
              </div>

              <div className="inq-meta">
                {inq.productCategory && <span>{inq.productCategory}</span>}
                {inq.market && <span>· {inq.market}</span>}
                {inq.language && <span>· {inq.language}</span>}
                <span style={{ color: '#bbb' }}>· {new Date(inq.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>

              {inq.brief && (
                <div className="inq-brief">&ldquo;{inq.brief}&rdquo;</div>
              )}

              <div className="inq-contact">
                <strong>{inq.contactName}</strong>
                {' · '}
                <a href={`mailto:${inq.email}`} style={{ textDecoration: 'underline' }}>{inq.email}</a>
                {inq.phone && ` · ${inq.phone}`}
                {inq.retailPartner && <span style={{ color: '#888' }}> · Partner: {inq.retailPartner}</span>}
              </div>

              {inq.prize && (
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Prize idea: {inq.prize}</div>
              )}

              <div className="inq-actions">
                <Link
                  href={`/admin/loops/new`}
                  className="inq-action-btn"
                  style={{ background: '#111', color: '#fff' }}
                >
                  + Create Loop
                </Link>
                <span style={{ fontSize: 12, color: '#bbb' }}>ID: {inq.id.slice(-8)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
