# CasaNest Roadmap

CasaNest — *Where Every Space Finds Its Style* — is a luxury interior-design inspiration platform. The product is delivered in focused milestones so each one ships something complete.

## Milestone 1 — Product surface ✅
Branded, fully clickable experience running on stub data (`src/data/fixtures.ts`).
- Landing page: hero with smart search, home categories, featured designs, room-size explorer, styles, CasaAI teaser, designers, consultation CTA.
- Explore Homes (`/homes`): keyword search, home / style / sq. ft. filters, sorting.
- Home categories (`/homes/$type`): apartments, row houses, bungalows, villas, penthouses and mansions — 12 concepts each, realistic layouts and room sizes.
- Design detail (`/designs/$id`): 50+ photo gallery, separate video gallery, mixed feed, lightbox, palette, materials, room breakdown, designer card.
- Spaces (room-size explorer), Styles, Designers (with consultation form UI), Favorites (device-local), CasaAI preview (sample analysis + scripted chat), Sign in / Register UI.

## Milestone 2 — Data model & content API
- Netlify Database (Postgres + Drizzle) schema: home types, rooms, styles, designers, designs, design_rooms, media (photo/video, ordering, captions), users, favorites, collections, enquiries, consultations.
- Seed the database from the current fixtures so the site looks identical.
- Server functions for listing, filtering and searching designs; replace fixture imports in routes with loaders.

## Milestone 3 — Authentication & accounts
- Netlify Identity for register / sign in / password reset, with an `admin` role for the site owner.
- Persist favorites and named collections per user (migrate device-local favorites on first sign-in).
- Account page: saved designs, collections, consultation history.

## Milestone 4 — Enquiries routed to the owner
- Contact Designer, consultation booking and general enquiry forms stored in the database and delivered to the owner (email notification via Netlify Forms or an email function).
- WhatsApp deep links pre-filled with design and contact details.
- Spam protection and confirmation emails to the visitor.

## Milestone 5 — Owner admin dashboard & media CMS
- Protected `/admin` (admin role only): dashboard with enquiry inbox and consultation status.
- Real-time CRUD for designs, home types, styles and designers — no code required.
- Media manager backed by Netlify Blobs: bulk image upload (50+ per design), video upload, drag-to-reorder, captions, cover selection, delete; images served via the Netlify Image CDN.

## Milestone 6 — CasaAI
- Room-photo analysis with a vision model via Netlify AI Gateway (room type, estimated size, light, existing finishes).
- Redesign suggestions matched to CasaNest styles and concepts; colour and material recommendations.
- Spatial and sq. ft. assistant (furniture sizing, clearances, layouts).
- Streaming chatbot grounded in the design catalogue.

## Milestone 7 — Discovery polish
- Full-text smart search (Postgres), saved searches, furniture catalogue (`/furniture`) and an inspiration feed (`/inspiration`).
- Designer profile pages with portfolios and availability; SEO metadata and sitemap.
