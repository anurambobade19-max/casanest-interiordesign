import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowRight, Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { DesignCard } from '@/components/DesignCard'
import { type HomeType, designs, formatSqft, getHomeType, homeTypes, img, rooms, scaledRoomSizes, styles } from '@/data/fixtures'

export const Route = createFileRoute('/homes/$type')({
  loader: ({ params }) => {
    const home = getHomeType(params.type)
    if (!home) throw notFound()
    return { home }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.home.name ?? 'Homes'} Interior Designs — CasaNest` }],
  }),
  component: HomeTypePage,
})

function HomeTypePage() {
  const { home } = Route.useLoaderData()
  // Keyed so filters reset when moving between home categories.
  return <HomeTypeView key={home.id} home={home} />
}

function HomeTypeView({ home }: { home: HomeType }) {
  const [config, setConfig] = useState<string | null>(null)
  const [styleId, setStyleId] = useState<string | null>(null)
  const [roomId, setRoomId] = useState(rooms[0].id)
  const concepts = designs.filter(
    (d) => d.homeType === home.id && (!config || d.configuration === config) && (!styleId || d.styleId === styleId),
  )
  const room = rooms.find((r) => r.id === roomId)!

  return (
    <>
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <img src={img(home.image, 2000)} alt={home.name} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
        <div className="relative mx-auto max-w-7xl w-full px-5 lg:px-8 pb-16 text-ivory rise">
          <nav className="text-xs tracking-[0.15em] uppercase text-ivory/60 flex gap-2">
            <Link to="/homes" className="hover:text-gold-light">Homes</Link> / <span className="text-gold-light">{home.name}</span>
          </nav>
          <h1 className="font-display text-6xl sm:text-7xl mt-4">{home.name}</h1>
          <p className="font-display italic text-2xl text-gold-light mt-2">{home.tagline}</p>
          <p className="max-w-2xl text-ivory/75 mt-5 leading-relaxed">{home.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 -mt-10 relative">
        <div className="bg-ivory shadow-xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-sand">
          {[
            ['Size range', `${home.sqftRange[0].toLocaleString('en-IN')} – ${home.sqftRange[1].toLocaleString('en-IN')}`],
            ['Layouts', String(home.configurations.length)],
            ['Design concepts', String(designs.filter((d) => d.homeType === home.id).length)],
            ['Styles', String(styles.length)],
          ].map(([l, v]) => (
            <div key={l} className="p-6">
              <p className="text-[0.65rem] tracking-[0.22em] uppercase text-taupe">{l}</p>
              <p className="font-display text-2xl mt-1">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-20">
        <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Choose your layout</p>
        <h2 className="font-display text-4xl mt-4">Realistic square-footage options</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <button
            onClick={() => setConfig(null)}
            className={`p-5 text-left border transition-colors ${!config ? 'border-charcoal bg-charcoal text-ivory' : 'border-sand hover:border-walnut'}`}
          >
            <p className="text-[0.65rem] tracking-[0.22em] uppercase opacity-70">All layouts</p>
            <p className="font-display text-2xl mt-1">View all</p>
          </button>
          {home.configurations.map((c) => (
            <button
              key={c.label}
              onClick={() => setConfig(c.label)}
              className={`p-5 text-left border transition-colors ${config === c.label ? 'border-charcoal bg-charcoal text-ivory' : 'border-sand hover:border-walnut'}`}
            >
              <p className="text-[0.65rem] tracking-[0.22em] uppercase opacity-70">{c.label}</p>
              <p className="font-display text-2xl mt-1">{formatSqft(c.sqft)}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />{concepts.length} concepts</p>
            <h2 className="font-display text-4xl mt-4">{home.singular} design concepts</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setStyleId(null)}
              className={`shrink-0 px-4 py-2 text-xs border ${!styleId ? 'bg-charcoal text-ivory border-charcoal' : 'border-sand'}`}
            >
              All styles
            </button>
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyleId(s.id)}
                className={`shrink-0 px-4 py-2 text-xs border ${styleId === s.id ? 'bg-charcoal text-ivory border-charcoal' : 'border-sand hover:border-walnut'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
        {concepts.length ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {concepts.map((d) => <DesignCard key={d.id} design={d} />)}
          </div>
        ) : (
          <p className="mt-10 py-16 text-center bg-cream text-charcoal/60">No concepts for this combination yet.</p>
        )}
      </section>

      <section className="mt-24 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
          <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Room by room</p>
          <h2 className="font-display text-4xl mt-4">Room sizes in a typical {home.singular.toLowerCase()}</h2>
          <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar">
            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => setRoomId(r.id)}
                className={`shrink-0 px-5 py-2.5 text-xs tracking-wider ${r.id === roomId ? 'bg-gold text-ivory' : 'bg-ivory hover:bg-sand'}`}
              >
                {r.name}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch">
            <img key={room.id} src={img(room.image, 1100, { h: 720 })} alt={room.name} className="rise w-full h-full min-h-72 object-cover" />
            <div className="flex flex-col">
              <p className="font-display text-3xl">{room.name}</p>
              <p className="text-charcoal/70 mt-2">{room.blurb}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {scaledRoomSizes(room, home).map((s) => (
                  <div key={s.label} className="bg-ivory p-5">
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">{s.label}</p>
                    <p className="font-display text-3xl mt-1">{s.sqft}<span className="text-sm text-charcoal/50 font-sans ml-1">sq. ft.</span></p>
                    <p className="text-xs text-charcoal/55 flex items-center gap-1 mt-1"><Maximize2 className="size-3" /> approx. {s.dims}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/spaces"
                search={{ room: room.id, home: home.id }}
                className="mt-auto pt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-walnut"
              >
                Explore {room.name.toLowerCase()} ideas <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-20">
        <p className="eyebrow">Other homes</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {homeTypes.filter((h) => h.id !== home.id).map((h) => (
            <Link key={h.id} to="/homes/$type" params={{ type: h.id }} className="px-5 py-3 border border-sand hover:border-gold font-display text-lg">
              {h.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
