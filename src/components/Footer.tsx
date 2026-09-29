import { Link } from '@tanstack/react-router'
import { homeTypes } from '@/data/fixtures'
import { Logo } from './Header'

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/70 mt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="font-display italic text-lg text-ivory/85 mt-4">Where Every Space Finds Its Style.</p>
          <p className="text-sm mt-4 max-w-xs leading-relaxed">
            Curated interior concepts, trusted designers and CasaAI — for homes of every scale.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5">Homes</p>
          <ul className="space-y-2.5 text-sm">
            {homeTypes.map((h) => (
              <li key={h.id}>
                <Link to="/homes/$type" params={{ type: h.id }} className="hover:text-gold-light transition-colors">{h.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Discover</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/spaces" className="hover:text-gold-light">Spaces & room sizes</Link></li>
            <li><Link to="/styles" className="hover:text-gold-light">Design styles</Link></li>
            <li><Link to="/designers" className="hover:text-gold-light">Designers</Link></li>
            <li><Link to="/casa-ai" className="hover:text-gold-light">CasaAI</Link></li>
            <li><Link to="/favorites" className="hover:text-gold-light">Favorites</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Studio</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/designers" className="hover:text-gold-light">Book a consultation</Link></li>
            <li><Link to="/login" className="hover:text-gold-light">Sign in / Register</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 text-xs flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} CasaNest Interiors</span>
          <span className="text-gold/80">Crafted for considered living</span>
        </div>
      </div>
    </footer>
  )
}
