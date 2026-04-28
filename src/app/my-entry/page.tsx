import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import CopyLink from './CopyLink'

export const dynamic = 'force-dynamic'

const STATUS_CONFIG = {
  pending: {
    stamp: '⏳ IN REVIEW',
    title: 'Your design is being reviewed.',
    body: 'Our moderation team usually responds within 24 hours. Once approved, your entry goes live on the leaderboard and you can start collecting votes.',
    color: '#b36b00',
  },
  approved: {
    stamp: '✅ LIVE',
    title: 'Your design is on the leaderboard!',
    body: 'Share your vote link everywhere — every vote counts toward your final ranking.',
    color: '#1a5c1a',
  },
  rejected: {
    stamp: '❌ NOT SELECTED',
    title: 'Thank you for entering.',
    body: 'Your design was reviewed but wasn\'t selected for this round. Keep creating — we run new competitions regularly.',
    color: '#c00',
  },
}

export default async function MyEntryPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id = '' } = await searchParams
  const entryId = id.trim().toUpperCase()

  const clerkUser = await currentUser()
  const userEmail = clerkUser?.emailAddresses?.[0]?.emailAddress ?? ''

  // Auto-find by Clerk email if no ID typed
  const entry = entryId
    ? await prisma.entry.findUnique({ where: { entryId } }).catch(() => null)
    : userEmail
      ? await prisma.entry.findFirst({ where: { contact: userEmail }, orderBy: { createdAt: 'desc' } }).catch(() => null)
      : null

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://crowdloops.com')
  const voteUrl = entry ? `${baseUrl}/entry/${entry.entryId}` : ''

  const cfg = entry ? STATUS_CONFIG[entry.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending : null

  return (
    <main className="page">
      <Link className="top-link" href="/">← Home</Link>

      <div className="portal">
        <header className="portal-header">
          <div className="brand">CrowdLoops</div>
          <div className="phase">Track Your Entry</div>
        </header>

        {/* Lookup form */}
        <form method="GET" style={{ marginBottom: 24 }}>
          <div className="form-section">
            <label className="form-label" htmlFor="id">
              Entry ID
              <span className="hint">The code shown after you submitted</span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                id="id"
                name="id"
                type="text"
                defaultValue={id}
                placeholder="e.g. CB-8F2K"
                style={{ flex: 1, textTransform: 'uppercase' }}
                autoComplete="off"
              />
              <button className="submit-button" type="submit" style={{ width: 'auto', padding: '0 20px' }}>
                GO
              </button>
            </div>
          </div>
        </form>

        {/* Auto-found via signed-in email */}
        {!entryId && userEmail && !entry && (
          <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: 10, fontSize: 14, color: '#555', marginBottom: 8 }}>
            No entry found for <strong>{userEmail}</strong>. Try entering your Entry ID above.
          </div>
        )}

        {/* Manual lookup — no result */}
        {entryId && !entry && (
          <div style={{ padding: '20px', background: '#fff0f0', borderRadius: 10, color: '#c00', fontWeight: 700, fontSize: 14 }}>
            No entry found for <strong>{entryId}</strong>. Check the ID on your confirmation screen.
          </div>
        )}

        {/* Entry found */}
        {entry && cfg && (
          <div className="confirmation">
            {/* Image */}
            {entry.imageUrl && (
              <img
                src={entry.imageUrl}
                alt={entry.setName}
                style={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 10, marginBottom: 18 }}
              />
            )}

            {/* Stamp */}
            <div className="stamp" style={{ borderColor: cfg.color, color: cfg.color }}>
              <div className="stamp-title">{cfg.stamp}</div>
              <div className="stamp-id">ENTRY ID: {entry.entryId}</div>
            </div>

            {/* Details */}
            <div style={{ margin: '16px 0', textAlign: 'left', fontSize: 14, lineHeight: 1.7 }}>
              <div><strong>{entry.setName}</strong> by {entry.designerName}</div>
              <div style={{ color: '#555', fontStyle: 'italic', marginTop: 4 }}>{entry.hook}</div>
            </div>

            <div className="live-text" style={{ fontSize: 16, color: cfg.color }}>{cfg.title}</div>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>{cfg.body}</p>

            {/* Votes + share (approved only) */}
            {entry.status === 'approved' && (
              <>
                <div style={{ fontSize: 36, fontWeight: 950, letterSpacing: '-0.04em', marginBottom: 4 }}>
                  {entry.voteCount.toLocaleString()}
                </div>
                <div style={{ fontSize: 13, color: '#888', fontWeight: 700, marginBottom: 20 }}>VOTES SO FAR</div>
                <CopyLink url={voteUrl} />
                <div style={{ marginTop: 12 }}>
                  <Link
                    href={`/entry/${entry.entryId}`}
                    style={{ fontSize: 13, fontWeight: 900, textDecoration: 'underline' }}
                  >
                    View your public entry page ↗
                  </Link>
                </div>
              </>
            )}

            {/* Bookmark nudge */}
            <div style={{ marginTop: 24, fontSize: 12, color: '#aaa', borderTop: '1px solid #eee', paddingTop: 16 }}>
              Bookmark this page to check back on your votes anytime.
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
