import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { buildRulesVars, statusLabel } from '@/lib/rulesTemplate'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const loop = await prisma.loop.findUnique({ where: { slug } })
  if (!loop) return { title: 'Rules — CrowdLoops' }
  return { title: `Competition Rules — ${loop.brandName} — CrowdLoops` }
}

const h2Style = {
  fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8,
} as const
const sectionStyle = { marginTop: 32 } as const

export default async function RulesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const loop = await prisma.loop.findUnique({ where: { slug } })
  if (!loop) notFound()

  const v = buildRulesVars(loop as Record<string, unknown>)
  const { label: statusText, colour: statusColour } = statusLabel(v.status)

  return (
    <main className="page">
      <div className="portal" style={{ maxWidth: 720 }}>
        <header className="portal-header">
          <div className="brand">{v.brandName}</div>
          <div className="phase">Competition Rules &amp; Privacy Notice</div>
        </header>

        <div style={{ padding: '0 20px 40px' }}>

          {/* Status banner */}
          <div style={{
            marginTop: 24,
            padding: '10px 14px',
            background: v.isDemo ? '#fff8f0' : '#f0fff0',
            border: `1px solid ${statusColour}22`,
            borderRadius: 6,
            fontSize: 13,
          }}>
            <strong style={{ color: statusColour }}>Status: {statusText}</strong>
            {v.isDemo && (
              <span style={{ color: '#888', marginLeft: 8 }}>
                — Rules are illustrative. No binding obligations apply until a live event is launched.
              </span>
            )}
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: '#aaa' }}>
            Last updated: 20/05/2026
          </div>

          {/* 1. Competition Details */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>1. Competition Details</h2>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Competition', v.competitionName],
                  ['Organiser', 'CrowdLoops'],
                  ['Brand', v.brandName],
                  ...(v.retailPartner ? [['Retail Partner', v.retailPartner]] : []),
                  ['Market', v.country],
                  ['Entries open', v.startDate],
                  ['Entries close', v.endDate],
                  ['Status', statusText],
                ].map(([k, val]) => (
                  <tr key={k} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '7px 0', fontWeight: 700, width: '38%', color: '#555' }}>{k}</td>
                    <td style={{ padding: '7px 0' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 2. Eligibility */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>2. Eligibility</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Open to residents of <strong>{v.country}</strong> aged <strong>{v.eligibilityAge} or over</strong>.</li>
              <li>Participants aged 16–17 may enter with verifiable parental or guardian consent.</li>
              <li>Employees and contractors of CrowdLoops, {v.sponsorLegalName}{v.retailPartner ? `, and ${v.retailPartner}` : ''}, and their immediate families, are not eligible to win prizes.</li>
              <li>One entry per person. Duplicate or bulk submissions will be disqualified.</li>
              <li>Eligibility is verified before any prize is awarded. CrowdLoops and {v.sponsorLegalName} reserve the right to disqualify entries that cannot be verified.</li>
            </ul>
          </section>

          {/* 3. How to Enter */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>3. How to Enter</h2>
            {v.brief && (
              <p style={{ marginBottom: 16, lineHeight: 1.65 }}>{v.brief}</p>
            )}
            <p>To enter, submit your design through the competition page before the closing date. Your submission must:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Be uploaded as a JPG, PNG, or PDF file.</li>
              <li>Be your own original creative work.</li>
              <li>Include a short description of your concept or inspiration.</li>
              <li>Not infringe any copyright, trademark, or third-party intellectual property right.</li>
            </ul>
            {v.guidelines.length > 0 && (
              <>
                <p style={{ marginTop: 16 }}><strong>Additional submission requirements:</strong></p>
                <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
                  {v.guidelines.map((g, i) => <li key={i}>{g}</li>)}
                </ol>
              </>
            )}
            <p style={{ marginTop: 16 }}><strong>AI-generated artwork</strong> is permitted unless otherwise stated. If you use AI tools, you must hold all rights to the final submitted image, and the output must not reproduce copyrighted works, real people, or trademarked characters. You are responsible for the content you submit.</p>
            <p style={{ marginTop: 12 }}>Entries submitted after the closing date will not be considered.</p>
          </section>

          {/* 4. Voting */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>4. Voting</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Voting is open to the public during the designated voting window.</li>
              <li>Each verified user may cast one vote per entry. Signing in is required to vote.</li>
              <li>Voting in bulk, using automated tools, purchasing votes, or organising coordinated inauthentic voting is prohibited and will result in disqualification of the relevant entry.</li>
              <li>CrowdLoops uses layered signals — including login controls, device signals, rate limits, and pattern detection — to identify suspicious activity.</li>
              <li>Suspicious or duplicate votes are flagged for review and may be excluded from the final count. Flagged votes do not count toward winner selection.</li>
              <li>Vote counts shown on the platform reflect verified votes only.</li>
            </ul>
          </section>

          {/* 5. Winner Selection */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>5. Winner Selection</h2>
            <p>The winner is not selected by chance. Selection is based on a combination of:</p>
            <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Verified public votes</strong> — to determine the community shortlist.</li>
              <li><strong>Eligibility verification</strong> — age, residency, and original work confirmed.</li>
              <li><strong>Brand and creative review</strong> — by {v.sponsorLegalName}, assessed against the competition brief.</li>
              <li><strong>Technical and commercial feasibility</strong> — assessment for production viability.</li>
            </ol>
            <p style={{ marginTop: 12 }}>CrowdLoops and {v.sponsorLegalName} reserve the right to withhold a prize if no entry meets the required standard, or to select an alternative winner if the top-voted entry is disqualified.</p>
            <p style={{ marginTop: 12 }}>The decision of {v.sponsorLegalName} and CrowdLoops is final. No correspondence will be entered into regarding the outcome.</p>
          </section>

          {/* 6. Prize */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>6. Prize</h2>
            {v.prizes.length === 0 && (
              <p>Prize details will be published when this competition goes live.</p>
            )}
            {v.prizes.map((p, i) => (
              <div key={i} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: '3px solid #eee' }}>
                <div style={{ fontWeight: 900, fontSize: 15 }}>{p.badge}</div>
                {p.cash && <div style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '4px 0' }}>{p.cash}</div>}
                {p.description && <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{p.description}</div>}
              </div>
            ))}
            <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.65 }}>
              {v.isDemo
                ? 'Prize details shown above are illustrative only and create no obligation.'
                : `Prizes are awarded as described above. If a stated prize cannot be fulfilled due to circumstances outside CrowdLoops' or ${v.sponsorLegalName}'s reasonable control, a reasonable alternative of equivalent value may be offered.`}
            </p>
            {v.grandPrizeCash && !v.isDemo && (
              <p style={{ marginTop: 8, fontSize: 13, color: '#666', lineHeight: 1.65 }}>
                Where "winning design goes into production" is stated, this means the winning design <strong>may be developed for production</strong> subject to technical, legal, safety, and commercial review. Production is not guaranteed.
              </p>
            )}
          </section>

          {/* 7. IP Rights */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>7. Intellectual Property</h2>
            <p><strong>You retain ownership of your design.</strong> By submitting an entry, you confirm that:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>The work is your own original creation.</li>
              <li>You hold all necessary intellectual property rights, including rights to any AI-generated content, photographs, or third-party elements incorporated.</li>
              <li>The submission does not infringe any copyright, trademark, personality right, or other third-party right.</li>
            </ul>
            <p style={{ marginTop: 12 }}><strong>Display licence:</strong> By entering, you grant CrowdLoops and {v.sponsorLegalName} a non-exclusive, royalty-free licence to display, reproduce, and promote your entry for the duration of the competition and in post-competition communications.</p>
            <p style={{ marginTop: 12 }}><strong>Production licence (selected entries only):</strong> For shortlisted or winning entries, and subject to a separate written agreement, you may be asked to grant an additional licence for {v.sponsorLegalName} to develop and produce your design commercially. Full IP assignment or licence terms will be set out in that agreement. No rights beyond the display licence above are transferred automatically on submission.</p>
          </section>

          {/* 8. Privacy Notice */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>8. Privacy Notice</h2>
            <p>CrowdLoops collects and processes the following personal data in connection with this competition:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Name and contact email</strong> — to administer your entry, verify eligibility, and contact you if you are shortlisted or win.</li>
              <li><strong>Your design submission and description</strong> — to display on the platform and for pre-publication moderation.</li>
              <li><strong>Authenticated user ID</strong> — to enforce the one-vote-per-person rule.</li>
              <li><strong>Vote data</strong> — to count votes and detect fraud.</li>
              <li><strong>Device and session signals</strong> — used for vote integrity; this constitutes personal data and is handled accordingly.</li>
            </ul>
            <p style={{ marginTop: 12 }}><strong>Legal basis:</strong> Contract performance (administering your entry) and legitimate interests (platform security and fraud prevention).</p>
            <p style={{ marginTop: 12 }}><strong>Data sharing:</strong> Your entry data (name, design, and description) will be visible to the public on the competition page. Your contact details will be shared with {v.sponsorLegalName} only if your entry is shortlisted or wins.</p>
            <p style={{ marginTop: 12 }}><strong>Retention:</strong> Entry and vote data is retained for the duration of the competition plus 12 months, unless you request deletion earlier.</p>
            <p style={{ marginTop: 12 }}><strong>Your rights:</strong> You have the right to access, correct, delete, restrict, or port your data, and to object to processing. Contact us at <a href="mailto:contact@crowdloops.com" style={{ fontWeight: 700 }}>contact@crowdloops.com</a> to exercise these rights.</p>
            <p style={{ marginTop: 12 }}>For the full CrowdLoops Privacy Policy, see <Link href="/privacy" style={{ fontWeight: 700, textDecoration: 'underline' }}>/privacy</Link>.</p>
          </section>

          {/* 9. Disqualification */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>9. Disqualification</h2>
            <p>CrowdLoops and {v.sponsorLegalName} reserve the right to disqualify any entry or voter that:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Submits work that is not their own original creation or infringes third-party rights.</li>
              <li>Includes offensive, hateful, discriminatory, violent, or adult content.</li>
              <li>Features real people without consent, including celebrities or public figures.</li>
              <li>Attempts to manipulate the vote through fake accounts, automated tools, purchased votes, or coordinated inauthentic behaviour.</li>
              <li>Provides false information about eligibility or identity.</li>
              <li>Violates these rules or the platform&apos;s general terms in any other way.</li>
            </ul>
            <p style={{ marginTop: 12 }}>Disqualified entries are removed from the public platform. Disqualified voters&apos; votes are excluded from all counts.</p>
          </section>

          {/* 10. Contact */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>10. Contact</h2>
            <p>For questions about these rules, moderation appeals, data rights requests, or prize queries:</p>
            <p style={{ marginTop: 8 }}>
              <strong>contact@crowdloops.com</strong>
            </p>
          </section>

          <div style={{ marginTop: 40, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 12, color: '#888' }}>
            Last updated: 20/05/2026. These rules apply to this specific competition.{' '}
            <Link href="/legal" style={{ fontWeight: 700, color: '#555', textDecoration: 'underline' }}>Platform terms →</Link>
            {' · '}
            <Link href="/privacy" style={{ fontWeight: 700, color: '#555', textDecoration: 'underline' }}>Privacy policy →</Link>
            {' · '}
            <Link href="/cookies" style={{ fontWeight: 700, color: '#555', textDecoration: 'underline' }}>Cookie policy →</Link>
          </div>

        </div>
      </div>
    </main>
  )
}
