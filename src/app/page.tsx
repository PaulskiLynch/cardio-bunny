import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const top4 = await prisma.entry.findMany({
    where: { status: 'approved' },
    orderBy: { voteCount: 'desc' },
    take: 4,
  })

  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>Your Design. Made Real.</h1>
          <div className="subhead">No experience needed. Use AI, sketch it, or just snap it. If the community loves it, we make it real.</div>
          <div className="hero-actions">
            <Link className="cta" href="/submit">🚀 START DESIGNING / ENTER NOW</Link>
          </div>
        </div>
        <CountdownTimer />
      </section>

      <section className="section">
        <h2>Retail Partner</h2>
        <div className="card-text">Biedronka brings style, quality, and affordability to millions of consumers.</div>
        <div style={{ marginTop: 18, borderRadius: 18, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
          <img src="/biedronka.png" alt="Biedronka" style={{ maxWidth: '100%', maxHeight: 160, objectFit: 'contain' }} />
        </div>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18 }}>
          <div>
            <h2 style={{ margin: 0 }}>Community Favorites</h2>
            <div className="card-text">Vote for the designs you want to see made.</div>
          </div>
          <Link href="/designs" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>See all</Link>
        </div>
        <div className="design-grid">
          {top4.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontWeight: 700 }}>
              No approved entries yet. Be the first to submit!
            </div>
          )}
          {top4.map(entry => (
            <article key={entry.id} className="entry-card">
              <div className="entry-image">
                <span className="entry-id-badge">ID: {entry.entryId}</span>
                {entry.imageUrl
                  ? <img src={entry.imageUrl} alt={entry.setName} />
                  : <span>{entry.setName}</span>}
              </div>
              <div className="entry-body">
                <div className="designer-row">
                  <div className="designer-name">{entry.designerName}</div>
                  <div className="vote-count">{entry.voteCount.toLocaleString()} Votes</div>
                </div>
                <Link href={`/entry/${entry.entryId}`} className="vote-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', lineHeight: '26px' }}>
                  ♥ VOTE
                </Link>
              </div>
            </article>
          ))}
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

      <section className="section" id="rules">
        <h2>FAQs & Rules</h2>
        <div className="faq-list">
          <details open>
            <summary>Who can enter?</summary>
            <p>Anyone can enter. No fashion experience is needed.</p>
          </details>
          <details>
            <summary>What can I submit?</summary>
            <p>A Top and Legging set idea. AI images, sketches, or photos are all accepted.</p>
          </details>
          <details>
            <summary>Will my image go live straight away?</summary>
            <p>No. All uploaded images are checked by moderators before they appear publicly.</p>
          </details>
          <details>
            <summary>How does voting work?</summary>
            <p>Approved entries receive an official link. Share your link and ask the community to vote.</p>
          </details>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center', padding: '34px 20px' }}>
        <h2>Ready to change your life?</h2>
        <Link className="cta cta-dark" href="/submit">ENTER THE ACADEMY</Link>
        <div className="footer-links">
          <Link href="/designs">All Designs</Link>
          <Link href="/help">FAQs & Rules</Link>
        </div>
      </section>
    </main>
  )
}
