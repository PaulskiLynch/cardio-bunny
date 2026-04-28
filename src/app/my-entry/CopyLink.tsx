'use client'

import { useState } from 'react'

export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className="copy-button" onClick={copy}>
      {copied ? '✓ LINK COPIED!' : 'COPY VOTE LINK'}
    </button>
  )
}
