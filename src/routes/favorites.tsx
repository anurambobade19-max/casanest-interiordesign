import { Link, createFileRoute } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import { DesignCard } from '@/components/DesignCard'
import { designs } from '@/data/fixtures'
import { useFavorites } from '@/lib/favorites'

export const Route = createFileRoute('/favorites')({
  head: () => ({ meta: [{ title: 'Favorites — CasaNest' }] }),
  component: Favorites,
})

function Favorites() {
  const ids = useFavorites()
  const saved = designs.filter((d) => ids.includes(d.id))
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16">
      <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Your collection</p>
      <h1 className="font-display text-5xl sm:text-6xl mt-4">Favorites</h1>
      {saved.length ? (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((d) => <DesignCard key={d.id} design={d} />)}
        </div>
      ) : (
        <div className="mt-12 py-24 text-center bg-cream">
          <Heart className="size-8 mx-auto text-gold" strokeWidth={1.4} />
          <p className="font-display text-3xl mt-4">Nothing saved yet</p>
          <p className="text-sm text-charcoal/60 mt-2">Tap the heart on any design to build your collection.</p>
          <Link to="/homes" className="inline-block mt-8 px-7 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase">Explore designs</Link>
        </div>
      )}
    </div>
  )
}
