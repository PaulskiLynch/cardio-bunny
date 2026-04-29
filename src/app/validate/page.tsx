import Link from 'next/link'
import StickyBar from './StickyBar'
import './mkt.css'

export const metadata = {
  title: 'CrowdLoops — Validate Products Before You Produce Them',
  description: 'Launch a branded design competition. Get real consumer demand data. Then produce what the data proves will sell.',
}

const USPS = [
  {
    num: '01',
    headline: 'Anyone can enter. AI, sketch, or photo.',
    body: 'No design degree required. No expensive software. A teenager in Warsaw, a designer in Seoul, a parent in Texas — anyone with a phone and an idea can submit. AI-assisted concepts are welcome. Hand-drawn sketches are welcome. The best idea wins, not the best technical skills.',
    benefit: 'Larger, more diverse entry pool. Better signals for your category — whether that is handbags, headphones, or hamster cages.',
  },
  {
    num: '02',
    headline: 'Every entrant becomes a marketer. Every voter shares the loop.',
    body: 'Traditional marketing: you pay to reach people. Community influencing: entrants share to win. Their friends vote. Their friends enter. The loop repeats — for free. One campaign generates organic reach that paid media cannot match.',
    benefit: 'Lower customer acquisition cost. Higher engagement. Built-in virality. Works for every category because people love showing off what they made.',
  },
  {
    num: '03',
    headline: 'See what sells — before you make a single unit.',
    body: 'Every competition generates a live dashboard. Submission volume. Verified voter demographics. Notify-me signups (purchase intent). Top style signals. Export a report for your buying team. Then decide what to produce — backed by data, not gut feeling.',
    benefit: 'Reduce write-offs. Stop overproducing losers. Double down on winners. Toys that kids actually want. Beauty shades that customers crave. Electronics features users ask for.',
    callout: true,
  },
  {
    num: '04',
    headline: 'Post once. Let vetted creators pitch. Pick the best.',
    body: 'Most platforms make you chase influencers, negotiate rates, and pray they post. Loop Boosters flips the model. You post a brief and budget. Vetted creators, agencies, and PR partners pitch you. You pick the best fit. They promote. You get entries. No middlemen. No markup.',
    benefit: 'Better rates. Higher quality. Zero chasing. They compete. You win.',
    flow: true,
  },
  {
    num: '05',
    headline: 'Built for procurement, legal, and brand teams.',
    body: 'Pre-moderation. Verified voting. IP and rights workflows. GDPR-friendly data capture. Country-specific eligibility rules. Private or invite-only options. Every control your legal and compliance teams require — built in, not bolted on.',
    benefit: 'Launch without fear. Your brand stays safe. Your team stays happy. Toys need safety compliance? Configured. Beauty needs ingredient disclaimers? Configured. Alcohol needs age gating? Configured.',
  },
]

const CATEGORIES = [
  { label: 'Fashion',    name: 'Cardio Bunny',   type: 'Activewear design',         stat: '1,400+ submissions', href: '/contact' },
  { label: 'Toys',       name: 'Konkerz',         type: 'Character design',          stat: '850+ submissions',   href: '/loops/biedronka' },
  { label: 'Beverages',  name: 'SWOMP WATER+',    type: 'Can packaging',             stat: '600+ submissions',   href: '/contact' },
  { label: 'Beauty',     name: 'Glow Up Lab',     type: 'Shade name + formula',      stat: 'Demo available',     href: '/contact' },
]

const FAQ = [
  { q: 'Can we run a competition for toys?',    a: 'Yes. Character design, playset concepts, packaging — whatever you need. Age-gating and safety compliance built in.' },
  { q: 'What about beauty?',                    a: 'Shade names, formula concepts, packaging design. Ingredient disclaimers and regional compliance supported.' },
  { q: 'Electronics?',                          a: 'Feature suggestions, industrial design concepts, accessory ideas. Works for hardware and soft goods.' },
  { q: 'Home goods?',                           a: 'Furniture, decor, kitchenware — sketches, renders, or photos. Community votes on style and functionality.' },
  { q: 'Pet products?',                         a: 'Absolutely. Toys, beds, accessories, treats packaging. Pet owners love designing for their animals.' },
  { q: 'Beverages?',                            a: 'Flavour concepts, can or bottle design, limited edition branding. Age verification for alcohol categories available.' },
  { q: 'Sporting goods?',                       a: 'Apparel, equipment, accessories. Works for team sports, outdoor, fitness, and active lifestyle.' },
]

export default function ValidatePage() {
  return (
    <div className="mkt-wrap">
      <StickyBar />

      {/* ── Nav ─────────────────────────────────── */}
      <nav className="mkt-nav">
        <Link href="/" className="mkt-nav-logo">CrowdLoops</Link>
        <div className="mkt-nav-links">
          <a href="#how-it-works">How It Works</a>
          <Link href="/roster">Loop Boosters</Link>
          <a href="#brand-safety">Brand Safety</a>
        </div>
        <Link href="/contact" className="mkt-nav-cta">Book a Demo</Link>
      </nav>

      {/* ── Hero ─────────────────────────────────── */}
      <section className="mkt-hero">
        <div className="mkt-pilot-badge">
          ⚡ Now piloting with retailers in the UK, Poland, Germany, and Ireland
        </div>
        <h1 className="mkt-h1">
          Real consumer insights<br className="mkt-br" /> before production.<br />
          And influencers compete<br className="mkt-br" /> to work for you.
        </h1>
        <p className="mkt-hero-sub">
          Launch a branded design competition. Your customers create. Their communities vote.
          Get a demand dashboard with purchase-intent data. Then produce what the data proves will sell.{' '}
          <span className="mkt-categories-inline">Fashion. Toys. Beauty. Beverages. Electronics. Home. Pet. Any category.</span>
        </p>
        <div className="mkt-hero-ctas">
          <Link href="/contact" className="mkt-btn-primary">Book a 20-minute demo →</Link>
          <a href="#how-it-works" className="mkt-btn-ghost">See how it works ↓</a>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────── */}
      <section className="mkt-problem">
        <h2 className="mkt-section-h2">Every year, retailers lose millions on products nobody asked for.</h2>
        <div className="mkt-pain-list">
          <div className="mkt-pain-item">
            <span className="mkt-pain-x">❌</span>
            <span>You guess what will sell — then pray. No real data until it&apos;s on the shelf.</span>
          </div>
          <div className="mkt-pain-item">
            <span className="mkt-pain-x">❌</span>
            <span>You waste budget on marketing — that hopes to create demand after production.</span>
          </div>
          <div className="mkt-pain-item">
            <span className="mkt-pain-x">❌</span>
            <span>You compete with brands who validate products in weeks — while you&apos;re still in internal review.</span>
          </div>
        </div>
        <p className="mkt-problem-close">
          There is a better way. Ask your customers what they want — before you cut a single unit.
          Doesn&apos;t matter if it is activewear, energy drinks, or dog beds.
        </p>
      </section>

      {/* ── Solution ─────────────────────────────── */}
      <section className="mkt-solution">
        <div className="mkt-solution-inner">
          <div className="mkt-label">The Solution</div>
          <h2 className="mkt-h2">CrowdLoops lets you validate products with your customers — at scale, in weeks, for a fraction of traditional R&D.</h2>
          <p className="mkt-solution-sub">
            Launch a branded competition. Your audience submits designs. Their communities vote. Your buying team gets a demand dashboard.
            Then you produce what won. Toys. Beauty. Electronics. Home. Beverages. Pet. Sporting goods. Anything.
          </p>
        </div>
      </section>

      {/* ── USPs ─────────────────────────────────── */}
      <section className="mkt-usps">
        <div className="mkt-label">Why it works</div>
        <h2 className="mkt-h2">Five reasons CrowdLoops works for any product category.</h2>

        {USPS.map(u => (
          <div key={u.num} className="mkt-usp-card">
            <div className="mkt-usp-num">{u.num}</div>
            <div className="mkt-usp-body">
              <h3 className="mkt-usp-h3">{u.headline}</h3>
              <p className="mkt-usp-p">{u.body}</p>

              {u.callout && (
                <div className="mkt-dashboard-callout">
                  <div className="mkt-dashboard-label">Sample dashboard snapshot</div>
                  <div className="mkt-dashboard-stats">
                    <div className="mkt-ds"><div className="mkt-ds-val">1,420</div><div className="mkt-ds-label">Submissions</div></div>
                    <div className="mkt-ds"><div className="mkt-ds-val">12.5k</div><div className="mkt-ds-label">Verified voters</div></div>
                    <div className="mkt-ds"><div className="mkt-ds-val">3,841</div><div className="mkt-ds-label">Notify-me signups</div></div>
                  </div>
                  <div className="mkt-dashboard-signals">Top signals: <strong>#BOLD #NEON #GYM</strong></div>
                  <div className="mkt-dashboard-fraud">Fraud detected and removed: 14 · 99.1% clean</div>
                </div>
              )}

              {u.flow && (
                <div className="mkt-flow">
                  {['YOU post a brief + budget', 'BOOSTERS pitch you', 'YOU pick the best', 'Campaign amplifies'].map((step, i, arr) => (
                    <div key={step} className="mkt-flow-row">
                      <div className="mkt-flow-step">{step}</div>
                      {i < arr.length - 1 && <div className="mkt-flow-arrow">↓</div>}
                    </div>
                  ))}
                </div>
              )}

              <div className="mkt-usp-benefit">✓ {u.benefit}</div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Category grid ────────────────────────── */}
      <section className="mkt-categories-section">
        <div className="mkt-label">Real campaigns</div>
        <h2 className="mkt-h2">Works for any category. Here are four demos.</h2>
        <div className="mkt-cat-grid">
          {CATEGORIES.map(c => (
            <div key={c.label} className="mkt-cat-card">
              <div className="mkt-cat-label">{c.label}</div>
              <div className="mkt-cat-name">{c.name}</div>
              <div className="mkt-cat-type">{c.type}</div>
              <div className="mkt-cat-stat">{c.stat}</div>
              <Link href={c.href} className="mkt-cat-link">View demo →</Link>
            </div>
          ))}
        </div>
        <p className="mkt-cat-footer">
          Electronics? Home goods? Pet products? Sporting equipment?{' '}
          <strong>Same platform. Same viral loop. Same demand data.</strong> Just different questions.
        </p>
      </section>

      {/* ── Social proof ─────────────────────────── */}
      <section className="mkt-proof">
        <div className="mkt-label">Trusted by teams preparing to launch</div>
        <p className="mkt-proof-text">
          Piloting with leading retailers across fashion, toys, beverages, beauty, electronics, home goods, and pet products — in the UK, Poland, Germany, and Ireland.
        </p>
        <blockquote className="mkt-quote">
          <p>
            &ldquo;We ran a CrowdLoops competition instead of our usual focus group. 1,400 submissions, 12k votes,
            and 3,800 customers told us exactly what they wanted. That data saved us a $200k production mistake —
            and we are not even in fashion. We are in pet accessories.&rdquo;
          </p>
          <cite>— Head of Product, European pet retailer (pilot partner)</cite>
        </blockquote>
      </section>

      {/* ── ROI table ────────────────────────────── */}
      <section className="mkt-roi">
        <div className="mkt-label">The business case</div>
        <h2 className="mkt-h2">What is a failed product launch worth to you?</h2>
        <div className="mkt-roi-table">
          <div className="mkt-roi-header">
            <div />
            <div className="mkt-roi-col-head mkt-roi-old">Traditional R&amp;D</div>
            <div className="mkt-roi-col-head mkt-roi-new">CrowdLoops</div>
          </div>
          {[
            ['Time to validation',                    '4–8 months',                     '4–6 weeks'],
            ['Cost of a mistake',                     '£100k–£500k+',                   '£5k–£15k per campaign'],
            ['Customer data before production',       'None (focus groups at best)',     '1,000+ votes, notify-me signals'],
            ['Marketing budget to launch',            '£50k–£200k',                     'Built-in virality'],
            ['Works across categories',               'No — new process every time',    'Yes — one platform, any product'],
          ].map(([row, old, nw]) => (
            <div key={row} className="mkt-roi-row">
              <div className="mkt-roi-label">{row}</div>
              <div className="mkt-roi-old">{old}</div>
              <div className="mkt-roi-new">{nw}</div>
            </div>
          ))}
        </div>
        <p className="mkt-roi-close">
          CrowdLoops does not just save you money. It helps you make products people actually want — in any category.
        </p>
      </section>

      {/* ── How it works ─────────────────────────── */}
      <section id="how-it-works" className="mkt-how">
        <div className="mkt-label">Three steps</div>
        <h2 className="mkt-h2">Three steps. One dashboard. A better product shortlist.</h2>
        <div className="mkt-steps">
          {[
            {
              n: '1', title: 'Launch',
              body: 'Deploy a branded competition portal on your domain in around 48 hours. Your logo. Your colours. Your rules. Configure for your category — beauty, toys, electronics, anything.',
            },
            {
              n: '2', title: 'Validate',
              body: 'Your audience submits designs. Verified voters rank them. The dashboard captures every signal — votes, demographics, purchase intent, style preferences. Category-specific signals too.',
            },
            {
              n: '3', title: 'Decide',
              body: 'Export the demand report. Brief your production team. Launch to an audience already engaged before the product hits the shelf.',
            },
          ].map(s => (
            <div key={s.n} className="mkt-step">
              <div className="mkt-step-num">{s.n}</div>
              <div>
                <div className="mkt-step-title">{s.title}</div>
                <div className="mkt-step-body">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section id="brand-safety" className="mkt-faq">
        <div className="mkt-label">One platform. Every category.</div>
        <h2 className="mkt-h2">Same questions answered.</h2>
        <div className="mkt-faq-list">
          {FAQ.map(f => (
            <div key={f.q} className="mkt-faq-item">
              <div className="mkt-faq-q">{f.q}</div>
              <div className="mkt-faq-a">{f.a}</div>
            </div>
          ))}
        </div>
        <p className="mkt-faq-close">
          If you can ask &ldquo;what should we make next?&rdquo; — CrowdLoops can validate the answer. Any category.
        </p>
      </section>

      {/* ── Final CTA ────────────────────────────── */}
      <section className="mkt-final-cta">
        <h2 className="mkt-final-h2">Stop guessing.<br />Start validating.</h2>
        <p className="mkt-final-sub">
          Get real consumer insights before production.<br />
          And let influencers compete to work for your campaign.
        </p>
        <div className="mkt-final-ctas">
          <Link href="/contact" className="mkt-btn-primary mkt-btn-lg">Book a 20-minute demo →</Link>
          <Link href="/contact" className="mkt-btn-ghost">Or submit a competition brief →</Link>
        </div>
        <p className="mkt-final-small">
          No pressure. No pitch for services you do not need. Just a walkthrough of how CrowdLoops works —
          for fashion, toys, beauty, electronics, home goods, beverages, pet products, and everything else.
        </p>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="mkt-footer">
        <div className="mkt-footer-links">
          <Link href="/">CrowdLoops</Link>
          <a href="#how-it-works">How It Works</a>
          <Link href="/roster">Loop Boosters</Link>
          <a href="#brand-safety">Brand Safety</a>
          <Link href="/contact">Pricing</Link>
          <Link href="/legal">Privacy Policy</Link>
          <Link href="/legal">Terms</Link>
        </div>
        <div className="mkt-footer-copy">© CrowdLoops. All rights reserved.</div>
      </footer>
    </div>
  )
}
