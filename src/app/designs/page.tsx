import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

const SORTS = { hot: 'voteCount', new: 'createdAt', top: 'voteCount' } as const

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; q?: string }>
}) {
  const { sort = 'hot', q = '' } = await searchParams

  const orderBy = sort === 'new' ? { createdAt: 'desc' as const } : { voteCount: 'desc' as const }

  const entries = await prisma.entry.findMany({
    where: {
      status: 'approved',
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
          <article key={entry.id} className="entry-card">
            <div className="entry-image">
              <span className="entry-id-badge">ID: {entry.entryId}</span>
              {entry.imageUrl
                ? <img src={entry.imageUrl} alt={entry.setName} />
                : <span>{entry.setName}</span>}
            </div>
            <div className="entry-body">
              <div className="designer-row">
                <div className="designer-name">{entry.designerName}</div>
                <div className="vote-count">{entry.voteCount.toLocaleString()} Votes</div>
              </div>
              <div className="action-row">
                <Link
                  href={`/entry/${entry.entryId}`}
                  className="vote-button"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none', lineHeight: '26px' }}
                >
                  VOTE
                </Link>
                <Link
                  href={`/entry/${entry.entryId}`}
                  className="share-button"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  aria-label="Share entry"
                >
                  ✈
                </Link>
              </div>
            </div>
          </article>
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
