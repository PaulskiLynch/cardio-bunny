'use client'

import { useState } from 'react'

const PINK = '#FF2D6B'

const QUESTIONS = [
  { id: 'buy',   text: 'Would you buy this if it was available in your local store?', type: 'yes_no', required: true, options: [] },
  { id: 'price', text: 'What would you pay for this set?', type: 'choice', required: true, options: ['Under £30', '£30–£50', '£50–£80', 'Over £80'] },
  { id: 'style', text: 'What do you love most about this design?', type: 'text', required: false, options: [] },
]

type Phase = 'idle' | 'voted' | 'feedback' | 'done'

export default function DemoVoteCard() {
  const [phase, setPhase]     = useState<Phase>('idle')
  const [votes, setVotes]     = useState(247)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [textDraft, setTextDraft] = useState('')

  function handleVote() {
    if (phase === 'voted' || phase === 'done') {
      setVotes(v => v - 1)
      setPhase('idle')
      setAnswers({})
      setCurrentQ(0)
      return
    }
    setVotes(v => v + 1)
    setPhase('feedback')
    setCurrentQ(0)
    setAnswers({})
    setTextDraft('')
  }

  function selectAnswer(answer: string) {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQ].id]: answer }))
  }

  function advance() {
    const q = QUESTIONS[currentQ]
    let final = answers
    if (q.type === 'text' && textDraft.trim()) {
      final = { ...answers, [q.id]: textDraft.trim() }
      setAnswers(final)
    }
    setTextDraft('')
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1)
    } else {
      setPhase('done')
      setTimeout(() => setPhase('voted'), 1800)
    }
  }

  function skipQ() {
    setTextDraft('')
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1)
    } else {
      setPhase('voted')
    }
  }

  function closeModal() {
    setPhase('voted')
  }

  const q = QUESTIONS[currentQ]
  const isVoted = phase === 'voted' || phase === 'done'
  const canAdvance = !q.required || q.type === 'text' || !!answers[q.id]

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', marginBottom: 16 }}>
        Interactive demo - try voting
      </div>

      <div style={{ maxWidth: 280, position: 'relative' }}>
        {/* Entry card */}
        <article style={{ border: '1.5px solid #e8e8e8', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {/* Image */}
          <div style={{ position: 'relative', background: '#0d1a2e', aspectRatio: '4/3', overflow: 'hidden' }}>
            <img
              src="/hero-image.png"
              alt="Sample entry"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.9 }}
            />
            <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 10, fontWeight: 900, padding: '3px 8px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>
              ID: CB-00247
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '12px 14px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <div style={{ fontWeight: 900, fontSize: 14 }}>Sophie R.</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#888' }}>{votes.toLocaleString()} Votes</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <button
                onClick={handleVote}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  borderRadius: 8,
                  border: 'none',
                  background: isVoted ? '#111' : PINK,
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                {isVoted ? '✓ VOTED' : '♥ VOTE'}
              </button>
              <button style={{ width: 38, borderRadius: 8, border: '1.5px solid #eee', background: '#fff', fontSize: 16, cursor: 'default' }}>✈</button>
            </div>
            <div style={{ fontSize: 11, color: '#1a7a1a', fontWeight: 700 }}>✓ Verified voting</div>
          </div>
        </article>

        {/* Feedback modal */}
        {(phase === 'feedback' || phase === 'done') && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
            onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
            <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '24px 20px 36px', width: '100%', maxWidth: 480 }}>
              {phase === 'done' ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>✓</div>
                  <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 6 }}>Thanks!</div>
                  <div style={{ fontSize: 14, color: '#666' }}>Your feedback helps the brand make better decisions.</div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#888' }}>Q{currentQ + 1} / {QUESTIONS.length}</span>
                    <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#888' }}>✕</button>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 20, lineHeight: 1.3 }}>{q.text}</div>

                  {q.type === 'yes_no' && (
                    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                      {['YES', 'NO'].map(opt => (
                        <button key={opt} onClick={() => selectAnswer(opt)}
                          style={{ flex: 1, padding: '12px 0', borderRadius: 10, border: `2px solid ${answers[q.id] === opt ? PINK : '#ddd'}`, background: answers[q.id] === opt ? PINK : '#fff', color: answers[q.id] === opt ? '#fff' : '#333', fontWeight: 900, fontSize: 15, cursor: 'pointer' }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === 'choice' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                      {q.options.map(opt => (
                        <button key={opt} onClick={() => selectAnswer(opt)}
                          style={{ padding: '12px 16px', borderRadius: 10, border: `2px solid ${answers[q.id] === opt ? PINK : '#ddd'}`, background: answers[q.id] === opt ? PINK : '#fff', color: answers[q.id] === opt ? '#fff' : '#333', fontWeight: 700, fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === 'text' && (
                    <textarea value={textDraft} onChange={e => setTextDraft(e.target.value)}
                      placeholder="Your thoughts..."
                      style={{ width: '100%', borderRadius: 10, border: '1.5px solid #ddd', padding: '12px 14px', fontSize: 14, marginBottom: 20, resize: 'none', outline: 'none', fontFamily: 'inherit' }}
                      rows={3} />
                  )}

                  <button onClick={advance} disabled={!canAdvance}
                    style={{ width: '100%', padding: '14px 0', borderRadius: 10, border: 'none', background: canAdvance ? PINK : '#eee', color: canAdvance ? '#fff' : '#aaa', fontWeight: 900, fontSize: 15, cursor: canAdvance ? 'pointer' : 'default' }}>
                    {currentQ === QUESTIONS.length - 1 ? 'SUBMIT →' : 'NEXT →'}
                  </button>

                  {!q.required && (
                    <button onClick={skipQ} style={{ width: '100%', marginTop: 10, padding: '10px 0', background: 'none', border: 'none', color: '#aaa', fontSize: 13, cursor: 'pointer' }}>
                      Skip
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* What gets captured */}
      <div style={{ marginTop: 20, padding: '16px 18px', background: '#f8f8f8', borderRadius: 12, maxWidth: 280 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#aaa', marginBottom: 8 }}>Every vote captures</div>
        <div style={{ fontSize: 14, fontWeight: 900, color: '#111', marginBottom: 6 }}>Up to 6 customised questions</div>
        <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>
          Price, colour, sizing, occasions, features - you choose exactly what market data you need.
        </div>
      </div>
    </div>
  )
}
