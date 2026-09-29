import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Ruler } from 'lucide-react'
import { useState } from 'react'
import { DesignCard } from '@/components/DesignCard'
import { designs, getHomeType, getRoom, homeTypes, img, rooms, scaledRoomSizes } from '@/data/fixtures'

type SpacesSearch = { room?: string; home?: string }

export const Route = createFileRoute('/spaces')({
  validateSearch: (s: Record<string, unknown>): SpacesSearch => ({
    room: typeof s.room === 'string' ? s.room : undefined,
    home: typeof s.home === 'string' ? s.home : undefined,
  }),
  head: () => ({ meta: [{ title: 'Spaces & Room Sizes — CasaNest' }] }),
  component: Spaces,
})

function Spaces() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/spaces' })
  const room = getRoom(search.room ?? '') ?? rooms[0]
  const home = getHomeType(search.home ?? '') ?? homeTypes[0]
  const sizes = scaledRoomSizes(room, home)
  const [mySize, setMySize] = useState<number | null>(null)
  const size = mySize ?? sizes[1].sqft
  const min = Math.round(sizes[0].sqft * 0.7)
  const max = Math.round(sizes[3].sqft * 1.3)
  const band = [...sizes].reverse().find((s) => size >= s.sqft) ?? sizes[0]
  const side = Math.sqrt(size)
  const concepts = designs
    .filter((d) => d.homeType === home.id && d.rooms.some((r) => r.room === room.id))
    .sort((a, b) => {
      const ra = a.rooms.find((r) => r.room === room.id)!.sqft
      const rb = b.rooms.find((r) => r.room === room.id)!.sqft
      return Math.abs(ra - size) - Math.abs(rb - size)
    })
    .slice(0, 6)

  const set = (patch: SpacesSearch) => {
    setMySize(null)
    navigate({ search: (p) => ({ ...p, ...patch }), replace: true, resetScroll: false })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16">
      <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Spaces</p>
      <h1 className="font-display text-5xl sm:text-6xl mt-4">Room-size <span className="italic text-walnut">explorer</span></h1>
      <p className="text-charcoal/70 mt-4 max-w-2xl">Choose a room and home type, then set your own square footage to see how the space plans and which concepts fit best.</p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {rooms.map((r) => (
          <button key={r.id} onClick={() => set({ room: r.id })} className={`group text-left ${r.id === room.id ? '' : 'opacity-70 hover:opacity-100'}`}>
            <div className={`overflow-hidden aspect-[4/3] ring-2 ring-offset-2 ring-offset-ivory ${r.id === room.id ? 'ring-gold' : 'ring-transparent'}`}>
              <img src={img(r.image, 400, { h: 300 })} alt={r.name} className="size-full object-cover" loading="lazy" />
            </div>
            <p className="font-display text-lg mt-2">{r.name}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {homeTypes.map((h) => (
          <button key={h.id} onClick={() => set({ home: h.id })} className={`px-4 py-2 text-xs border ${h.id === home.id ? 'bg-charcoal text-ivory border-charcoal' : 'border-sand hover:border-walnut'}`}>
            {h.name}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 bg-cream p-8 sm:p-12">
        <div>
          <p className="eyebrow">{home.singular} · {room.name}</p>
          <p className="font-display text-6xl mt-4">{size}<span className="text-xl font-sans text-charcoal/50 ml-2">sq. ft.</span></p>
          <p className="text-sm text-charcoal/60 mt-2">Closest to a <span className="text-walnut font-medium">{band.label}</span> {room.name.toLowerCase()} (~{band.dims})</p>
          <input
            type="range"
            min={min}
            max={max}
            step={5}
            value={size}
            onChange={(e) => setMySize(Number(e.target.value))}
            className="w-full mt-8 accent-[#b8955a]"
            aria-label="Your room size in square feet"
          />
          <div className="flex justify-between text-xs text-charcoal/50 mt-1"><span>{min}</span><span>{max}</span></div>
          <div className="grid grid-cols-4 gap-2 mt-8">
            {sizes.map((s) => (
              <button key={s.label} onClick={() => setMySize(s.sqft)} className={`p-3 text-left ${band.label === s.label ? 'bg-charcoal text-ivory' : 'bg-ivory'}`}>
                <p className="text-[0.6rem] tracking-[0.18em] uppercase opacity-70">{s.label}</p>
                <p className="font-display text-xl">{s.sqft}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square grid place-items-center">
            <div
              className="border-2 border-dashed border-walnut/60 bg-ivory grid place-items-center transition-all duration-500"
              style={{ width: `${Math.min(100, (side / Math.sqrt(max)) * 100)}%`, height: `${Math.min(100, (side / Math.sqrt(max)) * 100 * 0.8)}%` }}
            >
              <span className="text-xs text-walnut flex items-center gap-1.5"><Ruler className="size-3.5" /> ≈ {Math.round(side * 1.12)}′ × {Math.round(side / 1.12)}′</span>
            </div>
          </div>
          <p className="text-xs text-charcoal/50 mt-3">Plan footprint scaled to the largest option</p>
        </div>
      </div>

      <h2 className="font-display text-3xl mt-16 mb-8">Best-fit {room.name.toLowerCase()} concepts</h2>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {concepts.map((d) => <DesignCard key={d.id} design={d} />)}
      </div>
    </div>
  )
}
