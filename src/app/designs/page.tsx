import Link from 'next/link'
import { prisma } from '@/lib/db'
import VoteCard from '@/components/VoteCard'
import { getQuestions, type Question } from '@/lib/questions'

export const dynamic = 'force-dynamic'

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; q?: string; competition?: string }>
}) {
  const { sort = 'top', q = '', competition = '' } = await searchParams

  const orderBy = sort === 'new' ? { createdAt: 'desc' as const } : { voteCount: 'desc' as const }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const baseWhere = {
    status: 'approved',
    ...(competition ? { competition } : {}),
    ...(q ? {
      OR: [
        { designerName: { contains: q } },
        { entryId: { contains: q.toUpperCase() } },
        { setName: { contains: q } },
      ]
    } : {}),
  }

  const [entries, brandRows, loopRows] = await Promise.all([
    prisma.entry.findMany({
      where: sort === 'hot'
        ? { ...baseWhere, createdAt: { gte: sevenDaysAgo } }
        : baseWhere,
      orderBy,
    }),
    prisma.entry.findMany({
      where: { status: 'approved' },
      distinct: ['competition'],
      select: { competition: true },
      orderBy: { competition: 'asc' },
    }),
    prisma.loop.findMany({ select: { slug: true, questions: true } }),
  ])

  const brands = brandRows.map(r => r.competition)

  const loopQuestionsMap: Record<string, Question[]> = {}
  for (const l of loopRows) {
    try {
      const qs = JSON.parse(l.questions) as Question[]
      if (Array.isArray(qs) && qs.length > 0) loopQuestionsMap[l.slug] = qs
    } catch {}
  }

  return (
    <main className="page">
      <div style={{ padding: '12px 16px 0' }}>
        <Link className="top-link" href={competition ? `/${competition}` : '/'}>← {competition ? 'Back' : 'Home'}</Link>
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
          {competition && <input type="hidden" name="competition" value={competition} />}
          <div className="sort-row">
            <button className={`sort-button${sort === 'top' ? ' active' : ''}`} type="submit" name="sort" value="top">Top</button>
            <button className={`sort-button${sort === 'hot' ? ' active' : ''}`} type="submit" name="sort" value="hot">Hot (7d)</button>
            <button className={`sort-button${sort === 'new' ? ' active' : ''}`} type="submit" name="sort" value="new">New</button>
          </div>
        </form>
      </header>

      {/* Brand tabs — only on the unfiltered /designs page, not when scoped to a competition */}
      {!competition && brands.length > 1 && (
        <div className="intel-tabs" style={{ margin: '0 0 4px', padding: '0 0 2px' }}>
          <Link href="/designs" className="intel-tab active">All</Link>
          {brands.map(b => (
            <Link
              key={b}
              href={`/designs?competition=${encodeURIComponent(b)}`}
              className="intel-tab"
            >
              {b}
            </Link>
          ))}
        </div>
      )}

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
            competition={entry.competition}
            questions={loopQuestionsMap[entry.competition] ?? getQuestions(entry.competition)}
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
