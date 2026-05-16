'use client'

import { useState, useRef } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import type { Question } from '@/lib/questions'

export interface SwipeEntry {
  entryId: string
  setName: string
  designerName: string
  imageUrl: string | null
  voteCount: number
  initialVoted: boolean
}

interface Props {
  entries: SwipeEntry[]
  competition: string
  questions: Question[]
  accent: string
}

type ModalPhase = 'feedback' | 'thanks' | null

const THRESHOLD = 90

export default function SwipeStack({ entries, competition, questions, accent }: Props) {
  const { isSignedIn } = useUser()
  const { openSignIn } = useClerk()

  const [index, setIndex]           = useState(0)
  const [dragX, setDragX]           = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isExiting, setIsExiting]   = useState(false)
  const [exitDir, setExitDir]       = useState<'left' | 'right' | null>(null)
  const [modalPhase, setModalPhase] = useState<ModalPhase>(null)
  const [currentQ, setCurrentQ]     = useState(0)
  const [answers, setAnswers]       = useState<Record<string, string>>({})
  const [textDraft, setTextDraft]   = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [voted, setVoted]           = useState<Set<string>>(
    () => new Set(entries.filter(e => e.initialVoted).map(e => e.entryId))
  )

  const startX        = useRef(0)
  const lockedAxis    = useRef<'h' | 'v' | null>(null)
  const votedEntryRef = useRef<SwipeEntry | null>(null)

  const current = entries[index]
  const next    = entries[index + 1]
  const done    = index >= entries.length

  // ── Card advance ──────────────────────────────────────────
  function advanceCard() {
    setIsExiting(false)
    setExitDir(null)
    setDragX(0)
    setIndex(i => i + 1)
  }

  // ── Vote API ──────────────────────────────────────────────
  async function doVote(entry: SwipeEntry) {
    try {
      const res = await fetch(`/api/vote/${entry.entryId}`, { method: 'POST' })
      if (res.ok) {
        setVoted(v => new Set([...v, entry.entryId]))
        const feedbackKey = `feedback_${entry.entryId}`
        if (questions.length > 0 && !localStorage.getItem(feedbackKey)) {
          votedEntryRef.current = entry
          setCurrentQ(0)
          setAnswers({})
          setTextDraft('')
          setModalPhase('feedback')
          return
        }
      }
    } catch {}
    advanceCard()
  }

  // ── Touch handlers ────────────────────────────────────────
  function onTouchStart(e: React.TouchEvent) {
    if (isExiting || modalPhase) return
    startX.current = e.touches[0].clientX
    lockedAxis.current = null
    setIsDragging(true)
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isDragging || isExiting || modalPhase) return
    const dx = e.touches[0].clientX - startX.current
    const dy = e.touches[0].clientY - (e.touches[0].clientY) // unused but keeps types clean

    if (!lockedAxis.current) {
      const adx = Math.abs(dx)
      const ady = Math.abs(e.touches[0].clientY - startX.current) // rough check
      if (adx > 8) lockedAxis.current = 'h'
      else if (adx < 5) return
    }
    if (lockedAxis.current === 'h') setDragX(dx)
  }

  function onTouchEnd() {
    if (!isDragging || isExiting || modalPhase) return
    setIsDragging(false)
    lockedAxis.current = null

    if (dragX > THRESHOLD) {
      if (!isSignedIn) {
        setDragX(0)
        openSignIn({ fallbackRedirectUrl: window.location.href, signUpFallbackRedirectUrl: window.location.href })
        return
      }
      setIsExiting(true)
      setExitDir('right')
      const entry = current
      setTimeout(() => doVote(entry), 120)
    } else if (dragX < -THRESHOLD) {
      setIsExiting(true)
      setExitDir('left')
      setTimeout(advanceCard, 350)
    } else {
      setDragX(0)
    }
  }

  // ── Tap action buttons ────────────────────────────────────
  function tapVote() {
    if (!isSignedIn) {
      openSignIn({ fallbackRedirectUrl: window.location.href, signUpFallbackRedirectUrl: window.location.href })
      return
    }
    setIsExiting(true)
    setExitDir('right')
    const entry = current
    setTimeout(() => doVote(entry), 120)
  }

  function tapSkip() {
    setIsExiting(true)
    setExitDir('left')
    setTimeout(advanceCard, 350)
  }

  // ── Feedback modal ────────────────────────────────────────
  const q = questions[currentQ]
  const canAdvance = q ? (!q.required || q.type === 'text' || !!answers[q.id]) : true

  function selectAnswer(answer: string) {
    setAnswers(prev => ({ ...prev, [questions[currentQ].id]: answer }))
  }

  function advanceFeedback() {
    const fq = questions[currentQ]
    let final = answers
    if (fq.type === 'text' && textDraft.trim()) {
      final = { ...answers, [fq.id]: textDraft.trim() }
      setAnswers(final)
    }
    setTextDraft('')
    if (currentQ < questions.length - 1) setCurrentQ(c => c + 1)
    else submitFeedback(final)
  }

  function skipFeedback() {
    setTextDraft('')
    if (currentQ < questions.length - 1) setCurrentQ(c => c + 1)
    else submitFeedback(answers)
  }

  async function submitFeedback(final: Record<string, string>) {
    const entryId = votedEntryRef.current?.entryId ?? ''
    setSubmitting(true)
    const responses = Object.entries(final).map(([questionId, answer]) => ({ questionId, answer }))
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId, competition, responses }),
      })
    } catch {}
    localStorage.setItem(`feedback_${entryId}`, '1')
    setSubmitting(false)
    setModalPhase('thanks')
    setTimeout(() => { setModalPhase(null); advanceCard() }, 1800)
  }

  function closeModal() {
    const fq = questions[currentQ]
    let final = answers
    if (fq?.type === 'text' && textDraft.trim()) final = { ...answers, [fq.id]: textDraft.trim() }
    if (Object.keys(final).length > 0) submitFeedback(final)
    else {
      localStorage.setItem(`feedback_${votedEntryRef.current?.entryId ?? ''}`, '1')
      setModalPhase(null)
      advanceCard()
    }
  }

  // ── Card style ────────────────────────────────────────────
  const rotate = dragX / 20
  const behindScale = Math.min(1, 0.94 + (Math.abs(dragX) / THRESHOLD) * 0.06)
  const behindY     = Math.max(0, 14 - (Math.abs(dragX) / THRESHOLD) * 14)

  const cardStyle: React.CSSProperties = isExiting
    ? {
        transform: `translateX(${exitDir === 'right' ? 660 : -660}px) rotate(${exitDir === 'right' ? 28 : -28}deg)`,
        transition: 'transform 0.38s ease-in, opacity 0.38s ease-in',
        opacity: 0,
      }
    : isDragging
    ? { transform: `translateX(${dragX}px) rotate(${rotate}deg)`, transition: 'none' }
    : { transform: 'translateX(0) rotate(0deg)', transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)' }

  const voteOpacity = Math.min(1, Math.max(0, (dragX - 30) / 60))
  const skipOpacity = Math.min(1, Math.max(0, (-dragX - 30) / 60))

  // ── Done state ────────────────────────────────────────────
  if (done) {
    return (
      <div className="swipe-stack">
        <div className="swipe-done">
          <div className="swipe-done-icon">🎉</div>
          <div className="swipe-done-title">You&apos;ve seen them all!</div>
          <div className="swipe-done-sub">Check back soon for new entries.</div>
          <Link href={`/designs?competition=${competition}`} className="swipe-done-link" style={{ color: accent }}>
            View all entries →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="swipe-stack">
      {/* Progress */}
      <div className="swipe-progress">
        {index + 1} <span style={{ color: '#ccc' }}>/</span> {entries.length}
      </div>

      {/* Cards */}
      <div className="swipe-cards">

        {/* Next card peeking behind */}
        {next && (
          <div
            className="swipe-card swipe-card-behind"
            key={`behind-${next.entryId}`}
            style={{ transform: `scale(${behindScale}) translateY(${behindY}px)` }}
          >
            {next.imageUrl && <img src={next.imageUrl} alt={next.setName} className="swipe-card-img" draggable={false} />}
            <div className="swipe-card-footer">
              <div className="swipe-card-name">{next.designerName}</div>
            </div>
          </div>
        )}

        {/* Current card */}
        <div
          className="swipe-card"
          key={current.entryId}
          style={cardStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="swipe-indicator swipe-vote" style={{ opacity: voteOpacity }}>♥ VOTE</div>
          <div className="swipe-indicator swipe-skip" style={{ opacity: skipOpacity }}>SKIP ✕</div>

          {current.imageUrl
            ? <img src={current.imageUrl} alt={current.setName} className="swipe-card-img" draggable={false} />
            : <div className="swipe-card-placeholder">{current.setName}</div>
          }

          <div className="swipe-card-footer">
            <div className="swipe-card-name">{current.designerName}</div>
            <div className="swipe-card-sub">{current.setName}</div>
            {voted.has(current.entryId) && (
              <div className="swipe-voted-badge" style={{ color: accent }}>✓ Voted</div>
            )}
          </div>
        </div>
      </div>

      {/* Tap action buttons */}
      <div className="swipe-actions">
        <button className="swipe-btn swipe-btn-skip" onClick={tapSkip} aria-label="Skip">✕</button>
        <button className="swipe-btn swipe-btn-vote" onClick={tapVote} aria-label="Vote" style={{ borderColor: accent, color: accent }}>♥</button>
      </div>

      <div className="swipe-hint">Swipe right to vote &nbsp;·&nbsp; Swipe left to skip</div>

      {/* Feedback modal (reuses existing styles) */}
      {(modalPhase === 'feedback' || modalPhase === 'thanks') && (
        <div className="feedback-overlay" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="feedback-modal">
            {modalPhase === 'thanks' ? (
              <div className="feedback-thanks">
                <div className="feedback-thanks-icon">✓</div>
                <div className="feedback-thanks-title">Thanks!</div>
                <div className="feedback-thanks-sub">Your feedback helps the brand make better decisions.</div>
              </div>
            ) : q ? (
              <>
                <div className="feedback-modal-header">
                  <span className="feedback-entry-name">{votedEntryRef.current?.setName ?? ''}</span>
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
                        <button key={opt} className={`feedback-choice${answers[q.id] === opt ? ' selected' : ''}`} onClick={() => selectAnswer(opt)}>{opt}</button>
                      ))}
                    </div>
                  )}
                  {q.type === 'text' && (
                    <textarea className="feedback-textarea" value={textDraft} onChange={e => setTextDraft(e.target.value)} placeholder="Your thoughts..." rows={3} />
                  )}
                  <button className="feedback-next" disabled={submitting || !canAdvance} onClick={advanceFeedback}>
                    {currentQ === questions.length - 1 ? (submitting ? 'SENDING...' : 'SUBMIT →') : 'NEXT →'}
                  </button>
                  {!q.required && <button className="feedback-skip" onClick={skipFeedback}>Skip</button>}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
