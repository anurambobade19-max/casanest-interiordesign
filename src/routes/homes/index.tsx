import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo } from 'react'
import { DesignCard } from '@/components/DesignCard'
import { designs, getDesigner, getHomeType, getStyle, homeTypes, styles } from '@/data/fixtures'

type HomesSearch = {
  q?: string
  type?: string
  style?: string
  size?: string
  sort?: 'popular' | 'size-asc' | 'size-desc'
}

const sizeBands = [
  { id: 'lt1500', label: 'Under 1,500', min: 0, max: 1499 },
  { id: '1500-3500', label: '1,500 – 3,500', min: 1500, max: 3500 },
  { id: '3500-8000', label: '3,500 – 8,000', min: 3501, max: 8000 },
  { id: 'gt8000', label: '8,000+', min: 8001, max: Infinity },
]

export const Route = createFileRoute('/homes/')({
  validateSearch: (s: Record<string, unknown>): HomesSearch => ({
    q: typeof s.q === 'string' && s.q ? s.q : undefined,
    type: typeof s.type === 'string' && s.type ? s.type : undefined,
    style: typeof s.style === 'string' && s.style ? s.style : undefined,
    size: typeof s.size === 'string' && s.size ? s.size : undefined,
    sort: s.sort === 'size-asc' || s.sort === 'size-desc' ? s.sort : undefined,
  }),
  head: () => ({ meta: [{ title: 'Explore Homes — CasaNest' }] }),
  component: ExploreHomes,
})

/** Lightweight keyword search across titles, styles, materials, rooms and designers. */
function matches(q: string, d: (typeof designs)[number]) {
  const style = getStyle(d.styleId)!
  const haystack = [
    d.title,
    d.configuration,
    d.budget,
    getHomeType(d.homeType)!.name,
    style.name,
    style.mood,
    ...style.materials,
    ...d.rooms.map((r) => r.room),
    getDesigner(d.designerId)?.name ?? '',
  ]
    .join(' ')
    .toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => haystack.includes(w.replace(/s$/, '')))
}

function ExploreHomes() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/homes/' })
  const set = (patch: Partial<HomesSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true, resetScroll: false })

  const results = useMemo(() => {
    const band = sizeBands.find((b) => b.id === search.size)
    const list = designs.filter(
      (d) =>
        (!search.type || d.homeType === search.type) &&
        (!search.style || d.styleId === search.style) &&
        (!band || (d.sqft >= band.min && d.sqft <= band.max)) &&
        (!search.q || matches(search.q, d)),
    )
    if (search.sort === 'size-asc') return [...list].sort((a, b) => a.sqft - b.sqft)
    if (search.sort === 'size-desc') return [...list].sort((a, b) => b.sqft - a.sqft)
    return [...list].sort((a, b) => b.likes - a.likes)
  }, [search])

  const activeCount = [search.type, search.style, search.size, search.q].filter(Boolean).length

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16">
      <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Explore homes</p>
      <h1 className="font-display text-5xl sm:text-6xl mt-4">
        {search.type ? getHomeType(search.type)?.name : 'Every home,'}{' '}
        <span className="italic text-walnut">{search.type ? 'collection' : 'beautifully considered'}</span>
      </h1>

      <div className="mt-10 flex flex-col lg:flex-row gap-3">
        <label className="flex items-center gap-3 flex-1 bg-cream px-5 border border-transparent focus-within:border-gold transition-colors">
          <Search className="size-4 text-taupe" />
          <input
            defaultValue={search.q}
            key={search.q ?? ''}
            onChange={(e) => set({ q: e.target.value || undefined })}
            placeholder="Search by style, room, material or designer…"
            className="w-full py-4 bg-transparent outline-none text-sm placeholder:text-taupe"
          />
        </label>
        <select
          value={search.sort ?? 'popular'}
          onChange={(e) => set({ sort: e.target.value === 'popular' ? undefined : (e.target.value as HomesSearch['sort']) })}
          className="bg-cream px-5 py-4 text-sm outline-none"
        >
          <option value="popular">Most saved</option>
          <option value="size-asc">Size: small to large</option>
          <option value="size-desc">Size: large to small</option>
        </select>
      </div>

      <div className="mt-8 space-y-4">
        <FilterRow label="Home">
          <Chip active={!search.type} onClick={() => set({ type: undefined })}>All</Chip>
          {homeTypes.map((h) => (
            <Chip key={h.id} active={search.type === h.id} onClick={() => set({ type: h.id })}>{h.name}</Chip>
          ))}
        </FilterRow>
        <FilterRow label="Style">
          <Chip active={!search.style} onClick={() => set({ style: undefined })}>All</Chip>
          {styles.map((s) => (
            <Chip key={s.id} active={search.style === s.id} onClick={() => set({ style: s.id })}>{s.name}</Chip>
          ))}
        </FilterRow>
        <FilterRow label="Sq. ft.">
          <Chip active={!search.size} onClick={() => set({ size: undefined })}>Any</Chip>
          {sizeBands.map((b) => (
            <Chip key={b.id} active={search.size === b.id} onClick={() => set({ size: b.id })}>{b.label}</Chip>
          ))}
        </FilterRow>
      </div>

      <div className="mt-10 mb-8 flex items-center justify-between border-t border-sand pt-6">
        <p className="text-sm text-charcoal/70 flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          <span className="font-medium text-charcoal">{results.length}</span> design concepts
        </p>
        {activeCount > 0 && (
          <Link to="/homes" className="text-xs tracking-[0.18em] uppercase text-walnut flex items-center gap-1.5">
            <X className="size-3.5" /> Clear filters
          </Link>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d) => <DesignCard key={d.id} design={d} />)}
        </div>
      ) : (
        <div className="py-24 text-center bg-cream">
          <p className="font-display text-3xl">No concepts match yet</p>
          <p className="text-sm text-charcoal/60 mt-3">Try fewer filters or a broader search term.</p>
        </div>
      )}
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-16 shrink-0 text-[0.65rem] tracking-[0.22em] uppercase text-taupe">{label}</span>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">{children}</div>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-2 text-xs tracking-wide border transition-colors ${
        active ? 'bg-charcoal text-ivory border-charcoal' : 'border-sand hover:border-walnut text-charcoal/80'
      }`}
    >
      {children}
    </button>
  )
}
