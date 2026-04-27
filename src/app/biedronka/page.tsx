import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import VoteCard from '@/components/VoteCard'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function BiedronkaPage() {
  const top4 = await prisma.entry.findMany({
    where: { status: 'approved', competition: 'biedronka' },
    orderBy: { voteCount: 'desc' },
    take: 4,
  })

  return (
    <main className="page">
      <div style={{ padding: '12px 16px 0' }}>
        <Link className="top-link" href="/">← CrowdLoops</Link>
      </div>

      <section className="section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', padding: '20px 24px' }}>
        <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ maxHeight: 56, maxWidth: '45%', objectFit: 'contain' }} />
        <img src="/biedronka.png" alt="Biedronka" style={{ maxHeight: 56, maxWidth: '45%', objectFit: 'contain' }} />
      </section>

      <section className="hero">
        <div>
          <h1>Your Design. Made Real.</h1>
          <div className="subhead">No experience needed. Use AI, sketch it, or just snap it. If the community loves it, we make it real.</div>
          <div className="hero-actions">
            <Link className="cta" href="/submit">🚀 START DESIGNING / ENTER NOW</Link>
          </div>
          <img src="/hero-image.png" alt="" style={{ width: '100%', borderRadius: 18, objectFit: 'cover', display: 'block', marginTop: 16 }} />
        </div>
        <CountdownTimer />
      </section>

      <section className="section">
        <h2>What You Can Win</h2>
        <div className="reward-grid">
          <div className="reward-card">
            <div className="icon">🏆</div>
            <div className="card-title">WIN</div>
            <div className="card-text">Your collection can be selected, produced, and sold.</div>
          </div>
          <div className="reward-card">
            <div className="icon">💸</div>
            <div className="card-title">EARN</div>
            <div className="card-text">You can earn a percentage of profits from pieces sold.</div>
          </div>
          <div className="reward-card">
            <div className="icon">🚀</div>
            <div className="card-title">SCALE</div>
            <div className="card-text">Cardio Bunny helps take the winning idea from design to retail.</div>
          </div>
          <div className="reward-card">
            <div className="icon">🌟</div>
            <div className="card-title">RECOGNITION</div>
            <div className="card-text">Your name and entry can be seen by the community and supporters.</div>
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
          <Link href="/designs?competition=biedronka" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>See all</Link>
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
        <Link className="cta cta-dark" href="/submit">ENTER THE ACADEMY</Link>
        <div className="footer-links">
          <Link href="/designs?competition=biedronka">All Designs</Link>
          <Link href="/help">FAQs & Rules</Link>
        </div>
      </section>
    </main>
  )
}
