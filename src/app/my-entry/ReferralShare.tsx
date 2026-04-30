'use client'

import { useState } from 'react'

interface Props {
  url: string
  designerName: string
  referralVotes: number
  bonusVotes: number
}

export default function ReferralShare({ url, designerName, referralVotes, bonusVotes }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function whatsapp() {
    const text = `Vote for my design and earn me bonus votes! Every 10 votes via this link gives me +5 extra: ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const progress      = referralVotes % 10
  const toNextBonus   = 10 - progress
  const bonusUnlocked = Math.floor(referralVotes / 10)

  return (
    <div className="referral-block">
      <div className="referral-block-title">Share to earn bonus votes</div>
      <div className="referral-block-sub">
        Every 10 friends who vote via your link earns you <strong>+5 bonus votes</strong>.
      </div>

      <div className="referral-share-row">
        <button className="referral-btn-primary" onClick={whatsapp}>Share on WhatsApp</button>
        <button className="referral-btn-secondary" onClick={copy}>{copied ? '✓ Copied!' : 'Copy link'}</button>
      </div>

      {referralVotes > 0 ? (
        <>
          <div className="referral-progress-wrap">
            <div className="referral-progress-bar">
              <div className="referral-progress-fill" style={{ width: `${(progress / 10) * 100}%` }} />
            </div>
            <div className="referral-progress-label">
              {progress === 0
                ? `🎉 Bonus unlocked! Keep sharing.`
                : `${progress} / 10 - ${toNextBonus} more to unlock +5 bonus votes`}
            </div>
          </div>
          <div className="referral-stats">
            <span>{referralVotes} friend{referralVotes !== 1 ? 's' : ''} voted via your link</span>
            {bonusVotes > 0 && (
              <span style={{ color: '#1a7a1a', fontWeight: 900 }}>+{bonusVotes} bonus votes earned</span>
            )}
          </div>
        </>
      ) : (
        <div className="referral-hint">
          Share your link - {designerName}&apos;s friends are waiting.
        </div>
      )}
    </div>
  )
}
