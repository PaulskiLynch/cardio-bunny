'use client'

import { useState, useEffect } from 'react'
import { type Question } from '@/lib/questions'

interface Props {
  entryId: string
  designerName: string
  initialVotes: number
  competition: string
  questions: Question[]
}

type Phase = 'idle' | 'feedback' | 'done' | 'share'

export default function VoteClient({ entryId, designerName, initialVotes, competition, questions }: Props) {
  const [votes, setVotes]         = useState(initialVotes)
  const [voted, setVoted]         = useState(false)
  const [phase, setPhase]         = useState<Phase>('idle')
  const [currentQ, setCurrentQ]   = useState(0)
  const [answers, setAnswers]     = useState<Record<string, string>>({})
  const [textDraft, setTextDraft] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied]       = useState(false)

  const storageKey  = `voted_${entryId}`
  const feedbackKey = `feedback_${entryId}`
  const shareUrl    = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (localStorage.getItem(storageKey)) setVoted(true)
  }, [storageKey])

  async function handleVote() {
    if (voted) {
      const res = await fetch(`/api/vote/${entryId}`, { method: 'DELETE' })
      if (res.ok) {
        const json = await res.json()
        setVotes(json.voteCount)
        setVoted(false)
        localStorage.removeItem(storageKey)
      }
      return
    }
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
      } else {
        setPhase('share')
      }
    }
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
    if (q?.type === 'text' && textDraft.trim()) final = { ...answers, [q.id]: textDraft.trim() }
    if (Object.keys(final).length > 0) {
      submitFeedback(final)
    } else {
      localStorage.setItem(feedbackKey, '1')
      setPhase('share')
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
    setTimeout(() => setPhase('share'), 1800)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function whatsapp() {
    const text = `Help ${designerName} win — vote here: ${shareUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const q = questions[currentQ]
  const canAdvance = q ? (!q.required || q.type === 'text' || !!answers[q.id]) : true

  return (
    <>
      <div className="action-row single">
        <button
          className="vote-button"
          onClick={handleVote}
          style={voted ? { background: '#222', color: '#fff' } : {}}
        >
          {voted ? '✓ VOTED — tap to remove' : `♥ VOTE FOR ${designerName.toUpperCase()}`}
        </button>
        <button className="share-button" style={{ marginTop: 10 }} onClick={() => setPhase('share')}>
          SHARE THIS ENTRY
        </button>
      </div>

      <div style={{ textAlign: 'right', fontWeight: 950, fontSize: 18, marginTop: 8 }}>
        {votes.toLocaleString()} Votes
      </div>

      {/* Feedback modal */}
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
                  <span className="feedback-entry-name">{designerName}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="feedback-progress">Q{currentQ + 1} / {questions.length}</span>
                    <button className="feedback-close" onClick={closeModal}>✕</button>
                  </div>
                </div>
                <div className="feedback-body">
                  <div className="feedback-q">{q.text}</div>

                  {q.type === 'yes_no' && (
                    <div className="feedback-yn">
                      <button className={`feedback-choice${answers[q.id] === 'YES' ? ' selected' : ''}`} onClick={() => selectAnswer('YES')}>YES</button>
                      <button className={`feedback-choice${answers[q.id] === 'NO' ? ' selected' : ''}`} onClick={() => selectAnswer('NO')}>NO</button>
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

                  <button className="feedback-next" disabled={submitting || !canAdvance} onClick={advance}>
                    {currentQ === questions.length - 1 ? (submitting ? 'SENDING...' : 'SUBMIT →') : 'NEXT →'}
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

      {/* Share sheet */}
      {phase === 'share' && <div className="sheet-overlay open" onClick={() => setPhase('idle')} />}
      <div className={`success-sheet${phase === 'share' ? ' open' : ''}`}>
        <div className="sheet-handle" />
        <div className="success-title">Share This Entry</div>
        <div className="success-text">
          Want to see {designerName} win? Every share brings them closer to the shelf.
        </div>
        <div className="share-actions">
          <button className="share-action" onClick={whatsapp}>SHARE ON WHATSAPP</button>
          <button className="share-action" onClick={copyLink}>
            {copied ? 'LINK COPIED!' : 'COPY VOTE LINK'}
          </button>
        </div>
        <button className="close-sheet" onClick={() => setPhase('idle')}>CLOSE</button>
      </div>
    </>
  )
}
