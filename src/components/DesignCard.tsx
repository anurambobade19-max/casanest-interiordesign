import { Link } from '@tanstack/react-router'
import { Images, PlayCircle } from 'lucide-react'
import { type Design, formatSqft, getHomeType, getStyle, img } from '@/data/fixtures'
import { FavoriteButton } from './FavoriteButton'

export function DesignCard({ design, size = 'md' }: { design: Design; size?: 'md' | 'lg' }) {
  const style = getStyle(design.styleId)!
  const home = getHomeType(design.homeType)!
  return (
    <Link
      to="/designs/$designId"
      params={{ designId: design.id }}
      className="group block"
    >
      <div className={`relative overflow-hidden rounded-sm bg-sand ${size === 'lg' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <img
          src={img(design.cover, 800, { h: size === 'lg' ? 1000 : 600 })}
          alt={design.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-80" />
        <FavoriteButton id={design.id} className="absolute top-3 right-3" />
        <span className="absolute top-3 left-3 bg-ivory/90 px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase text-walnut">
          {home.singular}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-4 text-ivory/90 text-xs">
          <span className="flex items-center gap-1.5"><Images className="size-3.5" />{design.photoCount}</span>
          <span className="flex items-center gap-1.5"><PlayCircle className="size-3.5" />{design.videoCount}</span>
          <span className="ml-auto">{formatSqft(design.sqft)}</span>
        </div>
      </div>
      <div className="pt-4">
        <p className="eyebrow">{style.name} · {design.configuration}</p>
        <h3 className="font-display text-xl mt-1.5 text-charcoal group-hover:text-walnut transition-colors">
          {design.title}
        </h3>
      </div>
    </Link>
  )
}
