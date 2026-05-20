import Link from 'next/link'

const INCLUDES = [
  'Branded competition portal',
  'Submission and voting system',
  'Pre-publication moderation tools',
  'Verified voter controls',
  'Entrant terms and rights workflow',
  'Analytics and demand dashboard',
  'Shortlist and winner management',
  'Exportable demand report',
]

const TRUST_ITEMS = [
  ['Pre-live moderation', 'Every submission is reviewed before going public. Nothing appears without your approval.'],
  ['Duplicate and suspicious vote detection', 'Rate limits, device signals, and pattern detection identify inauthentic activity.'],
  ['Country-specific eligibility rules', 'Age, location, and residency rules configured per market.'],
  ['Entrant terms and winner agreements', 'Digital acceptance of competition terms at submission. IP and rights configured to your legal requirements.'],
  ['GDPR-friendly data capture', 'Consent collected at submission. Data handling configured for your jurisdiction.'],
  ['Private and invite-only options', 'Loops can be password-protected or limited to invited participants.'],
]

const DEMO_LOOPS = [
  {
    href: '/loops/CBpolska',
    title: 'Cardio Bunny Poland',
    flag: '🇵🇱',
    category: 'Fashion / Activewear',
    desc: 'Design a matching activewear set for the Polish market. The community votes, and the top concept may go into production with a retail partner.',
    dark: false,
    logo: '/cardio-bunny-logo.png',
  },
  {
    href: '/loops/uk',
    title: 'Cardio Bunny UK',
    flag: '🇬🇧',
    category: 'Fashion / Activewear',
    desc: 'Design a matching activewear set for the UK market. Votes determine the shortlist, and the winning concept may be developed for a UK retail launch.',
    dark: false,
    logo: '/cardio-bunny-logo.png',
  },
  {
    href: '/loops/konkerz',
    title: 'Konkerz',
    flag: '🧸',
    category: 'Toys / Character Design',
    desc: 'Design the hero character for Grumpy Grandpa Battleball. The winning concept wins £1,000 and goes into production as a real toy.',
    dark: true,
    bg: '#1a0800',
    border: '#8b3a00',
    logo: '/konkerz-logo.png',
  },
  {
    href: '/loops/swomp',
    title: 'SWOMP WATER+',
    flag: '🥤',
    category: 'Beverages / Packaging',
    desc: 'Design the back panel of a new electrolyte water can. The top design wins €1,000 and may go into production across European markets.',
    dark: true,
    bg: '#0d1a0f',
    border: '#3a6b3d',
    logo: '/swomp-logo.png',
  },
]

export default function CrowdLoopsHome() {
  return (
    <main className="page">

      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="site-nav">
        <Link href="/" className="site-nav-brand">CrowdLoops</Link>
        <div className="site-nav-links">
          <Link href="#how-it-works" className="site-nav-link">How It Works</Link>
          <Link href="#examples" className="site-nav-link">Examples</Link>
          <Link href="#trust" className="site-nav-link">Brand Safety</Link>
          <Link href="/roster" className="site-nav-link">Loop Boosters</Link>
          <Link href="/contact" className="site-nav-link site-nav-cta">Book a Demo</Link>
          <Link href="/admin" className="site-nav-link" style={{ color: '#aaa', fontSize: 11 }}>Partner Sign In</Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero b2b-hero">
        <div style={{ width: '100%' }}>
          <div className="b2b-eyebrow">CrowdLoops - Retail Product Validation</div>
          <h1 className="b2b-headline">Validate product ideas with your customers before you produce them.</h1>
          <div className="b2b-sub">
            CrowdLoops is a white-label competition platform for retailers. Launch branded design challenges, collect verified votes and purchase-intent signals, and turn community creativity into a data-backed product shortlist.
          </div>
          <div className="b2b-ctas">
            <Link className="cta" href="/contact">Book a 20-minute demo</Link>
            <Link className="cta cta-ghost" href="#examples">See example loops</Link>
          </div>
        </div>
      </section>

      {/* ── What CrowdLoops Includes ─────────────────────── */}
      <section className="section">
        <div className="b2b-label">What CrowdLoops Includes</div>
        <h2>Everything to run a branded product validation campaign.</h2>
        <div className="includes-grid">
          {INCLUDES.map(item => (
            <div key={item} className="includes-item">
              <span className="includes-check">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, fontSize: 13, color: '#888', lineHeight: 1.6 }}>
          Now onboarding pilot retail partners in fashion, toys, beverage, and lifestyle categories.{' '}
          <Link href="/contact" style={{ fontWeight: 700, textDecoration: 'underline', color: '#555' }}>Get early access →</Link>
        </div>
      </section>

      {/* ── Dashboard ────────────────────────────────────── */}
      <section className="section">
        <div className="b2b-label">Intelligence Dashboard</div>
        <h2>A software tool - not a marketing agency.</h2>
        <div className="dashboard-frame" style={{ maxWidth: '100%' }}>
          <div className="dashboard-bar">
            <span className="dashboard-dot red" /><span className="dashboard-dot amber" /><span className="dashboard-dot green" />
            <span className="dashboard-url">studio.crowdloops.com</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: '#555' }}>Sample data shown</span>
          </div>
          <div className="dashboard-body">
            <div className="dashboard-header-row">
              <span className="dashboard-title">CROWDLOOPS STUDIO</span>
              <span className="dashboard-tag">LIVE</span>
            </div>
            <div className="dashboard-event-name">YourBrand × RetailPartner (UK) &nbsp;🟢 D-12</div>
            <div className="dashboard-metrics">
              <div className="dashboard-metric">
                <div className="dashboard-metric-val">1,420</div>
                <div className="dashboard-metric-label">Submissions</div>
              </div>
              <div className="dashboard-metric">
                <div className="dashboard-metric-val">12.5k</div>
                <div className="dashboard-metric-label">Verified Voters</div>
              </div>
              <div className="dashboard-metric">
                <div className="dashboard-metric-val">3,841</div>
                <div className="dashboard-metric-label">Notify-Me Signups</div>
              </div>
              <div className="dashboard-metric">
                <div className="dashboard-metric-val">98.2%</div>
                <div className="dashboard-metric-label">Vote Quality</div>
              </div>
            </div>
            <div className="dashboard-insights">
              <div className="dashboard-insight-row">
                <span className="insight-label">Top Style Signals</span>
                <span className="insight-tags">#BOLD &nbsp;#NEON &nbsp;#GYM</span>
              </div>
              <div className="dashboard-insight-row">
                <span className="insight-label">Fraud &amp; Duplicate Flags</span>
                <span className="insight-val trust">14 removed · 99.1% clean ✓</span>
              </div>
              <div className="dashboard-insight-row">
                <span className="insight-label">Shortlist Status</span>
                <span className="insight-val">Top 5 ready for buyer review</span>
              </div>
            </div>
            <div className="dashboard-actions">
              <button className="dash-btn">Review Shortlist</button>
              <button className="dash-btn dash-btn-dark">Export Demand Report</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="section" id="how-it-works">
        <div className="b2b-label">How It Works</div>
        <h2>From campaign brief to validated product shortlist.</h2>
        <div className="integration-table">
          <div className="integration-row">
            <div className="integration-step">01</div>
            <div className="integration-body">
              <div className="integration-focus">Launch - Branded competition portal</div>
              <div className="integration-benefit">Deploy a branded competition on your domain in around 48 hours once the brief, brand assets, and approvals are confirmed.</div>
            </div>
          </div>
          <div className="integration-row">
            <div className="integration-step">02</div>
            <div className="integration-body">
              <div className="integration-focus">Validate - Collect submissions and votes</div>
              <div className="integration-benefit">Your audience submits designs. Verified voters rank them. Feedback questions capture purchase intent, pricing sensitivity, and style preference - before a single unit is cut.</div>
            </div>
          </div>
          <div className="integration-row">
            <div className="integration-step">03</div>
            <div className="integration-body">
              <div className="integration-focus">Decide - Shortlist and produce</div>
              <div className="integration-benefit">Your buying team reviews the strongest concepts with full demand data, exports the report, and briefs production.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust & Brand Safety ─────────────────────────── */}
      <section className="section" id="trust">
        <div className="b2b-label">Brand Safety</div>
        <h2>Built for retail approval workflows.</h2>
        <div className="trust-list">
          {TRUST_ITEMS.map(([title, desc]) => (
            <div key={title} className="trust-item">
              <div className="trust-item-title">✓ {title}</div>
              <div className="trust-item-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Example Loops ────────────────────────────────── */}
      <section className="section" id="examples">
        <div className="b2b-label">Example Loop Formats</div>
        <h2>Illustrative demos across four product categories.</h2>
        <div className="demo-loop-slider">
          {DEMO_LOOPS.map(loop => (
            <div key={loop.href} className="demo-loop-slider-item">
              <Link href={loop.href} style={{ textDecoration: 'none' }}>
                <div
                  className="event-card demo-loop-card"
                  style={loop.dark ? { background: loop.bg, borderColor: loop.border } : {}}
                >
                  <div className="demo-loop-category" style={loop.dark ? { color: '#aaa' } : {}}>{loop.category}</div>
                  <div className="event-card-title" style={{ fontSize: 15, marginBottom: 8, ...(loop.dark ? { color: '#fff' } : {}) }}>
                    {loop.title} {loop.flag}
                  </div>
                  <div className="demo-loop-desc" style={loop.dark ? { color: '#bbb' } : {}}>{loop.desc}</div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
                    <div className="event-card-status open">🟡 Demo - view example</div>
                    {loop.logo && (
                      <img
                        src={loop.logo}
                        alt=""
                        style={{ height: 64, maxWidth: 160, objectFit: 'contain', filter: loop.dark ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: 0.9 }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section" id="retailers">
        <div className="b2b-label">Retailer FAQ</div>
        <h2>Questions buying, legal, and marketing teams ask.</h2>
        <div className="faq-list">
          <details open>
            <summary>Can we moderate entries before they go live?</summary>
            <p>Yes. Your team reviews entries on a private dashboard before anything is published. Nothing goes live without your approval.</p>
          </details>
          <details>
            <summary>How do you prevent fake votes?</summary>
            <p>Layered protection: verified email, rate limiting, device fingerprinting, and duplicate-pattern detection. Flagged votes are excluded from the demand report.</p>
          </details>
          <details>
            <summary>How do you handle IP and design rights?</summary>
            <p>Every entrant accepts event-specific terms before submitting. Licensing, transfer, and exclusivity are configured to match your legal requirements. We do not claim any rights to submissions.</p>
          </details>
          <details>
            <summary>How long does it take to launch?</summary>
            <p>Around 48 hours once the brief, brand assets, and approvals are confirmed. Multi-market campaigns or complex eligibility rules may take longer.</p>
          </details>
          <details>
            <summary>Can we run a private or invite-only competition?</summary>
            <p>Yes. Loops can be password-protected or limited to a specific audience — for example, existing loyalty members or trade contacts.</p>
          </details>
          <details>
            <summary>What does the output look like?</summary>
            <p>An exportable demand report: submission list, vote totals, feedback breakdowns, notify-me counts, and a ranked shortlist — ready for your buying team.</p>
          </details>
        </div>
      </section>

      {/* ── Roster CTA ───────────────────────────────────── */}
      <section className="section" style={{ background: '#111', borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
        <div className="b2b-label" style={{ color: '#aaa' }}>Loop Boosters</div>
        <h2 style={{ color: '#fff', marginBottom: 10 }}>Amplify every competition</h2>
        <div style={{ fontSize: 14, color: '#bbb', lineHeight: 1.6, marginBottom: 24 }}>
          Loop Boosters is our network of creators, influencers, and agencies who help drive entries and votes. List yourself once - brands discover you and reach out directly. No middlemen.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="cta" href="/roster/apply" style={{ background: '#fff', color: '#111', borderColor: '#fff' }}>
            Join Loop Boosters →
          </Link>
          <Link className="cta cta-ghost" href="/roster" style={{ borderColor: '#555', color: '#bbb' }}>
            Browse the Network
          </Link>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="section" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <h2>Ready to validate your next product?</h2>
        <Link className="cta" href="/contact" style={{ marginBottom: 14, display: 'inline-block' }}>
          Book a 20-minute demo
        </Link>
        <div style={{ marginTop: 12 }}>
          <Link href="/start" style={{ fontSize: 14, fontWeight: 700, textDecoration: 'underline', color: '#555' }}>
            Or submit a competition brief directly →
          </Link>
        </div>
      </section>

    </main>
  )
}
