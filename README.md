# CasaNest

**Where Every Space Finds Its Style.** CasaNest is a premium interior-design inspiration platform for apartments, row houses, bungalows, villas, penthouses and mansions — with curated design concepts, realistic square-footage plans, photo and video galleries, designer profiles and CasaAI, an interior-design assistant.

## What's live

- Landing page with smart search, home categories, featured concepts, room-size explorer, styles, CasaAI and designers
- Explore Homes with search, filters and sorting
- Detailed pages for each home category with layouts, sq. ft. options and room sizes
- Design detail pages with 50+ photo galleries, video galleries, a mixed feed and lightbox
- Spaces, Styles, Designers, Favorites, CasaAI preview and Sign in / Register screens

The catalogue currently runs on stub data in `src/data/fixtures.ts`.

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing) on Netlify
- Tailwind CSS 4 with a custom ivory / beige / walnut / charcoal / gold theme
- Playfair Display + Poppins (Google Fonts)
- Netlify Image CDN for all imagery (`/.netlify/images`)
- Lucide icons

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

## Roadmap

See [PLAN.md](./PLAN.md). Next up: the database and content API, accounts, enquiry routing to the owner, the admin dashboard and media CMS, and the live CasaAI features.
