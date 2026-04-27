import Link from 'next/link'
import { prisma } from '@/lib/db'
import VoteCard from '@/components/VoteCard'

export const dynamic = 'force-dynamic'

const SORTS = { hot: 'voteCount', new: 'createdAt', top: 'voteCount' } as const

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; q?: string; competition?: string }>
}) {
  const { sort = 'hot', q = '', competition = '' } = await searchParams

  const orderBy = sort === 'new' ? { createdAt: 'desc' as const } : { voteCount: 'desc' as const }

  const entries = await prisma.entry.findMany({
    where: {
      status: 'approved',
      ...(competition ? { competition } : {}),
      ...(q ? {
        OR: [
          { designerName: { contains: q } },
          { entryId: { contains: q.toUpperCase() } },
          { setName: { contains: q } },
        ]
      } : {}),
    },
    orderBy,
  })

  return (
    <main className="page">
      <div style={{ padding: '12px 16px 0' }}>
        <Link className="top-link" href="/">← Home</Link>
      </div>

      <header className="search-header">
        <form method="GET">
          <input
            className="search-input"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search Designer Name or Entry ID"
          />
          <div className="sort-row">
            <button
              className={`sort-button${sort === 'hot' ? ' active' : ''}`}
              type="submit"
              name="sort"
              value="hot"
            >Hot</button>
            <button
              className={`sort-button${sort === 'top' ? ' active' : ''}`}
              type="submit"
              name="sort"
              value="top"
            >Top</button>
            <button
              className={`sort-button${sort === 'new' ? ' active' : ''}`}
              type="submit"
              name="sort"
              value="new"
            >New</button>
          </div>
        </form>
      </header>

      <section className="feed-title">
        <h1>Vote for the next drop.</h1>
        <div className="subtitle">Tap vote, then share the entry to help your favourite designer climb the leaderboard.</div>
      </section>

      <section className="design-grid">
        {entries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#777', fontWeight: 700 }}>
            {q ? 'No entries match your search.' : 'No approved entries yet. Check back soon!'}
          </div>
        )}
        {entries.map(entry => (
          <VoteCard
            key={entry.id}
            entryId={entry.entryId}
            setName={entry.setName}
            designerName={entry.designerName}
            imageUrl={entry.imageUrl}
            initialVotes={entry.voteCount}
          />
        ))}
      </section>

      <div className="mini-links">
        <Link href="/">Home</Link>
        <Link href="/help">FAQs & Rules</Link>
        <Link href="/submit">Enter Now</Link>
      </div>
    </main>
  )
}
