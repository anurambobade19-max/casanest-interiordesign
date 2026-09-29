# AGENTS.md

CasaNest is a luxury interior-design inspiration platform built with TanStack Start and deployed on Netlify.

**Continue from [PLAN.md](./PLAN.md).** Milestone 1 (the product surface on stub data) is complete; the next session should start Milestone 2.

## Architecture

- `src/routes/` — file-based routes
  - `__root.tsx` — HTML shell, fonts, `Header`, `Footer`, 404
  - `index.tsx` — landing page
  - `homes/index.tsx` — Explore Homes (search params: `q`, `type`, `style`, `size`, `sort`)
  - `homes/$type.tsx` — home category page (`apartments`, `row-houses`, `bungalows`, `villas`, `penthouses`, `mansions`)
  - `designs/$designId.tsx` — design detail with photo / video / mixed galleries + lightbox
  - `spaces.tsx` (search params `room`, `home`), `styles.tsx`, `designers.tsx`, `favorites.tsx`, `casa-ai.tsx`, `login.tsx`
- `src/components/` — `Header`, `Footer`, `DesignCard`, `FavoriteButton`
- `src/data/fixtures.ts` — **the single source of stub data** (home types, rooms, styles, designers, generated designs, media). Screens only read through its exports and helpers (`getDesign`, `getMedia`, `getMixedFeed`, `scaledRoomSizes`, `img`, ...). Replace these with database-backed loaders in Milestone 2 while keeping the shapes.
- `src/lib/favorites.ts` — device-local favorites (localStorage + `useSyncExternalStore`); to be replaced by per-user favorites in Milestone 3.
- `public/img/*.png` — AI-generated interior photography. Always reference via `img(key, width, { h, position })`, which routes through the Netlify Image CDN.

## Conventions

- Theme tokens live in `src/styles.css` under `@theme` (`ivory`, `cream`, `sand`, `beige`, `taupe`, `walnut`, `espresso`, `charcoal`, `gold`, `gold-light`; `font-display` = Playfair Display, `font-sans` = Poppins). Use these, not raw colours.
- Utility classes: `.eyebrow` (small gold uppercase label), `.gold-rule`, `.rise` (entrance animation), `.no-scrollbar`.
- Headings use `font-display`, often with an italic walnut/gold accent phrase.
- Square buttons, `text-xs tracking-[0.2em] uppercase`, charcoal primary / gold accent.
- Pages that switch between entities via params are keyed on the id (`HomeTypeView`, `DesignView`) so local filter state resets.

## Non-obvious decisions

- Stub forms (consultation, login/register) and CasaAI replies are intentionally client-only previews; their copy tells visitors the feature is arriving. Wire them up in Milestones 3, 4 and 6.
- Image CDN `position` only accepts `center|top|bottom|left|right`, and is only applied when a height (cover crop) is set.
- Photo counts (52+) and video counts per design are generated deterministically in fixtures; galleries reuse the base imagery with different crops.
