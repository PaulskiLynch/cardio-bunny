import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import VoteCard from '@/components/VoteCard'
import CountdownTimer from '@/components/CountdownTimer'
import NotifyForm from './NotifyForm'
import type { Question } from '@/lib/questions'

export const dynamic = 'force-dynamic'

interface PrizeItem {
  style: 'top' | 'grand' | 'special'
  badge: string
  cash: string
  description: string
}

export default async function LoopPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const loop = await prisma.loop.findUnique({ where: { slug } })
  if (!loop) notFound()

  const entries = await prisma.entry.findMany({
    where: { competition: slug, status: 'approved' },
    orderBy: { voteCount: 'desc' },
    take: 6,
  })

  let guidelines: string[] = []
  let prizes: PrizeItem[] = []
  let questions: Question[] = []
  try { guidelines = JSON.parse(loop.guidelines) } catch { /* ignore */ }
  try { prizes = JSON.parse(loop.prizes) } catch { /* ignore */ }
  try { questions = JSON.parse(loop.questions) } catch { /* ignore */ }

  const accent = loop.accentColor || '#e8325a'

  return (
    <main className="page">
      {loop.status === 'demo' && (
        <div className="demo-notice">
          ⚠️ DEMO — This is not an active competition. This page shows an example CrowdLoops event format. Submissions, votes, prizes, and production shown for demonstration purposes only.
        </div>
      )}

      <section className="hero" style={{ background: '#111', padding: 0, overflow: 'hidden' }}>
        {loop.heroImageUrl && (
          <div style={{ position: 'relative', width: '100%', height: 180 }}>
            <img
              src={loop.heroImageUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #111 100%)' }} />
          </div>
        )}
        <div style={{ padding: '20px 20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            {loop.logoUrl && (
              <img
                src={loop.logoUrl}
                alt={loop.brandName}
                style={{ height: 36, maxWidth: 120, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            )}
            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>
              {loop.brandName}
            </div>
          </div>
          <h1 style={{ color: '#fff' }}>{loop.heroTitle}</h1>
          {loop.heroSubhead && (
            <div className="subhead">{loop.heroSubhead}</div>
          )}
          <div className="hero-actions">
            <Link
              className="cta"
              href={`/loops/${slug}/submit`}
              style={{ background: accent, borderColor: accent }}
            >
              {loop.ctaText || 'Submit Your Design'}
            </Link>
          </div>
          {loop.deadline && (
            <div style={{ marginTop: 18 }}>
              <CountdownTimer deadline={`${loop.deadline}T23:59:59Z`} label="ENTRIES CLOSE IN" />
            </div>
          )}
        </div>
      </section>

      {prizes.length > 0 && (
        <section className="section">
          <h2>{loop.status === 'demo' ? 'Example Prizes' : 'Prizes'}</h2>
          <div className="prize-section">
            {prizes.map((p, i) => {
              if (p.style === 'top') {
                return (
                  <div key={i} className="prize-top10">
                    <div className="prize-top10-badge" style={{ background: accent }}>{p.badge}</div>
                    <div className="prize-top10-text">{p.description}</div>
                  </div>
                )
              }
              if (p.style === 'grand') {
                return (
                  <div key={i} className="prize-grand">
                    <div className="prize-grand-header">{p.badge}</div>
                    {p.cash && <div className="prize-cash">{p.cash}</div>}
                    {p.description && <div style={{ fontSize: 14, lineHeight: 1.5, color: '#555', marginTop: 8 }}>{p.description}</div>}
                  </div>
                )
              }
              return (
                <div key={i} className="prize-grand" style={{ marginTop: 12 }}>
                  <div className="prize-grand-header" style={{ fontSize: 16 }}>{p.badge}</div>
                  {p.cash && <div className="prize-cash" style={{ fontSize: 24 }}>{p.cash}</div>}
                  {p.description && <div style={{ fontSize: 14, lineHeight: 1.5, color: '#555', marginTop: 8 }}>{p.description}</div>}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 12, color: '#555', lineHeight: 1.6 }}>
            Winners are selected based on public votes, eligibility verification, brand review, and compliance with the rules. The winning design may be developed for production following technical, legal, safety, and commercial review.
          </div>
        </section>
      )}

      {(loop.brief || guidelines.length > 0) && (
        <section className="section">
          {loop.brief && (
            <>
              <h2>Design Brief</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#444' }}>{loop.brief}</p>
            </>
          )}
          {guidelines.length > 0 && (
            <>
              <h2>Submission Requirements</h2>
              <ol className="prompt-list">
                {guidelines.map((g, i) => <li key={i}>{g}</li>)}
              </ol>
            </>
          )}
        </section>
      )}

      <section className="section">
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Community Favourites</h2>
          <div className="card-text">Vote for the designs you want to see in stores.</div>
        </div>
        <div className="design-grid">
          {entries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontWeight: 700 }}>
              No approved entries yet. Be the first!
            </div>
          ) : (
            entries.map(entry => (
              <VoteCard
                key={entry.id}
                entryId={entry.entryId}
                setName={entry.setName}
                designerName={entry.designerName}
                imageUrl={entry.imageUrl}
                initialVotes={entry.voteCount}
                competition={slug}
                questions={questions.length > 0 ? questions : undefined}
              />
            ))
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href={`/designs?competition=${slug}`} style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
            View all entries
          </Link>
        </div>
      </section>

      <section className="section">
        <NotifyForm competition={slug} status={loop.status} accent={accent} />
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>Create. Share. Win.</h2>
        <Link className="cta cta-dark" href={`/loops/${slug}/submit`}>
          {loop.ctaText || 'Submit Your Design'}
        </Link>
        <div className="footer-links">
          <Link href={`/designs?competition=${slug}`}>All Entries</Link>
          <Link href="/legal">Rules &amp; Privacy</Link>
        </div>
      </section>
    </main>
  )
}
