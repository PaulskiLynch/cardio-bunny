import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import VoteCard from '@/components/VoteCard'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function CardioUKPage() {
  const top4 = await prisma.entry.findMany({
    where: { status: 'approved', competition: 'uk' },
    orderBy: { voteCount: 'desc' },
    take: 4,
  })

  return (
    <main className="page">
      <div className="demo-notice">⚠️ Demo Only — This is not a live competition.</div>

      <section className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '20px 24px' }}>
        <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ maxHeight: 56, maxWidth: '60%', objectFit: 'contain' }} />
        <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555' }}>United Kingdom</div>
      </section>

      <section className="hero">
        <div>
          <h1>Your Design. Made Real.</h1>
          <div className="subhead">No experience needed. Use AI, sketch it, or just snap it. If the community loves it, we make it real.</div>
          <div className="hero-actions">
            <Link className="cta" href="/uk/submit">🚀 START DESIGNING / ENTER NOW</Link>
          </div>
          <img src="/hero-image.png" alt="" style={{ width: '100%', borderRadius: 18, objectFit: 'cover', display: 'block', marginTop: 16 }} />
        </div>
        <CountdownTimer deadline="2026-05-31T23:59:59Z" />
      </section>

      <section className="section">
        <h2>Prizes</h2>
        <div className="prize-section">
          <div className="prize-top10">
            <div className="prize-top10-badge">TOP 10</div>
            <div className="prize-top10-text">1 full day of training with the Cardio Bunny global design team.</div>
          </div>
          <div className="prize-grand">
            <div className="prize-grand-header">🏆 Grand Winner</div>
            <div className="prize-cash">£2,000</div>
            <div className="prize-items">
              <div className="prize-item">
                <div className="prize-item-icon">🌍</div>
                <div className="prize-item-text"><strong>Global Fame:</strong> Your name and design showcased in Cardio Bunny showrooms worldwide. 🇺🇸 🇬🇧 🇦🇪 🇮🇳 🇨🇦</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📰</div>
                <div className="prize-item-text"><strong>Press:</strong> Feature profile article in a leading fashion magazine.</div>
              </div>
              <div className="prize-item">
                <div className="prize-item-icon">📸</div>
                <div className="prize-item-text"><strong>Production:</strong> Professional Miami-based photo shoot of your winning collection.</div>
              </div>
            </div>
          </div>
          <div className="prize-tba">
            <div className="prize-item-icon">🛍</div>
            <div className="prize-tba-label">Retail Partner: TBA — Your design could be sold nationwide. Partner announcement coming soon.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Community Favorites</h2>
          <div className="card-text">Vote for the designs you want to see made.</div>
        </div>
        <div className="design-grid">
          {top4.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontWeight: 700 }}>
              No approved entries yet. Be the first to submit!
            </div>
          )}
          {top4.map(entry => (
            <VoteCard
              key={entry.id}
              entryId={entry.entryId}
              setName={entry.setName}
              designerName={entry.designerName}
              imageUrl={entry.imageUrl}
              initialVotes={entry.voteCount}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/designs?competition=uk" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>See all</Link>
        </div>
      </section>

      <section className="section">
        <h2>Create. Share. Win.</h2>
        <div className="steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="card-title">UPLOAD</div>
            <div className="card-text">Drop your Top & Legging idea. AI, sketch, or photo all accepted.</div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="card-title">SHARE</div>
            <div className="card-text">Get your official ID and share your link for votes.</div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="card-title">GO GLOBAL</div>
            <div className="card-text">Top designs get produced and sold by Cardio Bunny.</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>Ready to change your life?</h2>
        <Link className="cta cta-dark" href="/uk/submit">ENTER THE ACADEMY</Link>
        <div className="footer-links">
          <Link href="/designs?competition=uk">All Designs</Link>
          <Link href="/help">FAQs & Rules</Link>
        </div>
      </section>
    </main>
  )
}
