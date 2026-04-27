import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import VoteClient from './VoteClient'

export const dynamic = 'force-dynamic'

export default async function EntryPage({
  params,
}: {
  params: Promise<{ entryId: string }>
}) {
  const { entryId } = await params
  const entry = await prisma.entry.findFirst({
    where: { entryId, status: 'approved' },
  })

  if (!entry) notFound()

  return (
    <main className="page">
      <Link className="top-link" href="/designs">← Back to all designs</Link>

      <section className="feed-title">
        <h1>Vote for {entry.designerName}.</h1>
        <div className="subtitle">Help this design climb the leaderboard. One tap counts your vote.</div>
      </section>

      <section className="design-grid">
        <article className="entry-card featured">
          <div className="entry-image">
            <span className="entry-id-badge">ID: {entry.entryId}</span>
            {entry.imageUrl
              ? <img src={entry.imageUrl} alt={entry.setName} />
              : <span>{entry.setName}</span>}
          </div>
          <div className="entry-body">
            <div className="designer-row">
              <div className="designer-name">{entry.designerName}</div>
            </div>
            <VoteClient
              entryId={entry.entryId}
              designerName={entry.designerName}
              initialVotes={entry.voteCount}
            />
          </div>
        </article>
      </section>

      <section className="entry-story">
        <div className="story-title">Why this design?</div>
        <div className="story-text">{entry.hook}</div>
      </section>

      <div className="mini-links">
        <Link href="/designs">View leaderboard</Link>
        <Link href="/help">FAQs & Rules</Link>
      </div>
    </main>
  )
}
