import { Heart } from 'lucide-react'
import { toggleFavorite, useFavorites } from '@/lib/favorites'

export function FavoriteButton({ id, className = '' }: { id: string; className?: string }) {
  const favorites = useFavorites()
  const active = favorites.includes(id)
  return (
    <button
      type="button"
      aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(id)
      }}
      className={`grid place-items-center size-10 rounded-full backdrop-blur-md transition-all duration-300 ${
        active ? 'bg-gold text-ivory scale-105' : 'bg-ivory/80 text-charcoal hover:bg-ivory'
      } ${className}`}
    >
      <Heart className="size-4" fill={active ? 'currentColor' : 'none'} strokeWidth={1.6} />
    </button>
  )
}
