import { Link } from '@tanstack/react-router'
import { Heart, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useFavorites } from '@/lib/favorites'

const nav = [
  { to: '/homes', label: 'Explore Homes' },
  { to: '/spaces', label: 'Spaces' },
  { to: '/styles', label: 'Styles' },
  { to: '/designers', label: 'Designers' },
  { to: '/casa-ai', label: 'CasaAI' },
] as const

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`font-display text-2xl tracking-tight ${light ? 'text-ivory' : 'text-charcoal'}`}>
      Casa<span className="italic text-gold">Nest</span>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const favorites = useFavorites()
  return (
    <header className="sticky top-0 z-40 bg-ivory/85 backdrop-blur-lg border-b border-sand/70">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-18 flex items-center gap-8 py-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7 text-[0.82rem] tracking-wide">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-charcoal/75 hover:text-walnut transition-colors"
              activeProps={{ className: 'text-walnut! font-medium' }}
            >
              {n.label === 'CasaAI' ? (
                <span>Casa<span className="text-gold">AI</span></span>
              ) : (
                n.label
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/homes" aria-label="Search designs" className="grid place-items-center size-10 rounded-full hover:bg-cream transition-colors">
            <Search className="size-4.5" strokeWidth={1.6} />
          </Link>
          <Link to="/favorites" aria-label="Favorites" className="relative grid place-items-center size-10 rounded-full hover:bg-cream transition-colors">
            <Heart className="size-4.5" strokeWidth={1.6} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-gold text-ivory text-[0.6rem] grid place-items-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center ml-2 px-5 py-2.5 text-[0.78rem] tracking-[0.12em] uppercase bg-charcoal text-ivory hover:bg-espresso transition-colors"
          >
            Sign In
          </Link>
          <button className="lg:hidden grid place-items-center size-10" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-sand bg-ivory px-5 py-4 flex flex-col">
          {[...nav, { to: '/favorites', label: 'Favorites' } as const, { to: '/login', label: 'Sign In' } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-display text-lg border-b border-sand/60 last:border-0">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
