'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getQuestions, type Question } from '@/lib/questions'

interface Props {
  entryId: string
  setName: string
  designerName: string
  imageUrl: string | null
  initialVotes: number
  competition: string
}

type Phase = 'idle' | 'feedback' | 'done'

export default function VoteCard({ entryId, setName, designerName, imageUrl, initialVotes, competition }: Props) {
  const [votes, setVotes]       = useState(initialVotes)
  const [voted, setVoted]       = useState(false)
  const [loading, setLoading]   = useState(false)
  const [phase, setPhase]       = useState<Phase>('idle')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers]   = useState<Record<string, string>>({})
  const [textDraft, setTextDraft] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const storageKey    = `voted_${entryId}`
  const feedbackKey   = `feedback_${entryId}`
  const questions     = getQuestions(competition)

  useEffect(() => {
    if (localStorage.getItem(storageKey)) setVoted(true)
  }, [storageKey])

  async function handleVote(e: React.MouseEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    if (voted) {
      const res = await fetch(`/api/vote/${entryId}`, { method: 'DELETE' })
      if (res.ok) {
        const json = await res.json()
        setVotes(json.voteCount)
        setVoted(false)
        localStorage.removeItem(storageKey)
      }
    } else {
      const res = await fetch(`/api/vote/${entryId}`, { method: 'POST' })
      if (res.ok) {
        const json = await res.json()
        setVotes(json.voteCount)
        setVoted(true)
        localStorage.setItem(storageKey, '1')
        if (questions.length > 0 && !localStorage.getItem(feedbackKey)) {
          setPhase('feedback')
          setCurrentQ(0)
          setAnswers({})
          setTextDraft('')
        }
      }
    }
    setLoading(false)
  }

  function selectAnswer(answer: string) {
    setAnswers(prev => ({ ...prev, [questions[currentQ].id]: answer }))
  }

  function advance() {
    const q = questions[currentQ]
    let final = answers
    if (q.type === 'text' && textDraft.trim()) {
      final = { ...answers, [q.id]: textDraft.trim() }
      setAnswers(final)
    }
    setTextDraft('')
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1)
    } else {
      submitFeedback(final)
    }
  }

  function skipQ() {
    setTextDraft('')
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1)
    } else {
      submitFeedback(answers)
    }
  }

  function closeModal() {
    const q = questions[currentQ]
    let final = answers
    if (q?.type === 'text' && textDraft.trim()) {
      final = { ...answers, [q.id]: textDraft.trim() }
    }
    if (Object.keys(final).length > 0) {
      submitFeedback(final)
    } else {
      localStorage.setItem(feedbackKey, '1')
      setPhase('idle')
    }
  }

  async function submitFeedback(final: Record<string, string>) {
    setSubmitting(true)
    const responses = Object.entries(final).map(([questionId, answer]) => ({ questionId, answer }))
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId, competition, responses }),
      })
    } catch {}
    localStorage.setItem(feedbackKey, '1')
    setSubmitting(false)
    setPhase('done')
    setTimeout(() => setPhase('idle'), 2200)
  }

  const q: Question | undefined = questions[currentQ]
  const canAdvance = q
    ? (!q.required || q.type === 'text' || !!answers[q.id])
    : true

  return (
    <>
      <article className="entry-card">
        <Link href={`/entry/${entryId}`} className="entry-image" style={{ textDecoration: 'none', display: 'block' }}>
          <span className="entry-id-badge">ID: {entryId}</span>
          {imageUrl
            ? <img src={imageUrl} alt={setName} />
            : <span>{setName}</span>}
        </Link>
        <div className="entry-body">
          <div className="designer-row">
            <div className="designer-name">{designerName}</div>
            <div className="vote-count">{votes.toLocaleString()} Votes</div>
          </div>
          <div className="action-row">
            <button
              className="vote-button"
              onClick={handleVote}
              disabled={loading}
              style={voted ? { background: '#222', color: '#fff' } : {}}
            >
              {voted ? '✓ VOTED' : '♥ VOTE'}
            </button>
            <Link
              href={`/entry/${entryId}`}
              className="share-button"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              aria-label="View entry"
            >
              ✈
            </Link>
          </div>
        </div>
      </article>

      {(phase === 'feedback' || phase === 'done') && (
        <div
          className="feedback-overlay"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="feedback-modal">
            {phase === 'done' ? (
              <div className="feedback-thanks">
                <div className="feedback-thanks-icon">✓</div>
                <div className="feedback-thanks-title">Thanks!</div>
                <div className="feedback-thanks-sub">Your feedback helps the brand make better decisions.</div>
              </div>
            ) : q ? (
              <>
                <div className="feedback-modal-header">
                  <span className="feedback-entry-name">{setName}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="feedback-progress">Q{currentQ + 1} / {questions.length}</span>
                    <button className="feedback-close" onClick={closeModal}>✕</button>
                  </div>
                </div>
                <div className="feedback-body">
                  <div className="feedback-q">{q.text}</div>

                  {q.type === 'yes_no' && (
                    <div className="feedback-yn">
                      <button
                        className={`feedback-choice${answers[q.id] === 'YES' ? ' selected' : ''}`}
                        onClick={() => selectAnswer('YES')}
                      >YES</button>
                      <button
                        className={`feedback-choice${answers[q.id] === 'NO' ? ' selected' : ''}`}
                        onClick={() => selectAnswer('NO')}
                      >NO</button>
                    </div>
                  )}

                  {q.type === 'choice' && (
                    <div className="feedback-choices">
                      {q.options?.map(opt => (
                        <button
                          key={opt}
                          className={`feedback-choice${answers[q.id] === opt ? ' selected' : ''}`}
                          onClick={() => selectAnswer(opt)}
                        >{opt}</button>
                      ))}
                    </div>
                  )}

                  {q.type === 'text' && (
                    <textarea
                      className="feedback-textarea"
                      value={textDraft}
                      onChange={e => setTextDraft(e.target.value)}
                      placeholder="Your thoughts..."
                      rows={3}
                    />
                  )}

                  <button
                    className="feedback-next"
                    disabled={submitting || !canAdvance}
                    onClick={advance}
                  >
                    {currentQ === questions.length - 1
                      ? (submitting ? 'SENDING...' : 'SUBMIT →')
                      : 'NEXT →'}
                  </button>

                  {!q.required && (
                    <button className="feedback-skip" onClick={skipQ}>Skip</button>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
