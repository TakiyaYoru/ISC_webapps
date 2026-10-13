import { useState } from 'react'
import { useUser } from '../context/userState'

export default function AuthenticatedLogin() {
  const { loginModalOpen, setLoginModalOpen, login } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  if (!loginModalOpen) return null
  return <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50">
    <section role="dialog" aria-modal="true" aria-labelledby="login-title" className="relative w-full max-w-md bg-background p-8 border border-outline-variant shadow-xl">
      <button aria-label="Đóng cửa sổ đăng nhập" onClick={() => { setLoginModalOpen(false); setPassword(''); setError('') }} className="absolute right-4 top-3 text-xl">×</button>
      <h2 id="login-title" className="font-serif text-2xl mb-3">Đăng nhập tài khoản</h2>
      <p className="text-sm mb-6">Theo dõi đơn hàng và lưu thông tin giao nhận. Bạn có thể đặt hàng không cần đăng nhập.</p>
      <form className="space-y-4" onSubmit={async e => {
        e.preventDefault(); if (busy) return; setBusy(true); setError('')
        try { await login(email.trim(), password); setPassword('') }
        catch (err) { setError(err instanceof Error ? err.message : 'Chưa đăng nhập được.') }
        finally { setBusy(false) }
      }}>
        <label className="block text-sm">Email<input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="block w-full mt-2 p-3 border border-outline-variant bg-transparent" /></label>
        <label className="block text-sm">Mật khẩu<input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full mt-2 p-3 border border-outline-variant bg-transparent" /></label>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button disabled={busy} className="btn-primary w-full disabled:opacity-50">{busy ? 'Đang đăng nhập…' : 'Đăng nhập'}</button>
      </form>
    </section>
  </div>
}
