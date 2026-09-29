import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { img } from '@/data/fixtures'

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'Sign In — CasaNest' }] }),
  component: Login,
})

function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [notice, setNotice] = useState(false)
  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-72px)]">
      <div className="relative hidden lg:block">
        <img src={img('bedroom', 1400)} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <p className="absolute bottom-12 left-12 right-12 font-display italic text-4xl text-ivory leading-snug">
          “Save the rooms that move you, and return to them whenever inspiration strikes.”
        </p>
      </div>
      <div className="flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-sm">
          <div className="flex border-b border-sand">
            {(['login', 'register'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setNotice(false) }} className={`flex-1 pb-3 text-xs tracking-[0.2em] uppercase border-b-2 -mb-px ${mode === m ? 'border-gold text-charcoal' : 'border-transparent text-charcoal/50'}`}>
                {m === 'login' ? 'Sign in' : 'Register'}
              </button>
            ))}
          </div>
          <h1 className="font-display text-4xl mt-10">{mode === 'login' ? 'Welcome back' : 'Join CasaNest'}</h1>
          <p className="text-sm text-charcoal/60 mt-2">
            {mode === 'login' ? 'Access your favorites, collections and consultations.' : 'Create an account to save designs and book designers.'}
          </p>
          <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setNotice(true) }}>
            {mode === 'register' && <Field label="Full name" type="text" />}
            <Field label="Email" type="email" />
            <Field label="Password" type="password" />
            <button className="w-full px-5 py-4 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase hover:bg-walnut">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>
          {notice && (
            <p className="mt-6 bg-cream p-4 text-sm text-charcoal/75">
              Member accounts are opening shortly. Until then, your favorites are saved on this device —{' '}
              <Link to="/favorites" className="text-walnut underline">view them here</Link>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">{label}</span>
      <input required type={type} className="mt-1 w-full bg-cream px-4 py-3 outline-none border border-transparent focus:border-gold text-sm" />
    </label>
  )
}
