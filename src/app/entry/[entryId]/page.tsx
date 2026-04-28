import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { getQuestions, type Question } from '@/lib/questions'
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

  let questions: Question[] = []
  const loop = await prisma.loop.findUnique({ where: { slug: entry.competition } }).catch(() => null)
  if (loop) {
    try { questions = JSON.parse(loop.questions) } catch {}
  }
  if (questions.length === 0) questions = getQuestions(entry.competition)

  const backHref = loop ? `/loops/${entry.competition}` : `/${entry.competition}`

  return (
    <main className="page">
      <Link className="top-link" href={backHref}>← Back to competition</Link>

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
              competition={entry.competition}
              questions={questions}
            />
          </div>
        </article>
      </section>

      <section className="entry-story">
        <div className="story-title">Why this design?</div>
        <div className="story-text">{entry.hook}</div>
      </section>

      <div className="mini-links">
        <Link href={backHref}>View leaderboard</Link>
        <Link href="/help">FAQs & Rules</Link>
      </div>
    </main>
  )
}
