import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { designs, img, styles } from '@/data/fixtures'

export const Route = createFileRoute('/styles')({
  head: () => ({ meta: [{ title: 'Design Styles — CasaNest' }] }),
  component: Styles,
})

function Styles() {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16">
      <p className="eyebrow flex items-center gap-3"><span className="gold-rule" />Styles</p>
      <h1 className="font-display text-5xl sm:text-6xl mt-4">Find your <span className="italic text-walnut">design language</span></h1>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {styles.map((s) => {
          const list = designs.filter((d) => d.styleId === s.id)
          return (
            <Link key={s.id} to="/homes" search={{ style: s.id }} className="group grid grid-cols-[1fr_1.1fr] bg-cream overflow-hidden hover:bg-sand transition-colors">
              <div className="overflow-hidden">
                <img src={img(list[0].cover, 600, { h: 600 })} alt={s.name} loading="lazy" className="size-full object-cover aspect-square transition-transform duration-[1.4s] group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col">
                <p className="font-display text-2xl">{s.name}</p>
                <p className="text-sm text-charcoal/65 mt-1">{s.mood}</p>
                <div className="flex h-8 mt-5">
                  {s.palette.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}
                </div>
                <p className="text-xs text-charcoal/60 mt-4">{s.materials.join(' · ')}</p>
                <p className="mt-auto pt-4 flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-walnut">
                  {list.length} concepts <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
