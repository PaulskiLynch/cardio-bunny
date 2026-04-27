import Link from 'next/link'

export default function CrowdLoopsHome() {
  return (
    <main className="page">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero b2b-hero">
        <div style={{ width: '100%' }}>
          <div className="b2b-eyebrow">CrowdLoops</div>
          <h1 className="b2b-headline">The retail intelligence engine that turns community creativity into demand-tested products.</h1>
          <div className="b2b-sub">CrowdLoops is a white-label community design challenge that helps retailers engage customers, discover new talent, and validate demand before production.</div>
          <div className="b2b-ctas">
            <Link className="cta" href="/contact">Book a Demo</Link>
            <Link className="cta cta-ghost" href="#case-studies">View Live Events</Link>
          </div>
        </div>
      </section>

      {/* ── Why Retailers Use CrowdLoops ────────────────── */}
      <section className="section">
        <div className="b2b-label">Why Retailers Use CrowdLoops</div>
        <div className="logistics-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="logistics-card">
            <div className="logistics-icon">🎯</div>
            <div className="logistics-title">Reach New Audiences</div>
            <div className="logistics-text">Invite younger, digital-first customers to co-create products with your brand.</div>
          </div>
          <div className="logistics-card">
            <div className="logistics-icon">💬</div>
            <div className="logistics-title">Show You Listen</div>
            <div className="logistics-text">Turn customer feedback into visible product decisions, not just surveys.</div>
          </div>
          <div className="logistics-card">
            <div className="logistics-icon">🌱</div>
            <div className="logistics-title">Support Emerging Talent</div>
            <div className="logistics-text">Give everyday creators a real route from idea to shelf.</div>
          </div>
          <div className="logistics-card">
            <div className="logistics-icon">📊</div>
            <div className="logistics-title">Test Demand Before Production</div>
            <div className="logistics-text">Use submissions, votes, shares, and notify-me clicks to identify which concepts have traction before committing inventory.</div>
          </div>
        </div>
      </section>

      {/* ── 3-Step Integration ───────────────────────────── */}
      <section className="section">
        <div className="b2b-label">The 3-Step Integration</div>
        <h2>From Brief to Best-Seller in 3 Steps.</h2>
        <div className="integration-table">
          <div className="integration-row">
            <div className="integration-step">01</div>
            <div className="integration-body">
              <div className="integration-focus">Launch — Custom Brand Engine</div>
              <div className="integration-benefit">Deploy a branded competition portal on your own domain in 48 hours. Your logo, your colours, your rules.</div>
            </div>
          </div>
          <div className="integration-row">
            <div className="integration-step">02</div>
            <div className="integration-body">
              <div className="integration-focus">Validate — Market Intelligence</div>
              <div className="integration-benefit">Gather thousands of designs and real-time voting data from your exact target demographic before a single unit is cut.</div>
            </div>
          </div>
          <div className="integration-row">
            <div className="integration-step">03</div>
            <div className="integration-body">
              <div className="integration-focus">Produce — Demand-Led Production</div>
              <div className="integration-benefit">Identify the Winning Loop and move to production with a built-in customer base already ready to buy.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dashboard Mockup ─────────────────────────────── */}
      <section className="section">
        <div className="b2b-label">Intelligence Dashboard</div>
        <h2>A Software Tool — Not a Marketing Agency.</h2>
        <div className="b2b-sub" style={{ marginBottom: 24 }}>Every Loop turns community submissions, votes, and intent signals into a live demand dashboard — helping buying teams decide what to back before manufacturing starts.</div>
        <div className="dashboard-frame">
          <div className="dashboard-bar">
            <span className="dashboard-dot red" /><span className="dashboard-dot amber" /><span className="dashboard-dot green" />
            <span className="dashboard-url">studio.crowdloops.com</span>
          </div>
          <div className="dashboard-body">
            <div className="dashboard-header-row">
              <span className="dashboard-title">CROWDLOOPS STUDIO</span>
              <span className="dashboard-tag">LIVE</span>
            </div>
            <div className="dashboard-event-name">YourBrand x RetailPartner (UK) &nbsp;🟢 D-12</div>
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
                <div className="dashboard-metric-val">+18%</div>
                <div className="dashboard-metric-label">Week-on-Week Growth</div>
              </div>
            </div>
            <div className="dashboard-insights">
              <div className="dashboard-insight-row">
                <span className="insight-label">Top Style Signals</span>
                <span className="insight-tags">#BOLD &nbsp;#NEON &nbsp;#GYM</span>
              </div>
              <div className="dashboard-insight-row">
                <span className="insight-label">Notify-Me Clicks</span>
                <span className="insight-val">3,841</span>
              </div>
              <div className="dashboard-insight-row">
                <span className="insight-label">Vote Quality</span>
                <span className="insight-val trust">98.2% Verified ✓</span>
              </div>
            </div>
            <div className="dashboard-actions">
              <button className="dash-btn">Manage Entries</button>
              <button className="dash-btn dash-btn-dark">View Analytics</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Integration & Logistics ──────────────────────── */}
      <section className="section">
        <div className="b2b-label">Integration & Logistics</div>
        <h2>Fits Into How You Already Work.</h2>
        <div className="logistics-grid">
          <div className="logistics-card">
            <div className="logistics-icon">🏷</div>
            <div className="logistics-title">White-Label UI</div>
            <div className="logistics-text">It looks and feels like your brand, not ours. Your domain, your colours, your tone.</div>
          </div>
          <div className="logistics-card">
            <div className="logistics-icon">⚖️</div>
            <div className="logistics-title">Legal & Rights</div>
            <div className="logistics-text">Automated IP transfer. Every entry includes a digital contract so rights are transferred under the event terms for selected/winning entries, subject to the official rules.</div>
          </div>
        </div>
      </section>

      {/* ── Active Events ────────────────────────────────── */}
      <section className="section" id="case-studies">
        <div className="b2b-label">Featured Loop Formats</div>
        <h2>Demo Loops Running Now.</h2>
        <div className="b2b-sub" style={{ marginBottom: 24 }}>CrowdLoops works across fashion, beverages, toys, lifestyle — any product category where community taste matters. These are demo events showing the platform format.</div>
        <div className="event-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          <Link href="/biedronka" style={{ textDecoration: 'none' }}>
            <div className="event-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ height: 32, objectFit: 'contain' }} />
              </div>
              <div className="event-card-title">Cardio Bunny Poland 🇵🇱</div>
              <div className="event-card-text">Fashion — Design a matching activewear set. Winning design may be developed for production with an example retail partner in Poland.</div>
              <div className="event-card-status open">🟢 Demo Open</div>
            </div>
          </Link>
          <Link href="/uk" style={{ textDecoration: 'none' }}>
            <div className="event-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ height: 32, objectFit: 'contain' }} />
              </div>
              <div className="event-card-title">Cardio Bunny UK 🇬🇧</div>
              <div className="event-card-text">Fashion — Design a matching activewear set for the UK market. Retail partner announcement coming soon.</div>
              <div className="event-card-status open">🟢 Demo Open</div>
            </div>
          </Link>
          <Link href="/turkiye" style={{ textDecoration: 'none' }}>
            <div className="event-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <img src="/cardio-bunny-logo.png" alt="Cardio Bunny" style={{ height: 32, objectFit: 'contain' }} />
              </div>
              <div className="event-card-title">Cardio Bunny Türkiye 🇹🇷</div>
              <div className="event-card-text">Fashion — Design a matching activewear set for the Türkiye market. Retail partner announcement coming soon.</div>
              <div className="event-card-status open">🟢 Demo Open</div>
            </div>
          </Link>
          <Link href="/konkerz" style={{ textDecoration: 'none' }}>
            <div className="event-card" style={{ background: '#1a0800', borderColor: '#8b3a00' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <img src="/konkerz-logo.png" alt="Konkerz" style={{ height: 40, objectFit: 'contain' }} />
              </div>
              <div className="event-card-title" style={{ color: '#ff6b00' }}>Konkerz — Grumpy Grandpa</div>
              <div className="event-card-text" style={{ color: '#c8905a' }}>Toys — Design the hero character for the Grumpy Grandpa Battleball. Winning design wins £1,000 and goes into production.</div>
              <div className="event-card-status open">🟢 Demo Open</div>
            </div>
          </Link>
          <Link href="/swomp" style={{ textDecoration: 'none' }}>
            <div className="event-card" style={{ background: '#0d1a0f', borderColor: '#3a6b3d' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <img src="/swomp-logo.png" alt="SWOMP WATER+" style={{ height: 36, objectFit: 'contain' }} />
              </div>
              <div className="event-card-title" style={{ color: '#d4c5a0' }}>SWOMP WATER+</div>
              <div className="event-card-text" style={{ color: '#a0b89a' }}>Beverages — Design the back panel of our new electrolyte water can. Winning entry wins €1,000 and goes into production.</div>
              <div className="event-card-status open">🟢 Demo Open</div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Retailer FAQ ─────────────────────────────────── */}
      <section className="section">
        <div className="b2b-label">Retailer FAQ</div>
        <h2>Questions Buying, Legal, and Marketing Teams Always Ask.</h2>
        <div className="faq-list">
          <details open>
            <summary>How do you handle IP and design rights?</summary>
            <p>Every entrant accepts event-specific terms before submitting. Those terms include the rights needed for the brand to review, promote, select, and produce winning designs. Final ownership and usage rights are configured to match your legal requirements.</p>
          </details>
          <details>
            <summary>Can we moderate entries before they go live?</summary>
            <p>Yes. Your team gets a private dashboard to approve, reject, or hide submissions before they appear publicly. Nothing has to go live without your sign-off.</p>
          </details>
          <details>
            <summary>How do you prevent fake votes?</summary>
            <p>CrowdLoops uses layered vote protection, including login controls, device signals, rate limits, duplicate-pattern detection, and voter Trust Scores. Suspicious activity is flagged for review and can be excluded from winner selection.</p>
          </details>
          <details>
            <summary>How long does it take to launch?</summary>
            <p>A standard Loop can launch in around 48 hours once the brief, rules, branding assets, and approval flow are confirmed. More complex legal, retail, or localisation requirements may take longer.</p>
          </details>
          <details>
            <summary>What markets can we launch in?</summary>
            <p>CrowdLoops can be localised for different markets, languages, and retail partners. Current and planned Loops include Poland, the UK, and Türkiye, with new markets usually configured within 24–48 hours after assets and rules are approved.</p>
          </details>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="section" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <h2>Ready to Reach a New Audience?</h2>
        <div className="b2b-sub" style={{ marginBottom: 24 }}>Book a 20-minute demo. We'll show you a live Loop in your category.</div>
        <Link className="cta cta-dark" href="/contact">Book a Demo</Link>
      </section>

    </main>
  )
}
