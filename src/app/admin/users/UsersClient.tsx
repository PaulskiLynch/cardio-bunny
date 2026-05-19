'use client'

import { useState } from 'react'

export interface UserRow {
  id: string
  name: string
  username: string
  email: string
  imageUrl: string
  joinedAt: string
  lastSignIn: string | null
  votes: number
  entries: number
  role: string | null
}

function Avatar({ src, name }: { src: string; name: string }) {
  const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || '?'
  return src ? (
    <img src={src} alt={name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
  ) : (
    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e8325a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
      {initials}
    </div>
  )
}

function UserRow({ user, onDelete, onRoleChange }: {
  user: UserRow
  onDelete: (id: string) => void
  onRoleChange: (id: string, role: string | null) => void
}) {
  const [busy, setBusy] = useState(false)
  const isAdmin = user.role === 'admin'

  async function toggleRole() {
    setBusy(true)
    const newRole = isAdmin ? null : 'admin'
    await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
    onRoleChange(user.id, newRole)
    setBusy(false)
  }

  async function deleteUser() {
    if (!confirm(`Delete ${user.email}? This cannot be undone.`)) return
    setBusy(true)
    await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    onDelete(user.id)
  }

  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar src={user.imageUrl} name={user.name} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{user.name || '—'}</div>
            {user.username && <div style={{ fontSize: 11, color: '#888' }}>@{user.username}</div>}
          </div>
        </div>
      </td>
      <td style={{ fontSize: 13 }}>{user.email}</td>
      <td style={{ fontSize: 12, color: '#888' }}>{user.joinedAt}</td>
      <td style={{ fontSize: 12, color: '#888' }}>{user.lastSignIn ?? '—'}</td>
      <td style={{ fontWeight: 700, textAlign: 'right' }}>{user.votes}</td>
      <td style={{ fontWeight: 700, textAlign: 'right' }}>{user.entries}</td>
      <td>
        {isAdmin ? (
          <span style={{ background: '#111', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 900, letterSpacing: '0.06em' }}>
            ADMIN
          </span>
        ) : (
          <span style={{ color: '#bbb', fontSize: 12 }}>—</span>
        )}
      </td>
      <td>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={toggleRole}
            disabled={busy}
            style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4, cursor: 'pointer',
              border: '1px solid #ddd', background: isAdmin ? '#fff0f0' : '#f0f0f0', color: '#333',
            }}
          >
            {busy ? '...' : isAdmin ? 'Remove Admin' : 'Make Admin'}
          </button>
          <button
            onClick={deleteUser}
            disabled={busy}
            style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4, cursor: 'pointer',
              border: '1px solid #fbb', background: '#fff0f0', color: '#c00',
            }}
          >
            {busy ? '...' : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  )
}

function InviteForm() {
  const [email, setEmail] = useState('')
  const [busy, setBusy]   = useState(false)
  const [msg, setMsg]     = useState('')

  async function send(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    const res = await fetch('/api/admin/users/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setMsg(res.ok ? `Invitation sent to ${email}` : (data.error ?? 'Failed'))
    if (res.ok) setEmail('')
    setBusy(false)
  }

  return (
    <form onSubmit={send} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email address"
        required
        style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13, minWidth: 220 }}
      />
      <button
        type="submit"
        disabled={busy}
        style={{ padding: '6px 16px', borderRadius: 4, background: '#111', color: '#fff', fontWeight: 900, fontSize: 13, cursor: 'pointer', border: 'none' }}
      >
        {busy ? '...' : 'Send Invite'}
      </button>
      {msg && <span style={{ fontSize: 12, color: msg.startsWith('Invitation') ? '#2a7a2a' : '#c00', fontWeight: 700 }}>{msg}</span>}
    </form>
  )
}

export default function UsersClient({ initial }: { initial: UserRow[] }) {
  const [users, setUsers] = useState(initial)
  const [search, setSearch] = useState('')

  function handleDelete(id: string) {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  function handleRoleChange(id: string, role: string | null) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
  }

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
  })

  const adminCount = users.filter(u => u.role === 'admin').length

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13, color: '#888' }}>
          {users.length} user{users.length !== 1 ? 's' : ''} &nbsp;·&nbsp; {adminCount} admin{adminCount !== 1 ? 's' : ''}
        </div>
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ddd', fontSize: 13, minWidth: 200, marginLeft: 'auto' }}
        />
      </div>

      <div style={{ marginBottom: 24, padding: '16px 20px', background: '#f9f9f9', borderRadius: 8, border: '1px solid #eee' }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Invite New User</div>
        <InviteForm />
      </div>

      <div className="studio-table-wrap">
        <table className="studio-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Last Sign-in</th>
              <th style={{ textAlign: 'right' }}>Votes</th>
              <th style={{ textAlign: 'right' }}>Entries</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
                  {search ? 'No users match your search.' : 'No users yet.'}
                </td>
              </tr>
            ) : (
              filtered.map(user => (
                <UserRow
                  key={user.id}
                  user={user}
                  onDelete={handleDelete}
                  onRoleChange={handleRoleChange}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
