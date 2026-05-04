'use client'

import { useState, useRef } from 'react'
import { upload } from '@vercel/blob/client'

interface BlobItem {
  url: string
  pathname: string
  size: number
  uploadedAt: string
}

function isVideo(url: string) {
  return /\.(mp4|webm)$/i.test(url)
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileName(pathname: string) {
  return pathname.split('/').pop() ?? pathname
}

export default function MediaLibrary({ initial }: { initial: BlobItem[] }) {
  const [blobs, setBlobs]         = useState(initial)
  const [copied, setCopied]       = useState('')
  const [deleting, setDeleting]   = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      await upload(`loops/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/media',
      })
      const refreshed = await fetch('/api/admin/media')
      const data = await refreshed.json()
      setBlobs(data.blobs)
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDelete(url: string) {
    if (!confirm('Delete this file? This cannot be undone.')) return
    setDeleting(url)
    await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    setBlobs(prev => prev.filter(b => b.url !== url))
    setDeleting('')
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div>
      {/* Upload */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 900, fontSize: 13, cursor: uploading ? 'default' : 'pointer' }}
        >
          {uploading ? 'Uploading...' : '+ Upload file'}
        </button>
        <span style={{ fontSize: 12, color: '#888' }}>Images or MP4 video, max 100 MB</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/mp4,video/webm"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {uploadError && <span style={{ fontSize: 13, color: '#c00', fontWeight: 700 }}>{uploadError}</span>}
      </div>

      {/* Grid */}
      {blobs.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: '#777', fontWeight: 700 }}>
          No files yet. Upload something above.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {blobs.map(blob => (
            <div key={blob.url} style={{ border: '1.5px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
              <div style={{ background: '#f5f5f5', aspectRatio: '4/3', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isVideo(blob.url) ? (
                  <video
                    src={blob.url}
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={e => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0 }}
                  />
                ) : (
                  <img src={blob.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={fileName(blob.pathname)}>
                  {fileName(blob.pathname)}
                </div>
                <div style={{ fontSize: 11, color: '#999', marginBottom: 10 }}>
                  {formatSize(blob.size)} &middot; {new Date(blob.uploadedAt).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => copyUrl(blob.url)}
                    style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: '1.5px solid #ddd', background: copied === blob.url ? '#e6ffe6' : '#fff', fontWeight: 900, fontSize: 11, cursor: 'pointer' }}
                  >
                    {copied === blob.url ? 'Copied!' : 'Copy URL'}
                  </button>
                  <button
                    onClick={() => handleDelete(blob.url)}
                    disabled={deleting === blob.url}
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1.5px solid #fdd', background: '#fff', color: '#c00', fontWeight: 900, fontSize: 11, cursor: 'pointer' }}
                  >
                    {deleting === blob.url ? '...' : 'Del'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
