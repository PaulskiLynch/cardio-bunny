'use client'

import { useState, useEffect } from 'react'

interface Props {
  entryId: string
  designerName: string
  initialVotes: number
}

export default function VoteClient({ entryId, designerName, initialVotes }: Props) {
  const [votes, setVotes]       = useState(initialVotes)
  const [voted, setVoted]       = useState(false)
  const [sheetOpen, setSheet]   = useState(false)
  const [copied, setCopied]     = useState(false)

  const storageKey = `voted_${entryId}`
  const shareUrl   = typeof window !== 'undefined' ? window.location.href : ''
  const shareText  = `Help me win a spot in Cardio Bunny Academy. Vote for my set here: ${shareUrl}`

  useEffect(() => {
    if (localStorage.getItem(storageKey)) setVoted(true)
  }, [storageKey])

  async function handleVote() {
    if (voted) { setSheet(true); return }
    const res = await fetch(`/api/vote/${entryId}`, { method: 'POST' })
    if (res.ok) {
      const json = await res.json()
      setVotes(json.voteCount)
      setVoted(true)
      localStorage.setItem(storageKey, '1')
    }
    setSheet(true)
  }

  function whatsapp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="action-row single">
        <button className="vote-button" onClick={handleVote}>
          {voted ? '✓ VOTED' : `VOTE FOR ${designerName.toUpperCase()}`}
        </button>
        <button className="share-button" style={{ marginTop: 10 }} onClick={() => setSheet(true)}>
          SHARE THIS ENTRY
        </button>
      </div>

      {sheetOpen && <div className="sheet-overlay open" onClick={() => setSheet(false)} />}

      <div className={`success-sheet${sheetOpen ? ' open' : ''}`}>
        <div className="sheet-handle" />
        <div className="success-title">{voted ? 'Vote Counted' : 'Share This Entry'}</div>
        <div className="success-text">
          Want to see {designerName} win? Every share brings them closer to the global showrooms.
        </div>
        <div className="share-actions">
          <button className="share-action" onClick={whatsapp}>SHARE ON WHATSAPP</button>
          <button className="share-action" style={{ background: '#888' }} onClick={() => alert('Open Instagram Stories and paste the link manually: ' + shareUrl)}>
            POST TO IG STORIES
          </button>
          <button className="share-action" onClick={copyLink}>
            {copied ? 'LINK COPIED!' : 'COPY VOTE LINK'}
          </button>
        </div>
        <button className="close-sheet" onClick={() => setSheet(false)}>CLOSE</button>
      </div>

      <div style={{ textAlign: 'right', fontWeight: 950, fontSize: 18, marginTop: 8 }}>
        {votes.toLocaleString()} Votes
      </div>
    </>
  )
}
