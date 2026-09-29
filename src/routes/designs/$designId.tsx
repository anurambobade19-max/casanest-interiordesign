import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Images, LayoutGrid, Mail, MessageCircle, Play, PlayCircle, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DesignCard } from '@/components/DesignCard'
import { FavoriteButton } from '@/components/FavoriteButton'
import {
  type Design,
  type MediaItem,
  designs,
  formatSqft,
  getDesign,
  getDesigner,
  getHomeType,
  getMedia,
  getMixedFeed,
  getRoom,
  getStyle,
  img,
} from '@/data/fixtures'

export const Route = createFileRoute('/designs/$designId')({
  loader: ({ params }) => {
    const design = getDesign(params.designId)
    if (!design) throw notFound()
    return { design }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.design.title ?? 'Design'} — CasaNest` }],
  }),
  component: DesignPage,
})

function DesignPage() {
  const { design } = Route.useLoaderData()
  return <DesignView key={design.id} design={design} />
}

type Tab = 'photos' | 'videos' | 'feed'
const PAGE = 12

function DesignView({ design }: { design: Design }) {
  const style = getStyle(design.styleId)!
  const home = getHomeType(design.homeType)!
  const designer = getDesigner(design.designerId)!
  const { photos, videos } = getMedia(design)
  const feed = getMixedFeed(design)
  const [tab, setTab] = useState<Tab>('photos')
  const [shown, setShown] = useState(PAGE)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const items = tab === 'photos' ? photos : tab === 'videos' ? videos : feed
  const similar = designs.filter((d) => d.id !== design.id && (d.styleId === design.styleId || d.homeType === design.homeType)).slice(0, 3)

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-10">
        <nav className="text-xs tracking-[0.15em] uppercase text-charcoal/50 flex flex-wrap gap-2">
          <Link to="/homes" className="hover:text-walnut">Homes</Link> /
          <Link to="/homes/$type" params={{ type: home.id }} className="hover:text-walnut">{home.name}</Link> /
          <span className="text-walnut">{design.title}</span>
        </nav>
        <div className="mt-6 grid gap-3 lg:grid-cols-[2fr_1fr] lg:grid-rows-2 lg:h-[620px]">
          <button onClick={() => { setTab('photos'); setLightbox(0) }} className="relative lg:row-span-2 overflow-hidden group">
            <img src={img(photos[0].image, 1600, { h: 1100 })} alt={design.title} className="size-full object-cover aspect-[4/3] lg:aspect-auto transition-transform duration-[1.4s] group-hover:scale-[1.03]" />
          </button>
          <button onClick={() => { setTab('photos'); setLightbox(1) }} className="hidden lg:block overflow-hidden group">
            <img src={img(photos[1].image, 800, { h: 600 })} alt="" className="size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
          </button>
          <button onClick={() => { setTab('videos'); setLightbox(0) }} className="relative hidden lg:block overflow-hidden group">
            <img src={img(videos[0].image, 800, { h: 600, position: videos[0].position })} alt="" className="size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
            <span className="absolute inset-0 bg-charcoal/40 grid place-items-center">
              <span className="grid place-items-center size-16 rounded-full bg-ivory/90 text-charcoal"><Play className="size-6 ml-1" fill="currentColor" /></span>
            </span>
            <span className="absolute bottom-4 left-4 text-ivory text-xs tracking-[0.2em] uppercase">Watch walkthrough · {videos[0].duration}</span>
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-12 grid gap-14 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="eyebrow">{style.name} · {home.singular}</p>
          <div className="flex items-start justify-between gap-6 mt-3">
            <h1 className="font-display text-5xl leading-tight">{design.title}</h1>
            <FavoriteButton id={design.id} className="border border-sand shrink-0 mt-2" />
          </div>
          <p className="text-lg text-charcoal/75 mt-5 leading-relaxed font-light">{design.summary}</p>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 border-y border-sand divide-x divide-sand">
            {[
              ['Area', formatSqft(design.sqft)],
              ['Layout', design.configuration],
              ['Tier', design.budget],
              ['Saved', design.likes.toLocaleString('en-IN')],
            ].map(([k, v]) => (
              <div key={k} className="py-5 px-4 first:pl-0">
                <dt className="text-[0.65rem] tracking-[0.22em] uppercase text-taupe">{k}</dt>
                <dd className="font-display text-xl mt-1">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl">Design highlights</h2>
              <ul className="mt-4 space-y-3">
                {design.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-charcoal/75"><span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" />{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl">Palette & materials</h2>
              <div className="flex mt-4 h-16">
                {style.palette.map((c) => (
                  <div key={c} className="flex-1 flex items-end p-1.5" style={{ background: c }}>
                    <span className="text-[0.55rem] font-mono mix-blend-difference text-ivory">{c}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {style.materials.map((m) => <span key={m} className="px-3 py-1.5 bg-cream text-xs">{m}</span>)}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl">Room breakdown</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {design.rooms.map((r) => {
                const room = getRoom(r.room)!
                return (
                  <div key={r.room} className="flex items-center gap-4 bg-cream p-3">
                    <img src={img(room.image, 160, { h: 160 })} alt="" className="size-14 object-cover" />
                    <div>
                      <p className="text-sm font-medium">{room.name}</p>
                      <p className="text-xs text-charcoal/60">{formatSqft(r.sqft)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start space-y-4">
          <div className="border border-sand p-6 bg-ivory">
            <p className="eyebrow">Designed by</p>
            <div className="flex items-center gap-4 mt-4">
              <span className="grid place-items-center size-14 rounded-full bg-gradient-to-br from-beige to-walnut text-ivory font-display text-xl">
                {designer.name.split(' ').map((p) => p[0]).join('')}
              </span>
              <div>
                <p className="font-display text-xl">{designer.name}</p>
                <p className="text-xs text-charcoal/60">{designer.studio} · {designer.city}</p>
                <p className="text-xs text-gold flex items-center gap-1 mt-1"><Star className="size-3" fill="currentColor" /> {designer.rating} · {designer.projects} projects</p>
              </div>
            </div>
            <Link to="/designers" hash={designer.id} className="block text-center mt-6 px-5 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase hover:bg-walnut transition-colors">
              Book a consultation
            </Link>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link to="/designers" hash={designer.id} className="flex items-center justify-center gap-2 py-3 border border-sand text-xs hover:border-gold"><Mail className="size-3.5" /> Enquire</Link>
              <Link to="/designers" hash={designer.id} className="flex items-center justify-center gap-2 py-3 border border-sand text-xs hover:border-gold"><MessageCircle className="size-3.5" /> WhatsApp</Link>
            </div>
          </div>
          <Link to="/casa-ai" className="block bg-charcoal text-ivory p-6 group">
            <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gold-light">Casa<span className="text-ivory">AI</span></p>
            <p className="font-display text-xl mt-2">Adapt this look to your room</p>
            <p className="text-xs text-ivory/60 mt-2">Upload a photo and get a {style.name} redesign plan sized to your space.</p>
          </Link>
        </aside>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-5 lg:px-8 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-sand">
          <h2 className="font-display text-4xl pb-4">Gallery</h2>
          <div className="flex gap-6 text-sm">
            {([
              ['photos', Images, `Photos (${photos.length})`],
              ['videos', PlayCircle, `Videos (${videos.length})`],
              ['feed', LayoutGrid, 'Mixed feed'],
            ] as const).map(([id, Icon, label]) => (
              <button
                key={id}
                onClick={() => { setTab(id); setShown(PAGE) }}
                className={`flex items-center gap-2 pb-4 -mb-px border-b-2 transition-colors ${tab === id ? 'border-gold text-charcoal' : 'border-transparent text-charcoal/50 hover:text-charcoal'}`}
              >
                <Icon className="size-4" /> {label}
              </button>
            ))}
          </div>
        </div>
        <div className={`mt-8 grid gap-3 ${tab === 'videos' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {items.slice(0, shown).map((m, i) => (
            <MediaTile key={m.id} item={m} tall={tab !== 'videos' && i % 5 === 0} onOpen={() => setLightbox(i)} />
          ))}
        </div>
        {shown < items.length && (
          <div className="text-center mt-10">
            <button onClick={() => setShown((n) => n + PAGE * 2)} className="px-8 py-3.5 border border-charcoal text-xs tracking-[0.2em] uppercase hover:bg-charcoal hover:text-ivory transition-colors">
              Load more · {items.length - shown} remaining
            </button>
          </div>
        )}
      </section>

      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-24">
          <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />You may also love</p>
          <h2 className="font-display text-4xl mt-4 mb-10">Similar concepts</h2>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((d) => <DesignCard key={d.id} design={d} />)}
          </div>
        </section>
      )}

      {lightbox !== null && <Lightbox items={items} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}

function MediaTile({ item, tall, onOpen }: { item: MediaItem; tall: boolean; onOpen: () => void }) {
  const isVideo = item.kind === 'video'
  return (
    <button onClick={onOpen} className={`relative overflow-hidden group bg-sand ${tall ? 'row-span-2' : ''} ${isVideo ? 'aspect-video' : tall ? '' : 'aspect-square'}`}>
      <img
        src={img(item.image, 600, { h: isVideo ? 340 : tall ? 900 : 600, position: item.position })}
        alt={item.caption}
        loading="lazy"
        className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
      />
      {isVideo && (
        <span className="absolute inset-0 bg-charcoal/30 grid place-items-center">
          <span className="grid place-items-center size-12 rounded-full bg-ivory/90 text-charcoal"><Play className="size-4 ml-0.5" fill="currentColor" /></span>
          <span className="absolute bottom-2 right-2 bg-charcoal/80 text-ivory text-[0.65rem] px-2 py-0.5">{item.duration}</span>
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 p-3 text-left text-ivory text-xs bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        {item.caption}
      </span>
    </button>
  )
}

function Lightbox({ items, index, onChange, onClose }: { items: MediaItem[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const item = items[index]
  const go = (d: number) => onChange((index + d + items.length) % items.length)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  })
  return (
    <div className="fixed inset-0 z-50 bg-charcoal/95 flex flex-col" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between px-6 py-4 text-ivory/80 text-sm">
        <span>{index + 1} / {items.length} · {item.caption}</span>
        <button onClick={onClose} aria-label="Close" className="grid place-items-center size-10 hover:text-gold-light"><X className="size-5" /></button>
      </div>
      <div className="flex-1 relative flex items-center justify-center px-16 pb-10">
        <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 grid place-items-center size-12 rounded-full border border-ivory/30 text-ivory hover:bg-ivory/10"><ChevronLeft /></button>
        <div className="relative max-h-full">
          <img key={item.id} src={img(item.image, 1800, { position: item.position })} alt={item.caption} className="rise max-h-[78vh] w-auto object-contain" />
          {item.kind === 'video' && (
            <div className="absolute inset-0 grid place-items-center bg-charcoal/40">
              <div className="text-center text-ivory">
                <span className="grid place-items-center size-20 mx-auto rounded-full bg-ivory/90 text-charcoal"><Play className="size-8 ml-1" fill="currentColor" /></span>
                <p className="mt-4 text-sm text-ivory/80">{item.caption} · {item.duration}</p>
              </div>
            </div>
          )}
        </div>
        <button onClick={() => go(1)} aria-label="Next" className="absolute right-4 grid place-items-center size-12 rounded-full border border-ivory/30 text-ivory hover:bg-ivory/10"><ChevronRight /></button>
      </div>
    </div>
  )
}
