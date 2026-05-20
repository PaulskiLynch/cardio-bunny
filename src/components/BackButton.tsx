'use client'

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 700,
        color: '#888',
        padding: '16px 20px 0',
        textDecoration: 'none',
      }}
    >
      ← Back
    </button>
  )
}
