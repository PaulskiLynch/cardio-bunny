import Link from 'next/link'
import BackButton from '@/components/BackButton'

export const metadata = { title: 'Cookie Policy — CrowdLoops' }

const h2Style = { fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 } as const
const sectionStyle = { marginTop: 32 } as const

export default function CookiesPage() {
  return (
    <main className="page">
      <div className="portal" style={{ maxWidth: 720 }}>
        <BackButton />
        <header className="portal-header">
          <div className="brand">CrowdLoops</div>
          <div className="phase">Cookie Policy</div>
        </header>

        <div style={{ padding: '0 20px 40px' }}>

          <div style={{ marginTop: 24, marginBottom: 8, fontSize: 13, color: '#888' }}>
            Last updated: 20/05/2026
          </div>

          <section style={sectionStyle}>
            <h2 style={h2Style}>1. What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, remember your preferences, and provide information to site owners.</p>
            <p>CrowdLoops uses a minimal set of cookies. We do not use advertising or tracking cookies, and we do not build personal profiles for marketing purposes.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>2. Cookies We Use</h2>

            <p style={{ marginBottom: 12 }}><strong>Strictly Necessary Cookies</strong></p>
            <p>These cookies are essential to operate the platform. You cannot opt out of these while using CrowdLoops.</p>
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Cookie</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Provider</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Purpose</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>__session, __client_uat</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Clerk</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Keeps you signed in and manages your authentication session</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Session / 1 year</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>admin_token</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>CrowdLoops</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Stores a signed admin authentication token for platform administrators</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: 24, marginBottom: 12 }}><strong>Analytics Cookies</strong></p>
            <p>We use Vercel Analytics and Vercel Speed Insights to understand how visitors use the platform and to identify performance issues. These tools collect aggregated, non-identifying data and do not build personal profiles.</p>
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Cookie</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Provider</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Purpose</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>va, vai</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Vercel Analytics</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Aggregated page view tracking — no personal profile built</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Session</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>vsi</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Vercel Speed Insights</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Real user performance metrics (Core Web Vitals) per page</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>3. What We Do Not Use</h2>
            <p>CrowdLoops does not use:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Advertising or retargeting cookies</li>
              <li>Social media tracking pixels</li>
              <li>Third-party behavioural profiling tools</li>
              <li>Google Analytics or similar broad tracking platforms</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>4. How to Control Cookies</h2>
            <p>You can control and delete cookies through your browser settings. Most browsers allow you to:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>See which cookies are set and delete them individually</li>
              <li>Block all cookies or block cookies from specific sites</li>
              <li>Set your browser to notify you when a cookie is set</li>
            </ul>
            <p>Please note that blocking strictly necessary cookies (such as session cookies) will prevent you from signing in, voting, or submitting entries on the platform.</p>
            <p>For guidance on managing cookies in your browser:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
              <li>Firefox: Settings → Privacy &amp; Security → Cookies and Site Data</li>
              <li>Safari: Preferences → Privacy → Manage Website Data</li>
              <li>Edge: Settings → Cookies and site permissions</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>5. Changes to This Policy</h2>
            <p>We may update this Cookie Policy if we add new functionality or third-party services. We will post any changes on this page with a revised "Last updated" date.</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>6. Contact</h2>
            <p>For any questions about cookies or how we use them:</p>
            <p style={{ marginTop: 8 }}>
              <strong>contact@crowdloops.com</strong>
            </p>
          </section>

          <div style={{ marginTop: 40, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 12, color: '#888' }}>
            <Link href="/privacy" style={{ fontWeight: 700, color: '#555', textDecoration: 'underline' }}>Privacy policy →</Link>
            {' · '}
            <Link href="/legal" style={{ fontWeight: 700, color: '#555', textDecoration: 'underline' }}>Platform rules →</Link>
          </div>

        </div>
      </div>
    </main>
  )
}
