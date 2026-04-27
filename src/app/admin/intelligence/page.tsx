import { cookies } from 'next/headers'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { getQuestions } from '@/lib/questions'
import { LoginForm } from '../AdminClient'

export const dynamic = 'force-dynamic'

const COMPETITIONS = [
  { id: 'biedronka', label: 'Cardio Bunny Poland 🇵🇱' },
  { id: 'uk',        label: 'Cardio Bunny UK 🇬🇧' },
  { id: 'turkiye',   label: 'Cardio Bunny Türkiye 🇹🇷' },
  { id: 'swomp',     label: 'SWOMP WATER+' },
  { id: 'konkerz',   label: 'Konkerz' },
]

function pct(n: number, total: number) {
  if (!total) return 0
  return Math.round((n / total) * 100)
}

export default async function IntelligencePage({
  searchParams,
}: {
  searchParams: Promise<{ competition?: string }>
}) {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')?.value
  if (auth !== process.env.ADMIN_PASSWORD) {
    return <main className="page"><LoginForm /></main>
  }

  const { competition = 'biedronka' } = await searchParams
  const questions = getQuestions(competition)

  const responses = await prisma.feedbackResponse.findMany({
    where: { competition },
    select: { questionId: true, answer: true, entryId: true },
  })

  // Group: questionId → answer → count
  const grouped: Record<string, Record<string, number>> = {}
  for (const r of responses) {
    if (!grouped[r.questionId]) grouped[r.questionId] = {}
    grouped[r.questionId][r.answer] = (grouped[r.questionId][r.answer] || 0) + 1
  }

  const firstQId = questions[0]?.id
  const totalRespondents = firstQId
    ? Object.values(grouped[firstQId] ?? {}).reduce((a, b) => a + b, 0)
    : 0

  return (
    <main className="page">
      <section className="feed-title">
        <h1>Loop Intelligence</h1>
        <div className="subtitle">
          Aggregated voter feedback by competition
        </div>
      </section>

      <div style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
        <Link href="/admin" style={{ fontWeight: 900, fontSize: 14, textDecoration: 'underline' }}>
          ← Moderation
        </Link>
      </div>

      {/* Competition tabs */}
      <div className="intel-tabs">
        {COMPETITIONS.map(c => (
          <Link
            key={c.id}
            href={`/admin/intelligence?competition=${c.id}`}
            className={`intel-tab${competition === c.id ? ' active' : ''}`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {questions.length === 0 ? (
        <div style={{ color: '#777', fontWeight: 700, padding: '40px 0' }}>
          No questions configured for this competition.
        </div>
      ) : responses.length === 0 ? (
        <div style={{ color: '#777', fontWeight: 700, padding: '40px 0' }}>
          No feedback collected yet. Responses will appear here after voters answer questions.
        </div>
      ) : (
        <>
          <div className="intel-total">{totalRespondents} respondents</div>

          {questions.map(q => {
            const qData = grouped[q.id] ?? {}
            const qTotal = Object.values(qData).reduce((a, b) => a + b, 0)

            return (
              <div key={q.id} className="intel-section">
                <div className="intel-q-text">{q.text}</div>
                <div className="intel-q-meta">{qTotal} responses</div>

                {(q.type === 'yes_no' || q.type === 'choice') && (
                  <div className="intel-bars">
                    {(q.type === 'yes_no' ? ['YES', 'NO'] : (q.options ?? [])).map(opt => {
                      const count = qData[opt] ?? 0
                      const p = pct(count, qTotal)
                      return (
                        <div key={opt} className="intel-bar-row">
                          <div className="intel-bar-label">{opt}</div>
                          <div className="intel-bar-track">
                            <div className="intel-bar-fill" style={{ width: `${p}%` }} />
                          </div>
                          <div className="intel-bar-pct">{p}%</div>
                          <div className="intel-bar-count">({count})</div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {q.type === 'text' && (
                  <ul className="intel-responses">
                    {Object.entries(qData).slice(0, 20).map(([answer], i) => (
                      <li key={i} className="intel-response-item">&ldquo;{answer}&rdquo;</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </>
      )}
    </main>
  )
}
