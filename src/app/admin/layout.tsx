import { SignOutButton } from '@clerk/nextjs'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{
        position: 'fixed', top: 0, right: 0, zIndex: 1000,
        padding: '8px 16px',
      }}>
        <SignOutButton redirectUrl="/">
          <button style={{
            fontSize: 12, fontWeight: 700, padding: '5px 14px',
            borderRadius: 4, border: '1px solid #ddd',
            background: '#fff', color: '#333', cursor: 'pointer',
          }}>
            Sign out
          </button>
        </SignOutButton>
      </div>
      {children}
    </>
  )
}
