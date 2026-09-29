import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Camera, MessageCircle, Palette, Ruler, Search, Sparkles, Star } from 'lucide-react'
import { useState } from 'react'
import { DesignCard } from '@/components/DesignCard'
import {
  designers,
  designs,
  formatSqft,
  homeTypes,
  img,
  rooms,
  scaledRoomSizes,
  styles,
} from '@/data/fixtures'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <HomeTypes />
      <Featured />
      <RoomExplorer />
      <StyleStrip />
      <CasaAITeaser />
      <DesignerRow />
      <ConsultCTA />
    </>
  )
}

function Hero() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden -mt-px">
      <img
        src={img('hero', 2000)}
        alt="Double-height CasaNest living room at golden hour"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl w-full px-5 lg:px-8 pb-20 pt-40">
        <div className="max-w-2xl rise">
          <p className="eyebrow text-gold-light! flex items-center gap-3"><span className="gold-rule" />Interior design inspiration</p>
          <h1 className="font-display text-ivory text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mt-6">
            Where every space <span className="italic text-gold-light">finds its style.</span>
          </h1>
          <p className="text-ivory/80 text-base sm:text-lg mt-6 max-w-xl leading-relaxed font-light">
            Explore {designs.length}+ curated design concepts for apartments, villas, penthouses and mansions —
            with real square-footage plans, 50+ photo galleries and walkthrough films for every home.
          </p>
        </div>
        <form
          className="rise mt-10 max-w-3xl bg-ivory/95 backdrop-blur p-2 flex flex-col sm:flex-row gap-2 shadow-2xl"
          style={{ animationDelay: '0.2s' }}
          onSubmit={(e) => {
            e.preventDefault()
            navigate({ to: '/homes', search: { q: q || undefined, type: type || undefined } })
          }}
        >
          <label className="flex items-center gap-3 flex-1 px-4">
            <Search className="size-4 text-taupe shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “Japandi bedroom” or “marble kitchen”"
              className="w-full py-3 bg-transparent outline-none text-sm placeholder:text-taupe"
            />
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-3 bg-cream text-sm outline-none sm:border-l border-sand"
          >
            <option value="">All homes</option>
            {homeTypes.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <button className="px-8 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase hover:bg-walnut transition-colors">
            Search
          </button>
        </form>
        <div className="rise mt-12 flex flex-wrap gap-x-12 gap-y-4 text-ivory" style={{ animationDelay: '0.35s' }}>
          {[
            [String(designs.length), 'Design concepts'],
            ['6', 'Home categories'],
            ['50+', 'Photos per design'],
            [String(designers.length), 'Featured designers'],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-3xl">{n}</p>
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-ivory/60 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHead({ eyebrow, title, link }: { eyebrow: string; title: React.ReactNode; link?: { to: '/homes' | '/styles' | '/designers'; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
      <div>
        <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />{eyebrow}</p>
        <h2 className="font-display text-4xl sm:text-5xl mt-4 max-w-2xl leading-tight">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-walnut">
          {link.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}

function HomeTypes() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-28">
      <SectionHead
        eyebrow="Explore homes"
        title={<>Designed for every <span className="italic text-walnut">scale of living</span></>}
        link={{ to: '/homes', label: 'All designs' }}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {homeTypes.map((h, i) => (
          <Link
            key={h.id}
            to="/homes/$type"
            params={{ type: h.id }}
            className={`group relative overflow-hidden bg-sand ${i === 0 || i === 5 ? 'lg:row-span-2 aspect-[4/5] lg:aspect-auto' : 'aspect-[4/3]'}`}
          >
            <img
              src={img(h.image, 900, { h: i === 0 || i === 5 ? 1100 : 680 })}
              alt={h.name}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
              <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold-light">
                {formatSqft(h.sqftRange[0])} – {formatSqft(h.sqftRange[1])}
              </p>
              <div className="flex items-end justify-between gap-4 mt-2">
                <div>
                  <h3 className="font-display text-3xl">{h.name}</h3>
                  <p className="text-sm text-ivory/75 mt-1">{h.tagline}</p>
                </div>
                <span className="grid place-items-center size-11 shrink-0 rounded-full border border-ivory/40 group-hover:bg-gold group-hover:border-gold transition-colors">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Featured() {
  const picks = ['penthouses-contemporary-luxe', 'villas-mediterranean', 'apartments-japandi', 'mansions-classic-european', 'bungalows-tropical-modern', 'row-houses-art-deco']
    .map((id) => designs.find((d) => d.id === id)!)
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-32">
      <SectionHead
        eyebrow="Editor’s selection"
        title={<>This season’s most <span className="italic text-walnut">saved</span> interiors</>}
        link={{ to: '/homes', label: 'Explore all' }}
      />
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((d) => (
          <DesignCard key={d.id} design={d} />
        ))}
      </div>
    </section>
  )
}

function RoomExplorer() {
  const [homeId, setHomeId] = useState(homeTypes[0].id)
  const [roomId, setRoomId] = useState(rooms[0].id)
  const home = homeTypes.find((h) => h.id === homeId)!
  const room = rooms.find((r) => r.id === roomId)!
  const sizes = scaledRoomSizes(room, home)
  return (
    <section className="mt-32 bg-cream">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 grid gap-14 lg:grid-cols-2 items-center">
        <div>
          <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Room-size explorer</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
            Find designs that fit <span className="italic text-walnut">your square footage</span>
          </h2>
          <p className="text-charcoal/70 mt-5 leading-relaxed max-w-lg">
            Pick your home and room to see realistic sizes, dimensions and the concepts that suit them.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {homeTypes.map((h) => (
              <button
                key={h.id}
                onClick={() => setHomeId(h.id)}
                className={`px-4 py-2 text-xs tracking-wider border transition-colors ${h.id === homeId ? 'bg-charcoal text-ivory border-charcoal' : 'border-beige hover:border-walnut'}`}
              >
                {h.name}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => setRoomId(r.id)}
                className={`px-4 py-2 text-xs tracking-wider transition-colors ${r.id === roomId ? 'bg-gold text-ivory' : 'bg-ivory hover:bg-sand'}`}
              >
                {r.name}
              </button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sizes.map((s) => (
              <Link
                key={s.label}
                to="/spaces"
                search={{ room: room.id, home: home.id }}
                className="bg-ivory p-4 border border-transparent hover:border-gold transition-colors"
              >
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">{s.label}</p>
                <p className="font-display text-2xl mt-2">{s.sqft}</p>
                <p className="text-xs text-charcoal/60">sq. ft. · {s.dims}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            key={room.id}
            src={img(room.image, 1000, { h: 800 })}
            alt={room.name}
            className="rise w-full aspect-[5/4] object-cover shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-ivory p-5 shadow-xl max-w-xs hidden sm:block">
            <p className="eyebrow">{home.singular} · {room.name}</p>
            <p className="text-sm text-charcoal/75 mt-2">{room.blurb}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function StyleStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-32">
      <SectionHead
        eyebrow="Styles"
        title={<>Twelve signature <span className="italic text-walnut">design languages</span></>}
        link={{ to: '/styles', label: 'All styles' }}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {styles.map((s) => (
          <Link
            key={s.id}
            to="/homes"
            search={{ style: s.id }}
            className="group bg-cream p-5 hover:bg-sand transition-colors"
          >
            <div className="flex h-14 overflow-hidden">
              {s.palette.map((c) => (
                <span key={c} className="flex-1 transition-all group-hover:first:flex-[2]" style={{ background: c }} />
              ))}
            </div>
            <p className="font-display text-lg mt-4 leading-tight">{s.name}</p>
            <p className="text-xs text-charcoal/60 mt-1">{s.mood}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function CasaAITeaser() {
  return (
    <section className="mt-32 bg-charcoal text-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 grid gap-16 lg:grid-cols-2 items-center">
        <div>
          <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Casa<span className="text-ivory">AI</span></p>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
            Your personal interior <span className="italic text-gold-light">design intelligence</span>
          </h2>
          <p className="text-ivory/70 mt-5 leading-relaxed max-w-lg">
            Upload a photo of any room. CasaAI reads the space, proposes a redesign, recommends colours and materials,
            and helps you plan layouts for your exact square footage.
          </p>
          <ul className="mt-10 grid sm:grid-cols-2 gap-6">
            {[
              [Camera, 'Room-photo analysis', 'Detects layout, light and existing finishes.'],
              [Sparkles, 'Redesign suggestions', 'Style-matched concepts for your space.'],
              [Palette, 'Colour & materials', 'Curated palettes, finishes and textures.'],
              [Ruler, 'Sq. ft. assistant', 'Furniture sizing and spatial planning.'],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Camera
              return (
                <li key={t as string} className="flex gap-4">
                  <span className="grid place-items-center size-10 shrink-0 border border-gold/40 text-gold-light"><I className="size-4" /></span>
                  <div>
                    <p className="font-medium text-sm">{t as string}</p>
                    <p className="text-xs text-ivory/55 mt-1">{d as string}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <Link to="/casa-ai" className="inline-flex items-center gap-3 mt-12 px-7 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase hover:bg-gold-light transition-colors">
            Meet CasaAI <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="relative">
            <img src={img('living', 1000, { h: 700 })} alt="Room analysed by CasaAI" className="w-full aspect-[10/7] object-cover opacity-90" />
            <div className="absolute top-[22%] left-[30%] size-3 rounded-full bg-gold ring-8 ring-gold/25 animate-pulse" />
            <div className="absolute top-[58%] left-[62%] size-3 rounded-full bg-gold ring-8 ring-gold/25 animate-pulse" />
          </div>
          <div className="absolute -bottom-10 right-4 sm:-right-4 w-72 bg-ivory text-charcoal p-5 shadow-2xl">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold flex items-center gap-2"><Sparkles className="size-3" /> CasaAI analysis</p>
            <p className="text-sm mt-3"><span className="font-medium">Detected:</span> Living room · ~280 sq. ft. · south light</p>
            <p className="text-sm mt-2"><span className="font-medium">Suggest:</span> Warm Japandi with ash timber and clay plaster</p>
            <div className="flex mt-4 h-6">
              {styles[1].palette.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}
            </div>
          </div>
          <div className="absolute -top-6 left-4 sm:-left-6 bg-espresso/95 border border-gold/30 p-4 max-w-60 hidden sm:block">
            <p className="flex items-center gap-2 text-xs text-gold-light"><MessageCircle className="size-3.5" /> Ask CasaAI</p>
            <p className="text-xs text-ivory/80 mt-2">“What sofa size fits a 14 × 20 ft living room?”</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function DesignerRow() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-32">
      <SectionHead
        eyebrow="Designers"
        title={<>Studios behind the <span className="italic text-walnut">spaces you love</span></>}
        link={{ to: '/designers', label: 'All designers' }}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designers.slice(0, 3).map((d) => (
          <Link key={d.id} to="/designers" hash={d.id} className="group border border-sand p-7 hover:border-gold transition-colors bg-ivory">
            <div className="flex items-center gap-4">
              <span className="grid place-items-center size-14 rounded-full bg-gradient-to-br from-beige to-walnut text-ivory font-display text-xl">
                {d.name.split(' ').map((p) => p[0]).join('')}
              </span>
              <div>
                <p className="font-display text-xl">{d.name}</p>
                <p className="text-xs text-charcoal/60">{d.studio} · {d.city}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal/70 mt-5 leading-relaxed">{d.bio}</p>
            <div className="flex items-center gap-5 mt-6 pt-5 border-t border-sand text-xs text-charcoal/60">
              <span className="flex items-center gap-1 text-gold"><Star className="size-3.5" fill="currentColor" />{d.rating}</span>
              <span>{d.projects} projects</span>
              <span>{d.years} yrs</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function ConsultCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-32">
      <div className="relative overflow-hidden">
        <img src={img('dining', 1800, { h: 700 })} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-espresso/75" />
        <div className="relative px-8 sm:px-16 py-20 text-center text-ivory">
          <p className="eyebrow text-gold-light!">Private consultation</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 max-w-2xl mx-auto leading-tight">
            Ready to bring your <span className="italic text-gold-light">dream space</span> to life?
          </h2>
          <p className="text-ivory/75 mt-5 max-w-xl mx-auto">
            Share your floor plan and style, and a CasaNest designer will craft a concept tailored to your home.
          </p>
          <Link to="/designers" className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-ivory text-charcoal text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-ivory transition-colors">
            Choose a designer <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
