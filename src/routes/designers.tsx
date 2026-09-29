import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, Check, Mail, MapPin, MessageCircle, Star } from 'lucide-react'
import { useState } from 'react'
import { DesignCard } from '@/components/DesignCard'
import { type Designer, designers, designs, getStyle, homeTypes } from '@/data/fixtures'

export const Route = createFileRoute('/designers')({
  head: () => ({ meta: [{ title: 'Designers & Consultations — CasaNest' }] }),
  component: Designers,
})

function Designers() {
  const [booking, setBooking] = useState<Designer | null>(null)
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16">
      <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Designers</p>
      <h1 className="font-display text-5xl sm:text-6xl mt-4">The studios of <span className="italic text-walnut">CasaNest</span></h1>
      <p className="text-charcoal/70 mt-4 max-w-2xl">Browse portfolios and request a private consultation with the designer whose work speaks to you.</p>

      <div className="mt-14 space-y-20">
        {designers.map((d) => {
          const work = designs.filter((x) => x.designerId === d.id).slice(0, 3)
          return (
            <section key={d.id} id={d.id} className="scroll-mt-28 grid gap-10 lg:grid-cols-[320px_1fr]">
              <div>
                <span className="grid place-items-center size-24 rounded-full bg-gradient-to-br from-beige to-walnut text-ivory font-display text-3xl">
                  {d.name.split(' ').map((p) => p[0]).join('')}
                </span>
                <h2 className="font-display text-3xl mt-5">{d.name}</h2>
                <p className="text-sm text-charcoal/60 flex items-center gap-1.5 mt-1"><MapPin className="size-3.5" />{d.studio} · {d.city}</p>
                <p className="text-sm text-walnut mt-3">{d.specialty}</p>
                <p className="text-sm text-charcoal/70 mt-4 leading-relaxed">{d.bio}</p>
                <div className="flex gap-5 mt-5 text-xs text-charcoal/60">
                  <span className="flex items-center gap-1 text-gold"><Star className="size-3.5" fill="currentColor" />{d.rating}</span>
                  <span>{d.projects} projects</span>
                  <span>{d.years} years</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {d.styles.map((s) => <span key={s} className="px-3 py-1 bg-cream text-xs">{getStyle(s)?.name}</span>)}
                </div>
                <button onClick={() => setBooking(d)} className="w-full mt-6 flex items-center justify-center gap-2 px-5 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase hover:bg-walnut transition-colors">
                  <CalendarDays className="size-4" /> Book consultation
                </button>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button onClick={() => setBooking(d)} className="flex items-center justify-center gap-2 py-3 border border-sand text-xs hover:border-gold"><Mail className="size-3.5" /> Contact</button>
                  <button onClick={() => setBooking(d)} className="flex items-center justify-center gap-2 py-3 border border-sand text-xs hover:border-gold"><MessageCircle className="size-3.5" /> WhatsApp</button>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {work.map((w) => <DesignCard key={w.id} design={w} size="lg" />)}
              </div>
            </section>
          )
        })}
      </div>

      {booking && <BookingPanel designer={booking} onClose={() => setBooking(null)} />}
    </div>
  )
}

function BookingPanel({ designer, onClose }: { designer: Designer; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-ivory h-full overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="text-xs tracking-[0.2em] uppercase text-charcoal/50 hover:text-charcoal">Close</button>
        <p className="eyebrow mt-8">Consultation request</p>
        <h3 className="font-display text-3xl mt-2">with {designer.name}</h3>
        {sent ? (
          <div className="mt-10 bg-cream p-6">
            <span className="grid place-items-center size-12 rounded-full bg-gold text-ivory"><Check className="size-5" /></span>
            <p className="font-display text-2xl mt-4">Request prepared</p>
            <p className="text-sm text-charcoal/70 mt-2">
              This is a preview of the booking flow. Direct delivery to the CasaNest studio inbox, email and WhatsApp
              arrives with the admin dashboard.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            {[['Full name', 'text'], ['Email', 'email'], ['Phone / WhatsApp', 'tel']].map(([l, t]) => (
              <label key={l} className="block">
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">{l}</span>
                <input required type={t} className="mt-1 w-full bg-cream px-4 py-3 outline-none border border-transparent focus:border-gold text-sm" />
              </label>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Home type</span>
                <select className="mt-1 w-full bg-cream px-3 py-3 text-sm outline-none">
                  {homeTypes.map((h) => <option key={h.id}>{h.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Area (sq. ft.)</span>
                <input type="number" min={100} className="mt-1 w-full bg-cream px-4 py-3 text-sm outline-none" />
              </label>
            </div>
            <label className="block">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Preferred date</span>
              <input type="date" className="mt-1 w-full bg-cream px-4 py-3 text-sm outline-none" />
            </label>
            <label className="block">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Tell us about your space</span>
              <textarea rows={4} className="mt-1 w-full bg-cream px-4 py-3 text-sm outline-none" />
            </label>
            <button className="w-full px-5 py-4 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase hover:bg-walnut">Request consultation</button>
          </form>
        )}
      </div>
    </div>
  )
}
