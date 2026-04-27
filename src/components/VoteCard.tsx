'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Props {
  entryId: string
  setName: string
  designerName: string
  imageUrl: string | null
  initialVotes: number
}

export default function VoteCard({ entryId, setName, designerName, imageUrl, initialVotes }: Props) {
  const [votes, setVotes] = useState(initialVotes)
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(false)

  const storageKey = `voted_${entryId}`

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
      }
    }
    setLoading(false)
  }

  return (
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
  )
}
