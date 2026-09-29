import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUp, Camera, Palette, Ruler, Sparkles, Upload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DesignCard } from '@/components/DesignCard'
import { designs, getRoom, img, rooms, styles } from '@/data/fixtures'

export const Route = createFileRoute('/casa-ai')({
  head: () => ({ meta: [{ title: 'CasaAI — Interior Design Intelligence · CasaNest' }] }),
  component: CasaAI,
})

type Msg = { role: 'user' | 'ai'; text: string }

/**
 * Preview responses. The live model (Netlify AI Gateway) replaces this in the
 * CasaAI milestone — see PLAN.md.
 */
function previewReply(q: string): string {
  const t = q.toLowerCase()
  const sqft = t.match(/(\d{2,5})\s*(sq|sqft|square)/)?.[1]
  if (sqft) {
    const n = Number(sqft)
    return `For about ${n} sq. ft., keep roughly 35–40% as clear circulation. A ${n < 200 ? '72–78″ loveseat' : n < 350 ? '84–96″ three-seater' : '110″+ sectional'} with a ${n < 200 ? '36″' : '48″'} coffee table will feel balanced.`
  }
  if (/colou?r|palette|paint/.test(t))
    return 'For a warm, elevated feel try ivory walls (#F4EFE6), a greige accent (#D9CBB5), walnut joinery and brushed-brass hardware. Add charcoal in small doses — a lamp base or a frame.'
  if (/material|floor|stone|wood/.test(t))
    return 'Honed travertine or wide-plank white oak underfoot, limewash or clay plaster on feature walls, and bouclé or linen upholstery will give depth without visual noise.'
  if (/sofa|furniture|bed|table/.test(t))
    return 'Allow 18″ between sofa and coffee table, 30–36″ walkways, and 24″ on either side of a bed. In smaller rooms, raised legs and rounded edges make pieces feel lighter.'
  return 'I can help with room analysis, redesign ideas, colours, materials and furniture sizing. Try “What palette suits a north-facing bedroom?” or “Sofa for 280 sq ft living room?”'
}

function CasaAI() {
  const [photo, setPhoto] = useState<string | null>(null)
  const [roomId, setRoomId] = useState(rooms[0].id)
  const [styleId, setStyleId] = useState(styles[1].id)
  const [analysed, setAnalysed] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'ai', text: 'Hello, I’m CasaAI. Ask me about layouts, colours, materials or what fits your square footage.' },
  ])
  const [input, setInput] = useState('')
  const chatEnd = useRef<HTMLDivElement>(null)
  const room = getRoom(roomId)!
  const style = styles.find((s) => s.id === styleId)!
  const matches = designs.filter((d) => d.styleId === styleId).slice(0, 3)

  useEffect(() => chatEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), [msgs])

  const send = (text: string) => {
    if (!text.trim()) return
    setMsgs((m) => [...m, { role: 'user', text }, { role: 'ai', text: previewReply(text) }])
    setInput('')
  }

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16">
      <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Casa<span className="text-charcoal">AI</span> · Preview</p>
      <h1 className="font-display text-5xl sm:text-6xl mt-4">Design intelligence <span className="italic text-walnut">for your space</span></h1>
      <p className="text-charcoal/70 mt-4 max-w-2xl">Upload a room photo, choose the look you love, and CasaAI drafts a redesign plan with colours, materials and sizing guidance.</p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="bg-cream p-6 sm:p-8">
          <label className="relative block aspect-[16/10] overflow-hidden cursor-pointer border-2 border-dashed border-beige hover:border-gold transition-colors bg-ivory">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) { setPhoto(URL.createObjectURL(f)); setAnalysed(false) }
              }}
            />
            {photo ? (
              <img src={photo} alt="Your room" className="size-full object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-center p-6">
                <div>
                  <Upload className="size-8 mx-auto text-gold" strokeWidth={1.4} />
                  <p className="font-display text-2xl mt-3">Upload a room photo</p>
                  <p className="text-xs text-charcoal/55 mt-1">JPG or PNG · stays on your device in this preview</p>
                </div>
              </div>
            )}
          </label>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <label>
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Room</span>
              <select value={roomId} onChange={(e) => { setRoomId(e.target.value as typeof roomId); setAnalysed(false) }} className="mt-1 w-full bg-ivory px-4 py-3 text-sm outline-none">
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </label>
            <label>
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Target style</span>
              <select value={styleId} onChange={(e) => { setStyleId(e.target.value); setAnalysed(false) }} className="mt-1 w-full bg-ivory px-4 py-3 text-sm outline-none">
                {styles.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </label>
          </div>
          <button onClick={() => setAnalysed(true)} className="w-full mt-5 flex items-center justify-center gap-2 px-5 py-4 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase hover:bg-walnut">
            <Sparkles className="size-4" /> {photo ? 'Analyse my room' : 'See a sample analysis'}
          </button>

          {analysed && (
            <div className="rise mt-8 grid gap-4 sm:grid-cols-3">
              <Card icon={Camera} title="Analysis">
                {room.name} · approx. {room.sizes[1].sqft} sq. ft. ({room.sizes[1].dims}). Good natural light; opportunity for a stronger focal wall.
              </Card>
              <Card icon={Palette} title="Palette & materials">
                <div className="flex h-6 my-2">{style.palette.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}</div>
                {style.materials.join(', ')}.
              </Card>
              <Card icon={Ruler} title="Spatial plan">
                Keep 30–36″ walkways. {room.blurb}
              </Card>
            </div>
          )}
        </div>

        <div className="bg-charcoal text-ivory flex flex-col h-[640px]">
          <div className="px-6 py-4 border-b border-ivory/10 flex items-center gap-3">
            <span className="grid place-items-center size-9 rounded-full bg-gold text-charcoal"><Sparkles className="size-4" /></span>
            <div>
              <p className="font-display text-lg">CasaAI Assistant</p>
              <p className="text-[0.65rem] text-ivory/50 tracking-wider uppercase">Design chat · preview</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] text-sm leading-relaxed px-4 py-3 ${m.role === 'user' ? 'ml-auto bg-gold text-charcoal' : 'bg-ivory/8 text-ivory/90 border border-ivory/10'}`}>
                {m.text}
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
          <div className="px-6 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
            {['Sofa for 280 sq ft living room?', 'Warm palette for a bedroom', 'Best kitchen materials'].map((s) => (
              <button key={s} onClick={() => send(s)} className="shrink-0 px-3 py-1.5 border border-ivory/20 text-xs text-ivory/70 hover:border-gold hover:text-gold-light">{s}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input) }} className="p-4 border-t border-ivory/10 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your space…" className="flex-1 bg-ivory/8 px-4 py-3 text-sm outline-none placeholder:text-ivory/40" />
            <button aria-label="Send" className="grid place-items-center size-11 bg-gold text-charcoal hover:bg-gold-light"><ArrowUp className="size-4" /></button>
          </form>
        </div>
      </div>

      {analysed && (
        <section className="mt-20">
          <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Redesign inspiration</p>
          <h2 className="font-display text-3xl mt-3 mb-8">{style.name} concepts to start from</h2>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((d) => <DesignCard key={d.id} design={d} />)}
          </div>
        </section>
      )}

      {!analysed && (
        <div className="mt-20 relative overflow-hidden">
          <img src={img('study', 1800, { h: 500 })} alt="" className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-espresso/70 flex items-center justify-center text-center text-ivory px-6">
            <div>
              <p className="font-display text-3xl">Prefer a human touch?</p>
              <Link to="/designers" className="inline-block mt-5 px-7 py-3.5 bg-ivory text-charcoal text-xs tracking-[0.2em] uppercase">Meet our designers</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Card({ icon: Icon, title, children }: { icon: typeof Camera; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-ivory p-5">
      <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-gold"><Icon className="size-3.5" />{title}</p>
      <div className="text-sm text-charcoal/75 mt-3 leading-relaxed">{children}</div>
    </div>
  )
}
