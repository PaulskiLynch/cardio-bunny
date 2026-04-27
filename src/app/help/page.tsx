import Link from 'next/link'

export default function HelpPage() {
  return (
    <main className="page">
      <Link className="top-link" href="/">← Back</Link>

      <section className="feed-title">
        <h1>FAQs & Rules</h1>
        <div className="subtitle">Everything you need to know about the competition.</div>
      </section>

      <section className="section">
        <h2>Entering</h2>
        <div className="faq-list">
          <details open>
            <summary>Who can enter?</summary>
            <p>Anyone can enter. No fashion experience is needed. All ages and backgrounds welcome.</p>
          </details>
          <details>
            <summary>What can I submit?</summary>
            <p>A Top and Legging set idea. AI images, sketches, or photos of physical designs are all accepted.</p>
          </details>
          <details>
            <summary>Is there a fee to enter?</summary>
            <p>No. Entry is completely free.</p>
          </details>
          <details>
            <summary>Can I submit more than one design?</summary>
            <p>Each person can submit one entry per competition round.</p>
          </details>
        </div>
      </section>

      <section className="section">
        <h2>Moderation & Voting</h2>
        <div className="faq-list">
          <details>
            <summary>Will my image go live straight away?</summary>
            <p>No. All uploaded images are checked by moderators before they appear publicly. This usually takes 24–48 hours.</p>
          </details>
          <details>
            <summary>How does voting work?</summary>
            <p>Once approved, your entry gets an official link. Share that link and ask the community to vote for you. Each person can vote once per entry.</p>
          </details>
          <details>
            <summary>Can I share my entry before it's approved?</summary>
            <p>You can share your Entry ID, but the voting link will only work once the entry is approved by moderators.</p>
          </details>
        </div>
      </section>

      <section className="section">
        <h2>Winning</h2>
        <div className="faq-list">
          <details>
            <summary>How is the winner selected?</summary>
            <p>Winners are selected based on community votes, design quality, and a final review by the Cardio Bunny team.</p>
          </details>
          <details>
            <summary>What do I win?</summary>
            <p>Your design can be selected, produced, and sold by Cardio Bunny. You can earn a percentage of profits from pieces sold, and gain recognition across the community.</p>
          </details>
        </div>
      </section>

      <section className="section">
        <h2>Basic Rules</h2>
        <div className="faq-list">
          <details open>
            <summary>What are the rules?</summary>
            <ul>
              <li>Submit your own original idea.</li>
              <li>Keep it respectful and appropriate.</li>
              <li>The design must show a Top and Legging set.</li>
              <li>One entry per person per round.</li>
              <li>Winners are selected based on votes, quality, and final review.</li>
            </ul>
          </details>
        </div>
      </section>

      <div className="mini-links">
        <Link href="/">Home</Link>
        <Link href="/submit">Enter Now</Link>
        <Link href="/designs">See All Designs</Link>
      </div>
    </main>
  )
}
