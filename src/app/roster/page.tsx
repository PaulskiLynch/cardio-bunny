import Link from 'next/link'
import { prisma } from '@/lib/db'
import RosterBrowser from './RosterBrowser'

export const dynamic = 'force-dynamic'

export default async function RosterPage() {
  const profiles = await prisma.partnerApplication.findMany({
    where: { competition: '' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="page">
      <Link className="top-link" href="/">← Home</Link>

      {/* Demo badge */}
      <div className="roster-demo-badge">
        ⚠️ DEMO — These are sample profiles. Actual availability, metrics, and rates vary by campaign.
      </div>

      <section className="feed-title">
        <h1>Loop Boosters</h1>
        <div className="subtitle">
          Creators, agencies, and PR partners available to amplify design competitions.
        </div>
        <div className="roster-vetted-badge">
          ✓ Every Booster is reviewed by CrowdLoops before joining
        </div>
      </section>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <Link href="/contact" className="roster-cta-primary">Book a Booster Demo →</Link>
        <Link href="/roster/apply" className="roster-cta-secondary">Apply to Join</Link>
      </div>

      <RosterBrowser initial={profiles.map(p => ({
        id:           p.id,
        handle:       p.handle,
        name:         p.name,
        specialty:    p.specialty,
        role:         p.role,
        reach:        p.reach,
        platform:     p.platform,
        portfolioUrl: p.portfolioUrl,
        avatarUrl:    p.avatarUrl,
        followers:    (p as Record<string, unknown>).followers as string ?? '',
        engagement:   (p as Record<string, unknown>).engagement as string ?? '',
        location:     (p as Record<string, unknown>).location as string ?? '',
      }))} />

      {/* How it works */}
      <section className="roster-info-section">
        <div className="roster-section-label">How it works</div>
        <h2 className="roster-section-title">How Loop Boosters work</h2>
        <div className="roster-how-steps">
          <div className="roster-how-step">
            <div className="roster-how-num">1</div>
            <div>
              <div className="how-step-title">Browse the roster</div>
              <div className="how-step-body">Filter by type, reach, and platform to find the right fit for your campaign.</div>
            </div>
          </div>
          <div className="roster-how-step">
            <div className="roster-how-num">2</div>
            <div>
              <div className="how-step-title">Invite to a Loop</div>
              <div className="how-step-body">Send a brief and budget. The Booster pitches back within 48 hours.</div>
            </div>
          </div>
          <div className="roster-how-step">
            <div className="roster-how-num">3</div>
            <div>
              <div className="how-step-title">Amplify your competition</div>
              <div className="how-step-body">They promote, share, and drive entries — more submissions, higher reach.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Booster types */}
      <section className="roster-info-section">
        <div className="roster-section-label">Booster types</div>
        <h2 className="roster-section-title">Find your Booster</h2>
        <div className="roster-types-grid">
          <div className="roster-type-card">
            <div className="roster-type-icon">📣</div>
            <div className="roster-type-title">Creators &amp; Influencers</div>
            <div className="roster-type-body">Drive organic reach through authentic content on TikTok, Instagram, and YouTube.</div>
          </div>
          <div className="roster-type-card">
            <div className="roster-type-icon">🏢</div>
            <div className="roster-type-title">Agencies</div>
            <div className="roster-type-body">Full-service campaign support — strategy, creative, and distribution.</div>
          </div>
          <div className="roster-type-card">
            <div className="roster-type-icon">📰</div>
            <div className="roster-type-title">PR Consultants</div>
            <div className="roster-type-body">Get your competition in front of press, trade publications, and newsletters.</div>
          </div>
          <div className="roster-type-card">
            <div className="roster-type-icon">✏️</div>
            <div className="roster-type-title">Independent Designers</div>
            <div className="roster-type-body">Expand your entry pool with design-community outreach and peer promotion.</div>
          </div>
        </div>
      </section>
    </main>
  )
}
