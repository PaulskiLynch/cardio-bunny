import Link from 'next/link'
import BackButton from '@/components/BackButton'

export const metadata = { title: 'Privacy Policy — CrowdLoops' }

const h2Style = { fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 } as const
const sectionStyle = { marginTop: 32 } as const

export default function PrivacyPage() {
  return (
    <main className="page">
      <div className="portal" style={{ maxWidth: 720 }}>
        <BackButton />
        <header className="portal-header">
          <div className="brand">CrowdLoops</div>
          <div className="phase">Privacy Policy</div>
        </header>

        <div style={{ padding: '0 20px 40px' }}>

          <div style={{ marginTop: 24, marginBottom: 8, fontSize: 13, color: '#888' }}>
            Last updated: 20/05/2026
          </div>

          <section style={sectionStyle}>
            <h2 style={h2Style}>1. Who We Are</h2>
            <p>CrowdLoops is a white-label product validation competition platform operated by CrowdLoops. When you use CrowdLoops — whether as an entrant, a voter, or a visitor — we process certain personal data to operate the platform.</p>
            <p>For questions about this policy or your data, contact us at <a href="mailto:contact@crowdloops.com" style={{ fontWeight: 700 }}>contact@crowdloops.com</a>.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>2. What Data We Collect and Why</h2>

            <p><strong>When you submit a competition entry:</strong></p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Name and contact email — to administer your entry, contact you if you are shortlisted or win, and verify eligibility.</li>
              <li>Your design submission and inspiration text — to display on the platform and for pre-publication moderation.</li>
              <li>Competition name and submission timestamp — to manage event administration.</li>
            </ul>

            <p style={{ marginTop: 16 }}><strong>When you vote:</strong></p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Your authenticated user ID (via Clerk) — to enforce the one-vote-per-person rule.</li>
              <li>Vote timestamp and competition identifier — to count verified votes accurately.</li>
              <li>Device and session signals — used for duplicate detection and vote integrity. This is personal data and is handled accordingly.</li>
            </ul>

            <p style={{ marginTop: 16 }}><strong>When you sign up for notifications:</strong></p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Your email address — to send you updates about the competition you expressed interest in. You can unsubscribe at any time.</li>
            </ul>

            <p style={{ marginTop: 16 }}><strong>When you visit the platform:</strong></p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Aggregated usage analytics (via Vercel Analytics) — page views and general traffic patterns. No personal profile is built from this data.</li>
              <li>Performance data (via Vercel Speed Insights) — page load metrics used to improve the platform.</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>3. Legal Basis for Processing</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Contract performance</strong> — processing your entry, administering voting, and contacting winners.</li>
              <li><strong>Legitimate interests</strong> — fraud and duplicate vote detection, platform security, and improving the service.</li>
              <li><strong>Consent</strong> — notification sign-ups and any optional marketing communications. You may withdraw consent at any time.</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>4. Data Processors We Use</h2>
            <p>We use the following third-party processors, each bound by a data processing agreement:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Clerk</strong> — user authentication and identity management.</li>
              <li><strong>Vercel</strong> — platform hosting, analytics, and speed insights.</li>
              <li><strong>Turso</strong> — database storage for entries, votes, and competition data.</li>
              <li><strong>Vercel Blob</strong> — image storage for submitted design files.</li>
              <li><strong>Resend</strong> — transactional email (entry confirmations, winner notifications).</li>
            </ul>
            <p>We do not sell your data to any third party.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>5. How Long We Keep Your Data</h2>
            <p>Entry and vote data is retained for the duration of the competition plus 12 months, unless you request deletion earlier or we are required to retain it by law (for example, for prize payment records).</p>
            <p>Notification sign-up emails are retained until you unsubscribe or request deletion.</p>
            <p>Analytics data is aggregated and does not identify individuals.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>6. Your Rights Under GDPR</h2>
            <p>If you are based in the EEA or UK, you have the following rights:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong> — ask us to correct inaccurate or incomplete data.</li>
              <li><strong>Deletion</strong> — ask us to delete your data, subject to legal retention obligations.</li>
              <li><strong>Restriction</strong> — ask us to restrict processing of your data in certain circumstances.</li>
              <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent</strong> — where processing is based on consent, you may withdraw it at any time without affecting prior processing.</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:contact@crowdloops.com" style={{ fontWeight: 700 }}>contact@crowdloops.com</a>. We will respond within 30 days.</p>
            <p>You also have the right to lodge a complaint with your local data protection supervisory authority.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>7. International Transfers</h2>
            <p>Some of our processors (including Vercel and Clerk) operate infrastructure in the United States. Where personal data is transferred outside the EEA or UK, we ensure appropriate safeguards are in place, including Standard Contractual Clauses where required.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>8. Children</h2>
            <p>CrowdLoops competitions are open to persons aged 18 and over, or 16–17 with verifiable parental or guardian consent. We do not knowingly collect personal data from children under 16 without parental consent. If you believe we have collected data from a child under 16 without appropriate consent, contact us immediately at <a href="mailto:contact@crowdloops.com" style={{ fontWeight: 700 }}>contact@crowdloops.com</a>.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will post the updated version on this page with a revised "Last updated" date. For material changes, we will notify active users by email where we hold a valid address.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>10. Contact</h2>
            <p>For any privacy questions, data rights requests, or complaints:</p>
            <p style={{ marginTop: 8 }}>
              <strong>contact@crowdloops.com</strong>
            </p>
          </section>

          <div style={{ marginTop: 40, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 12, color: '#888' }}>
            <Link href="/legal" style={{ fontWeight: 700, color: '#555', textDecoration: 'underline' }}>Platform rules →</Link>
            {' · '}
            <Link href="/cookies" style={{ fontWeight: 700, color: '#555', textDecoration: 'underline' }}>Cookie policy →</Link>
          </div>

        </div>
      </div>
    </main>
  )
}
