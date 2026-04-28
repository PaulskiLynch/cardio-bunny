import { notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
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

  const { userId } = await auth()

  const entries = await prisma.entry.findMany({
    where: { competition: slug, status: 'approved' },
    orderBy: { voteCount: 'desc' },
    take: 6,
  })

  const votedSet = userId
    ? new Set((await prisma.vote.findMany({ where: { userId, competition: slug } })).map(v => v.entryId))
    : new Set<string>()

  let guidelines: string[] = []
  let prizes: PrizeItem[] = []
  let questions: Question[] = []
  try { guidelines = JSON.parse(loop.guidelines) } catch { /* ignore */ }
  try { prizes = JSON.parse(loop.prizes) } catch { /* ignore */ }
  try { questions = JSON.parse(loop.questions) } catch { /* ignore */ }

  const accent = loop.accentColor || '#e8325a'
  const isDemo = loop.status === 'demo'
  const dark = !!loop.pageBg

  return (
    <main className={`page${dark ? ' page-dark' : ''}`} style={dark ? { background: loop.pageBg } : {}}>
      {isDemo && (
        <div className="demo-notice">
          ⚠️ DEMO — This is not an active competition. Submissions, votes, and prizes are shown for demonstration purposes only.
        </div>
      )}

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero" style={{ background: '#111', padding: 0, overflow: 'hidden' }}>
        {loop.heroImageUrl && (
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={loop.heroImageUrl}
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 75%, #111 100%)' }} />
          </div>
        )}
        <div style={{ padding: '24px 20px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            {loop.logoUrl && (
              <img
                src={loop.logoUrl}
                alt={loop.brandName}
                style={{ height: 48, maxWidth: 180, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            )}
            {!loop.logoUrl && (
              <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>
                {loop.brandName}
              </div>
            )}
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(36px, 11vw, 60px)', lineHeight: 1, marginBottom: 14, textAlign: 'center' }}>
            {loop.heroTitle}
          </h1>
          {loop.heroSubhead && (
            <div className="subhead" style={{ fontSize: 16, lineHeight: 1.55, marginBottom: 22, textAlign: 'center' }}>
              {loop.heroSubhead}
            </div>
          )}
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link
              className="cta"
              href={`/loops/${slug}/submit`}
              style={{ background: accent, borderColor: accent, fontSize: 15 }}
            >
              {loop.ctaText || 'Submit Your Design'}
            </Link>
          </div>
          {loop.deadline && (
            <div style={{ marginTop: 20 }}>
              <CountdownTimer deadline={`${loop.deadline}T23:59:59Z`} label="ENTRIES CLOSE IN" />
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="section">
        <h2 style={{ marginBottom: 16 }}>How it works</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-num" style={{ background: accent }}>1</div>
            <div className="how-step-body">
              <div className="how-step-title">Submit your design</div>
              <div className="how-step-desc">
                Upload your artwork as a JPG, PNG, or PDF — sketches, digital renders, and AI-assisted concepts are all welcome, as long as it is your original work. Include a short description of your inspiration.
              </div>
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-num" style={{ background: accent }}>2</div>
            <div className="how-step-body">
              <div className="how-step-title">Community votes</div>
              <div className="how-step-desc">
                Once approved, your design goes live. The community votes for their favourites. Voting is verified — one vote per person, with duplicate and suspicious activity detection.
              </div>
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-num" style={{ background: accent }}>3</div>
            <div className="how-step-body">
              <div className="how-step-title">Win</div>
              <div className="how-step-desc">
                Top-voted designs are reviewed by the brand team. The strongest concept{prizes.length > 0 ? ` may receive ${prizes.find(p => p.cash)?.cash ?? 'a prize'} and` : ''} may be developed for production, subject to technical, legal, and commercial review.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prizes ───────────────────────────────────────── */}
      {prizes.length > 0 && (
        <section className="section">
          <h2>{isDemo ? 'Example Prizes' : 'Prizes'}</h2>
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
                    {p.description && <div style={{ fontSize: 14, lineHeight: 1.6, color: '#555', marginTop: 10 }}>{p.description}</div>}
                  </div>
                )
              }
              return (
                <div key={i} className="prize-grand" style={{ marginTop: 12 }}>
                  <div className="prize-grand-header" style={{ fontSize: 16 }}>{p.badge}</div>
                  {p.cash && <div className="prize-cash" style={{ fontSize: 24 }}>{p.cash}</div>}
                  {p.description && <div style={{ fontSize: 14, lineHeight: 1.6, color: '#555', marginTop: 10 }}>{p.description}</div>}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 14, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 12, color: '#666', lineHeight: 1.6 }}>
            Winners are selected based on public votes, eligibility verification, and brand review. The winning design may be developed for production following technical, legal, safety, and commercial review. Production is not guaranteed.
          </div>
        </section>
      )}

      {/* ── Design Brief & Guidelines ────────────────────── */}
      {(loop.brief || guidelines.length > 0) && (
        <section className="section">
          {loop.brief && (
            <>
              <h2>Design Brief</h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#444', marginBottom: guidelines.length > 0 ? 24 : 0 }}>{loop.brief}</p>
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

      {/* ── Community Favourites ─────────────────────────── */}
      <section className="section">
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Community favourites</h2>
          <div className="card-text" style={{ marginTop: 6 }}>
            Vote for the designs you want to see in stores. Voting is verified — one vote per person.
          </div>
        </div>
        <div className="design-grid">
          {entries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#777', fontWeight: 700 }}>
              No approved entries yet — be the first to submit!
            </div>
          ) : (
            entries.map((entry, i) => (
              <VoteCard
                key={entry.id}
                entryId={entry.entryId}
                setName={entry.setName}
                designerName={entry.designerName}
                imageUrl={entry.imageUrl}
                initialVotes={entry.voteCount}
                initialVoted={votedSet.has(entry.entryId)}
                competition={slug}
                questions={questions.length > 0 ? questions : undefined}
                rank={i + 1}
              />
            ))
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href={`/designs?competition=${slug}`} style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
            View all entries →
          </Link>
        </div>
      </section>

      {/* ── Rules at a Glance ────────────────────────────── */}
      <section className="section">
        <h2 style={{ marginBottom: 14 }}>Rules at a glance</h2>
        <div className="rules-list">
          <div className="rules-item">
            <span className="rules-icon">🎨</span>
            <div>
              <strong>Any format welcome</strong> — JPG, PNG, or PDF. Hand-drawn sketches, digital renders, or AI-assisted concepts are all accepted, provided the design is your original creative work.
            </div>
          </div>
          <div className="rules-item">
            <span className="rules-icon">🤖</span>
            <div>
              <strong>AI policy</strong> — You may use AI tools to develop your concept, but the final submission must represent your original creative direction. Unmodified AI outputs without your own creative input are not eligible.
            </div>
          </div>
          <div className="rules-item">
            <span className="rules-icon">©️</span>
            <div>
              <strong>Your rights</strong> — You retain ownership of your design. By entering, you grant {loop.brandName} a licence to display, promote, and — for selected entries — develop your design for production, per the official rules.
            </div>
          </div>
          <div className="rules-item">
            <span className="rules-icon">🏆</span>
            <div>
              <strong>Winner selection</strong> — The shortlist is determined by community votes. Final selection is made by the {loop.brandName} team based on votes, brand fit, and production viability.
            </div>
          </div>
          <div className="rules-item">
            <span className="rules-icon">✓</span>
            <div>
              <strong>Verified voting</strong> — Each voter is limited to one vote per entry. Duplicate and suspicious votes are detected and removed. Vote counts reflect verified engagement only.
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <Link href="/legal" style={{ fontSize: 13, fontWeight: 700, textDecoration: 'underline', color: '#888' }}>
            Full competition rules and privacy policy →
          </Link>
        </div>
      </section>

      {/* ── Notify ───────────────────────────────────────── */}
      <section className="section">
        <NotifyForm competition={slug} status={loop.status} accent={accent} />
      </section>

      {/* ── Footer CTA ───────────────────────────────────── */}
      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>Ready to enter?</h2>
        <Link className="cta cta-dark" href={`/loops/${slug}/submit`} style={{ fontSize: 15 }}>
          {loop.ctaText || 'Submit Your Design'}
        </Link>
        <div className="footer-links">
          <Link href={`/designs?competition=${slug}`}>All Entries</Link>
          <Link href="/legal">Rules &amp; Privacy</Link>
          <Link href="/my-entry">Track My Entry</Link>
        </div>
      </section>
    </main>
  )
}
