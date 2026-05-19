import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <SignUp />
    </main>
  )
}
