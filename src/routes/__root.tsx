import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'

import '../styles.css'

const siteName = 'CasaNest — Where Every Space Finds Its Style'
const siteDescription = 'Luxury interior-design inspiration for apartments, villas, penthouses and mansions — curated concepts, designers and CasaAI.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Poppins:wght@300;400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-40 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-5xl mt-4">This room is still being designed.</h1>
      <Link to="/" className="inline-block mt-10 px-7 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase">
        Return home
      </Link>
    </section>
  )
}
