import Link from 'next/link'

export default function LegalPage() {
  return (
    <main className="page">
      <div className="portal" style={{ maxWidth: 720 }}>
        <header className="portal-header">
          <div className="brand">CrowdLoops</div>
          <div className="phase">Legal &amp; Platform Rules</div>
        </header>

        <div className="prompt-box" style={{ marginTop: 0 }}>
          <p style={{ color: '#c00', fontWeight: 700, marginBottom: 0 }}>
            ⚠️ DEMO PLATFORM - These terms are illustrative only and do not constitute legally binding rules for any active competition. A qualified legal professional should draft final terms before any live event is launched.
          </p>
        </div>

        <div style={{ padding: '0 20px 40px' }}>

          {/* 1 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>1. Official Rules</h2>
            <p>Each CrowdLoops event is governed by event-specific Official Rules published at launch. By entering, participants confirm they have read and accept those rules. The rules cover eligibility, entry requirements, submission deadlines, voting mechanics, winner selection criteria, prize details, and the promoter's right to cancel or amend the event.</p>
            <p>Where no event-specific rules are published, these platform terms apply as a baseline.</p>
          </section>

          {/* 2 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>2. Age &amp; Eligibility</h2>
            <p>Participants must be 18 or over, or have verifiable parental or guardian consent if aged 16–17. Events may set higher age thresholds. Employees and contractors of CrowdLoops, the brand partner, and their immediate families are not eligible to win prizes.</p>
            <p>Eligibility is verified before any prize is awarded. CrowdLoops reserves the right to disqualify entries that cannot be verified.</p>
          </section>

          {/* 3 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>3. Entrant IP &amp; Licence Terms</h2>
            <p>By submitting an entry, you confirm that:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>The work is your own original creation.</li>
              <li>You hold all necessary intellectual property rights to it, including rights to any AI-generated content, photographs, or third-party elements incorporated.</li>
              <li>The submission does not infringe any copyright, trademark, personality right, or other third-party right.</li>
            </ul>
            <p>You grant CrowdLoops and the relevant brand partner a non-exclusive, royalty-free licence to display, reproduce, and promote your entry for the duration of the event and in post-event communications.</p>
            <p>For selected or winning entries only, and subject to the event's Official Rules, you grant an additional licence for the brand partner to develop and produce the design commercially. Full IP assignment terms, if required, will be set out in the event-specific rules and any separate agreement. No rights are transferred automatically on submission.</p>
          </section>

          {/* 4 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>4. Winner Selection</h2>
            <p>The winner is not selected by chance. Selection is based on a combination of:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Public votes collected during the voting window.</li>
              <li>Eligibility verification (age, residency, original work).</li>
              <li>Brand and creative review against the event brief.</li>
              <li>Compliance with these rules and event-specific Official Rules.</li>
              <li>Technical and commercial feasibility assessment for production.</li>
            </ul>
            <p>CrowdLoops and the brand partner reserve the right to withhold a prize if no entry meets the required standard, or to select an alternative winner if the top-voted entry is disqualified.</p>
          </section>

          {/* 5 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>5. Voting &amp; Anti-Fraud Rules</h2>
            <p>One account may cast one vote per entry. Voting in bulk, using automated tools, purchasing votes, or coordinating mass voting through bots or fake accounts is prohibited and will result in disqualification of the relevant entry.</p>
            <p>CrowdLoops uses layered signals - including login controls, device signals, rate limits, and pattern detection - to identify suspicious activity. Suspicious votes are flagged for review and may be excluded from winner selection where appropriate. No specific detection rate is guaranteed.</p>
          </section>

          {/* 6 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>6. Content Moderation Policy</h2>
            <p>All submissions are reviewed by CrowdLoops moderators before going live. We reserve the right to reject, remove, or hide any entry that:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Is offensive, hateful, discriminatory, or violent.</li>
              <li>Contains sexual or adult content.</li>
              <li>Infringes any third-party intellectual property right.</li>
              <li>Features real people without consent, including celebrities.</li>
              <li>Contains malicious code, illegal content, or misinformation.</li>
              <li>Falls outside the event brief or technical requirements.</li>
            </ul>
            <p>Entrants may appeal a moderation decision by contacting us at the address below. We aim to respond within 5 working days.</p>
          </section>

          {/* 7 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>7. AI-Generated Content</h2>
            <p>AI-generated artwork is permitted in all CrowdLoops events unless an event's Official Rules state otherwise. Entrants who use AI tools must:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li>Hold all rights to the final submitted image (check the terms of your AI tool).</li>
              <li>Ensure the output does not reproduce copyrighted works, recognisable real people, or trademarked characters.</li>
              <li>Be the human creator directing the work - you are responsible for its content.</li>
            </ul>
            <p>CrowdLoops does not accept liability for third-party IP claims arising from AI-generated submissions.</p>
          </section>

          {/* 8 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>8. Prizes &amp; Production</h2>
            <p>Prizes are described in each event's Official Rules. Where this demo platform shows example prizes, those are illustrative only and create no obligation.</p>
            <p>For live events: prizes will be awarded as described in the Official Rules. If a stated prize cannot be fulfilled due to circumstances outside CrowdLoops' or the brand partner's reasonable control, a reasonable alternative of equivalent value may be offered.</p>
            <p>"Winning design goes into production" means the winning design <strong>may be developed for production</strong> subject to technical, legal, safety, and commercial review. CrowdLoops makes no guarantee of production timelines or retail availability.</p>
          </section>

          {/* 9 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>9. Privacy Policy</h2>
            <p>CrowdLoops collects the following personal data when you enter a competition:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Name and contact details</strong> - to administer your entry and contact you if you win.</li>
              <li><strong>Design submission and description</strong> - to display on the platform and for moderation.</li>
              <li><strong>Vote data</strong> - to count votes and detect fraud.</li>
              <li><strong>Device and session signals</strong> - used for vote integrity; this is personal data and is handled accordingly.</li>
            </ul>
            <p><strong>Legal basis:</strong> Contract performance (administering your entry) and legitimate interests (platform security and fraud prevention).</p>
            <p><strong>Retention:</strong> Entry data is retained for the duration of the event plus 12 months, unless you request deletion earlier or we are required to retain it by law.</p>
            <p><strong>Your rights (GDPR):</strong> You have the right to access, correct, delete, restrict, or port your data, and to object to processing. To exercise these rights, contact us at the address below.</p>
            <p><strong>Data processors:</strong> We use third-party services including Vercel (hosting), Turso (database), and Vercel Blob (image storage). These processors are bound by data processing agreements.</p>
            <p><strong>Marketing:</strong> We will not use your contact details for marketing without separate, explicit consent.</p>
            <p><strong>Children:</strong> We do not knowingly collect data from persons under 16 without parental consent.</p>
          </section>

          {/* 10 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>10. Retail Partner &amp; Demo Disclaimer</h2>
            <p>Any retailer names, logos, or branding shown on this platform are either confirmed partners under a signed agreement, or are shown as illustrative examples for demo purposes only. Where a retail partner is shown as "TBA" or labelled "Example," no partnership exists and no implication of endorsement should be inferred.</p>
            <p>CrowdLoops will update event pages when partnerships are confirmed and signed.</p>
          </section>

          {/* 11 */}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, borderBottom: '2px solid #eee', paddingBottom: 8 }}>11. Contact</h2>
            <p>For questions about these terms, moderation appeals, prize queries, or data rights requests:</p>
            <p><Link href="/contact" style={{ fontWeight: 700, textDecoration: 'underline' }}>Contact CrowdLoops →</Link></p>
          </section>

          <div style={{ marginTop: 40, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 12, color: '#888' }}>
            Last updated: April 2026. These terms are subject to change. Event-specific Official Rules take precedence over these general platform terms.
          </div>

        </div>
      </div>
    </main>
  )
}
