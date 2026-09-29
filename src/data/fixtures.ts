/**
 * Stubbed catalogue data for CasaNest.
 *
 * Everything the UI renders comes from this single module so a later
 * milestone can swap it for the Netlify Database + admin CMS without
 * touching the screens. Keep the exported shapes stable.
 */

export type ImageKey =
  | 'hero'
  | 'apartment'
  | 'rowhouse'
  | 'bungalow'
  | 'villa'
  | 'penthouse'
  | 'mansion'
  | 'living'
  | 'bedroom'
  | 'kitchen'
  | 'bathroom'
  | 'dining'
  | 'study'
  | 'furniture'

/** Optimised URL through the Netlify Image CDN. */
export function img(
  key: ImageKey,
  w = 1200,
  opts: { h?: number; position?: string } = {},
) {
  const params = new URLSearchParams({ url: `/img/${key}.png`, w: String(w), fm: 'webp', q: '78' })
  if (opts.h) {
    params.set('h', String(opts.h))
    params.set('fit', 'cover')
  }
  if (opts.h && opts.position) params.set('position', opts.position)
  return `/.netlify/images?${params.toString()}`
}

export type HomeTypeId = 'apartments' | 'row-houses' | 'bungalows' | 'villas' | 'penthouses' | 'mansions'

export type HomeType = {
  id: HomeTypeId
  name: string
  singular: string
  image: ImageKey
  tagline: string
  description: string
  /** Common layouts with realistic carpet areas in sq. ft. */
  configurations: { label: string; sqft: number }[]
  sqftRange: [number, number]
  /** Multiplier applied to room sizes, so a mansion bedroom is larger than an apartment one. */
  roomScale: number
}

export const homeTypes: HomeType[] = [
  {
    id: 'apartments',
    name: 'Apartments',
    singular: 'Apartment',
    image: 'apartment',
    tagline: 'Considered city living, every inch intentional.',
    description:
      'Smart layouts, built-in storage and light-maximising palettes for urban apartments — from compact studios to generous four-bedroom residences.',
    configurations: [
      { label: 'Studio', sqft: 450 },
      { label: '1 BHK', sqft: 650 },
      { label: '2 BHK', sqft: 1100 },
      { label: '3 BHK', sqft: 1600 },
      { label: '4 BHK', sqft: 2400 },
    ],
    sqftRange: [450, 2400],
    roomScale: 0.85,
  },
  {
    id: 'row-houses',
    name: 'Row Houses',
    singular: 'Row House',
    image: 'rowhouse',
    tagline: 'Vertical living with townhouse character.',
    description:
      'Multi-level townhouses that balance narrow footprints with sculptural staircases, courtyards and a strong sense of flow between floors.',
    configurations: [
      { label: '3 BHK Duplex', sqft: 1450 },
      { label: '3 BHK Triplex', sqft: 1900 },
      { label: '4 BHK Duplex', sqft: 2400 },
      { label: '4 BHK Triplex', sqft: 3200 },
    ],
    sqftRange: [1450, 3200],
    roomScale: 1,
  },
  {
    id: 'bungalows',
    name: 'Bungalows',
    singular: 'Bungalow',
    image: 'bungalow',
    tagline: 'Grounded, garden-facing and generous.',
    description:
      'Single and one-and-a-half storey homes designed around courtyards, verandas and open great rooms that invite the outdoors in.',
    configurations: [
      { label: '3 BHK', sqft: 2000 },
      { label: '4 BHK', sqft: 2800 },
      { label: '4 BHK + Study', sqft: 3500 },
      { label: '5 BHK', sqft: 4500 },
    ],
    sqftRange: [2000, 4500],
    roomScale: 1.15,
  },
  {
    id: 'villas',
    name: 'Villas',
    singular: 'Villa',
    image: 'villa',
    tagline: 'Resort-grade living, every day.',
    description:
      'Pool-side lounges, stone-clad terraces and layered suites — villas composed for entertaining, retreat and indoor-outdoor living.',
    configurations: [
      { label: '4 BHK', sqft: 3500 },
      { label: '5 BHK', sqft: 4800 },
      { label: '5 BHK + Pool Deck', sqft: 6200 },
      { label: '6 BHK Estate', sqft: 8000 },
    ],
    sqftRange: [3500, 8000],
    roomScale: 1.35,
  },
  {
    id: 'penthouses',
    name: 'Penthouses',
    singular: 'Penthouse',
    image: 'penthouse',
    tagline: 'Skyline drama, tailored interiors.',
    description:
      'Double-height living, wraparound terraces and gallery-like finishes crafted around panoramic views and after-dark ambience.',
    configurations: [
      { label: '3 BHK Sky Suite', sqft: 2800 },
      { label: '4 BHK Duplex', sqft: 4200 },
      { label: '5 BHK Duplex', sqft: 5500 },
      { label: 'Full-Floor Residence', sqft: 7000 },
    ],
    sqftRange: [2800, 7000],
    roomScale: 1.3,
  },
  {
    id: 'mansions',
    name: 'Mansions',
    singular: 'Mansion',
    image: 'mansion',
    tagline: 'Heritage grandeur, modern comfort.',
    description:
      'Grand foyers, formal salons, private wings and entertainment suites — estate-scale interiors with museum-level craftsmanship.',
    configurations: [
      { label: '6 BHK Estate', sqft: 8000 },
      { label: '7 BHK Estate', sqft: 11000 },
      { label: '8 BHK Manor', sqft: 15000 },
      { label: 'Grand Estate', sqft: 20000 },
    ],
    sqftRange: [8000, 20000],
    roomScale: 1.7,
  },
]

export type RoomId = 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'dining' | 'study'

export type Room = {
  id: RoomId
  name: string
  image: ImageKey
  blurb: string
  /** Typical base sizes in sq. ft. (scaled per home type). */
  sizes: { label: string; sqft: number; dims: string }[]
}

export const rooms: Room[] = [
  {
    id: 'living',
    name: 'Living Room',
    image: 'living',
    blurb: 'Layered seating, sculptural lighting and a calm, conversational layout.',
    sizes: [
      { label: 'Compact', sqft: 180, dims: "12' × 15'" },
      { label: 'Standard', sqft: 280, dims: "14' × 20'" },
      { label: 'Generous', sqft: 400, dims: "16' × 25'" },
      { label: 'Grand', sqft: 600, dims: "20' × 30'" },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: 'bedroom',
    blurb: 'Restful palettes, upholstered walls and hotel-grade wardrobes.',
    sizes: [
      { label: 'Guest', sqft: 120, dims: "10' × 12'" },
      { label: 'Standard', sqft: 168, dims: "12' × 14'" },
      { label: 'Master', sqft: 240, dims: "15' × 16'" },
      { label: 'Master Suite', sqft: 400, dims: "16' × 25'" },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    image: 'kitchen',
    blurb: 'Efficient work triangles, stone islands and concealed storage.',
    sizes: [
      { label: 'Galley', sqft: 80, dims: "8' × 10'" },
      { label: 'L-Shape', sqft: 120, dims: "10' × 12'" },
      { label: 'Island', sqft: 200, dims: "12' × 16'" },
      { label: "Chef's Kitchen", sqft: 300, dims: "15' × 20'" },
    ],
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    image: 'bathroom',
    blurb: 'Spa-like stone, warm metals and soft, layered lighting.',
    sizes: [
      { label: 'Powder', sqft: 35, dims: "5' × 7'" },
      { label: 'Standard', sqft: 50, dims: "5' × 10'" },
      { label: 'Ensuite', sqft: 80, dims: "8' × 10'" },
      { label: 'Spa Bath', sqft: 150, dims: "10' × 15'" },
    ],
  },
  {
    id: 'dining',
    name: 'Dining',
    image: 'dining',
    blurb: 'Statement tables, sculptural pendants and room to linger.',
    sizes: [
      { label: '4-Seater', sqft: 100, dims: "10' × 10'" },
      { label: '6-Seater', sqft: 150, dims: "10' × 15'" },
      { label: '8-Seater', sqft: 210, dims: "14' × 15'" },
      { label: 'Formal 12', sqft: 300, dims: "15' × 20'" },
    ],
  },
  {
    id: 'study',
    name: 'Study',
    image: 'study',
    blurb: 'Focused workspaces wrapped in timber, books and warm task light.',
    sizes: [
      { label: 'Nook', sqft: 60, dims: "6' × 10'" },
      { label: 'Home Office', sqft: 100, dims: "10' × 10'" },
      { label: 'Library', sqft: 160, dims: "12' × 13'" },
      { label: 'Executive', sqft: 220, dims: "14' × 16'" },
    ],
  },
]

export function scaledRoomSizes(room: Room, homeType: HomeType) {
  return room.sizes.map((s) => ({
    ...s,
    sqft: Math.round((s.sqft * homeType.roomScale) / 5) * 5,
  }))
}

export type Style = {
  id: string
  name: string
  mood: string
  palette: string[]
  materials: string[]
}

export const styles: Style[] = [
  { id: 'modern-minimal', name: 'Modern Minimal', mood: 'Quiet, edited and light-filled', palette: ['#f4efe6', '#d9cbb5', '#8c7760', '#2c2a26'], materials: ['Microcement', 'White oak', 'Linen', 'Brushed brass'] },
  { id: 'japandi', name: 'Japandi', mood: 'Serene craft meets Nordic warmth', palette: ['#efe7da', '#c9b79c', '#7a634b', '#34302a'], materials: ['Ash timber', 'Washi paper', 'Clay plaster', 'Wool bouclé'] },
  { id: 'contemporary-luxe', name: 'Contemporary Luxe', mood: 'Polished, sculptural and bold', palette: ['#f6f1ea', '#cdb89a', '#5b3e2b', '#1f1d1a'], materials: ['Calacatta marble', 'Smoked walnut', 'Velvet', 'Champagne gold'] },
  { id: 'mediterranean', name: 'Mediterranean', mood: 'Sun-washed, textured and relaxed', palette: ['#f7f0e3', '#e2cfae', '#b07d52', '#4a3a2c'], materials: ['Limewash', 'Travertine', 'Terracotta', 'Rattan'] },
  { id: 'scandinavian', name: 'Scandinavian', mood: 'Bright, functional and cosy', palette: ['#f8f5f0', '#e0d6c8', '#a39179', '#3b3935'], materials: ['Birch', 'Sheepskin', 'Matte ceramic', 'Cotton'] },
  { id: 'art-deco', name: 'Art Deco', mood: 'Geometric glamour with gilded detail', palette: ['#f3ebdd', '#c7a36a', '#6b4a33', '#1d1b18'], materials: ['Fluted walnut', 'Nero marquina', 'Brass inlay', 'Silk velvet'] },
  { id: 'wabi-sabi', name: 'Wabi-Sabi', mood: 'Imperfect, earthy and soulful', palette: ['#eee6d8', '#c4b198', '#8a735a', '#3a342c'], materials: ['Raw plaster', 'Reclaimed timber', 'Stoneware', 'Hemp'] },
  { id: 'classic-european', name: 'Classic European', mood: 'Timeless mouldings and heritage craft', palette: ['#f7f2e9', '#dccab0', '#9c7d58', '#2e2a24'], materials: ['Herringbone oak', 'Carrara marble', 'Damask', 'Antique gold leaf'] },
  { id: 'industrial-loft', name: 'Industrial Loft', mood: 'Raw volumes softened by warm leather', palette: ['#ece6dc', '#b9a58b', '#6a5443', '#252422'], materials: ['Exposed brick', 'Blackened steel', 'Cognac leather', 'Concrete'] },
  { id: 'tropical-modern', name: 'Tropical Modern', mood: 'Lush, breezy and indoor-outdoor', palette: ['#f5efe2', '#d4c09c', '#7d6546', '#2f3129'], materials: ['Teak', 'Cane weave', 'Natural stone', 'Linen sheers'] },
  { id: 'mid-century', name: 'Mid-Century', mood: 'Warm walnut curves and graphic accents', palette: ['#f3ebdf', '#d6b98f', '#8b5a36', '#2b2723'], materials: ['Teak veneer', 'Terrazzo', 'Tweed', 'Satin brass'] },
  { id: 'coastal-calm', name: 'Coastal Calm', mood: 'Soft sand tones and ocean-air ease', palette: ['#f8f4ec', '#e5d8c3', '#a9957a', '#3c3d3a'], materials: ['Whitewashed oak', 'Jute', 'Sea-grass', 'Pale travertine'] },
]

export type Designer = {
  id: string
  name: string
  studio: string
  city: string
  specialty: string
  styles: string[]
  rating: number
  projects: number
  years: number
  bio: string
}

export const designers: Designer[] = [
  { id: 'aria-mehta', name: 'Aria Mehta', studio: 'Atelier Aria', city: 'Mumbai', specialty: 'Penthouses & sky residences', styles: ['contemporary-luxe', 'art-deco'], rating: 4.9, projects: 142, years: 14, bio: 'Aria composes skyline homes with sculptural lighting, fluted timber and a restrained metallic palette.' },
  { id: 'lucas-moreau', name: 'Lucas Moreau', studio: 'Maison Moreau', city: 'Dubai', specialty: 'Villas & Mediterranean estates', styles: ['mediterranean', 'classic-european'], rating: 4.8, projects: 118, years: 17, bio: 'Lucas brings sun-washed textures and old-world craft to resort-style villas across the Gulf and the Riviera.' },
  { id: 'kenji-sato', name: 'Kenji Sato', studio: 'Studio Ma', city: 'Bengaluru', specialty: 'Japandi & wabi-sabi homes', styles: ['japandi', 'wabi-sabi'], rating: 4.9, projects: 96, years: 11, bio: 'Kenji designs calm, crafted interiors around the Japanese idea of “ma” — the beauty of considered space.' },
  { id: 'isabella-rossi', name: 'Isabella Rossi', studio: 'Rossi & Co.', city: 'Delhi', specialty: 'Mansions & heritage restoration', styles: ['classic-european', 'art-deco'], rating: 5.0, projects: 74, years: 21, bio: 'Isabella restores and reimagines estate homes with gilded detailing, bespoke joinery and museum-grade finishes.' },
  { id: 'noah-hansen', name: 'Noah Hansen', studio: 'Nord Haus', city: 'Pune', specialty: 'Apartments & compact luxury', styles: ['scandinavian', 'modern-minimal'], rating: 4.8, projects: 203, years: 9, bio: 'Noah makes city apartments feel twice their size through built-ins, light-bouncing palettes and clever zoning.' },
  { id: 'zara-khan', name: 'Zara Khan', studio: 'Terra Studio', city: 'Hyderabad', specialty: 'Bungalows & tropical modern', styles: ['tropical-modern', 'mid-century'], rating: 4.7, projects: 88, years: 12, bio: 'Zara designs garden-facing bungalows that blur the line between veranda, courtyard and living room.' },
]

export type MediaItem = {
  id: string
  kind: 'photo' | 'video'
  image: ImageKey
  caption: string
  room: RoomId | 'overview'
  /** Crop hint for visual variety across a gallery. */
  position: string
  duration?: string
}

export type Design = {
  id: string
  title: string
  homeType: HomeTypeId
  styleId: string
  designerId: string
  sqft: number
  configuration: string
  budget: 'Premium' | 'Luxury' | 'Ultra Luxury'
  cover: ImageKey
  summary: string
  highlights: string[]
  rooms: { room: RoomId; sqft: number }[]
  photoCount: number
  videoCount: number
  likes: number
}

const titleWords: Record<string, string[]> = {
  'modern-minimal': ['Linen & Light', 'The Quiet Edit'],
  japandi: ['Ma Residence', 'Cedar Calm'],
  'contemporary-luxe': ['Onyx & Oak', 'Gilded Horizon'],
  mediterranean: ['Casa Soleil', 'Olive Terrace'],
  scandinavian: ['Nordic Hearth', 'Birch & Bloom'],
  'art-deco': ['The Gatsby', 'Fluted Noir'],
  'wabi-sabi': ['Earth & Ember', 'Clay House'],
  'classic-european': ['Maison Blanc', 'The Parisian'],
  'industrial-loft': ['Foundry Loft', 'Brick & Brass'],
  'tropical-modern': ['Palm Pavilion', 'Teak Retreat'],
  'mid-century': ['Walnut Modern', 'Atomic Ease'],
  'coastal-calm': ['Driftwood Haven', 'Sea Salt Suite'],
}

const roomImages: Record<RoomId, ImageKey> = {
  living: 'living',
  bedroom: 'bedroom',
  kitchen: 'kitchen',
  bathroom: 'bathroom',
  dining: 'dining',
  study: 'study',
}

function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function buildDesigns(): Design[] {
  const out: Design[] = []
  homeTypes.forEach((ht, hi) => {
    styles.forEach((st, si) => {
      const seed = hi * 100 + si
      const conf = ht.configurations[si % ht.configurations.length]
      const variance = 1 + (seeded(seed) - 0.5) * 0.12
      const sqft = Math.round((conf.sqft * variance) / 10) * 10
      const designer =
        designers.find((d) => d.styles.includes(st.id)) ?? designers[(hi + si) % designers.length]
      const roomList: RoomId[] =
        ht.id === 'apartments'
          ? ['living', 'bedroom', 'kitchen', 'bathroom', 'dining']
          : ['living', 'bedroom', 'kitchen', 'bathroom', 'dining', 'study']
      const title = titleWords[st.id][hi % 2]
      out.push({
        id: `${ht.id}-${st.id}`,
        title: `${title} ${ht.singular}`,
        homeType: ht.id,
        styleId: st.id,
        designerId: designer.id,
        sqft,
        configuration: conf.label,
        budget: ht.roomScale >= 1.5 ? 'Ultra Luxury' : ht.roomScale >= 1.15 ? 'Luxury' : 'Premium',
        cover: si % 3 === 0 ? ht.image : roomImages[roomList[si % roomList.length]],
        summary: `A ${st.mood.toLowerCase()} ${ht.singular.toLowerCase()} spanning ${sqft.toLocaleString('en-IN')} sq. ft., layered with ${st.materials
          .slice(0, 3)
          .join(', ')
          .toLowerCase()} and a considered ${st.name.toLowerCase()} palette.`,
        highlights: [
          `${conf.label} layout planned around natural light`,
          `Signature materials: ${st.materials.join(', ')}`,
          `Bespoke joinery with concealed storage`,
          `Layered lighting scheme with warm 2700K ambience`,
        ],
        rooms: roomList.map((r) => {
          const room = rooms.find((x) => x.id === r)!
          const base = room.sizes[Math.min(3, Math.floor(ht.roomScale * 1.6))]
          return { room: r, sqft: Math.round((base.sqft * ht.roomScale) / 5) * 5 }
        }),
        photoCount: 52 + Math.floor(seeded(seed + 1) * 30),
        videoCount: 6 + Math.floor(seeded(seed + 2) * 8),
        likes: 180 + Math.floor(seeded(seed + 3) * 2400),
      })
    })
  })
  return out
}

export const designs: Design[] = buildDesigns()

const positions = ['center', 'left', 'right', 'top', 'bottom']
const captionsByRoom: Record<RoomId | 'overview', string[]> = {
  overview: ['Arrival view', 'Golden-hour overview', 'Material palette', 'Evening ambience'],
  living: ['Conversation zone', 'Sofa & lighting detail', 'Feature wall', 'Window seating'],
  bedroom: ['Headboard wall', 'Bedside vignette', 'Wardrobe run', 'Reading corner'],
  kitchen: ['Island & pendants', 'Tall storage', 'Breakfast counter', 'Hardware detail'],
  bathroom: ['Vanity wall', 'Freestanding tub', 'Shower niche', 'Stone detail'],
  dining: ['Table setting', 'Chandelier detail', 'Bar console', 'Sideboard styling'],
  study: ['Library wall', 'Desk vignette', 'Reading chair', 'Lighting detail'],
}

/** Builds the stub media library for a design: 50+ photos and a separate video set. */
export function getMedia(design: Design): { photos: MediaItem[]; videos: MediaItem[] } {
  const ht = homeTypes.find((h) => h.id === design.homeType)!
  const pool: { key: ImageKey; room: RoomId | 'overview' }[] = [
    { key: design.cover, room: 'overview' },
    { key: ht.image, room: 'overview' },
    ...design.rooms.map((r) => ({ key: roomImages[r.room], room: r.room })),
    { key: 'furniture', room: 'living' },
  ]
  const photos: MediaItem[] = Array.from({ length: design.photoCount }, (_, i) => {
    const p = pool[i % pool.length]
    const caps = captionsByRoom[p.room]
    return {
      id: `${design.id}-p${i}`,
      kind: 'photo',
      image: p.key,
      room: p.room,
      caption: caps[Math.floor(i / pool.length) % caps.length],
      position: positions[Math.floor(i / pool.length) % positions.length],
    }
  })
  const videos: MediaItem[] = Array.from({ length: design.videoCount }, (_, i) => {
    const p = pool[(i + 1) % pool.length]
    const label = p.room === 'overview' ? 'Full home walkthrough' : `${rooms.find((r) => r.id === p.room)?.name} tour`
    return {
      id: `${design.id}-v${i}`,
      kind: 'video',
      image: p.key,
      room: p.room,
      caption: i === 0 ? 'Cinematic walkthrough' : label,
      position: positions[(i + 2) % positions.length],
      duration: `${1 + (i % 4)}:${String(10 + ((i * 17) % 50)).padStart(2, '0')}`,
    }
  })
  return { photos, videos }
}

/** Interleaves photos and videos for the mixed feed (one video every four items). */
export function getMixedFeed(design: Design) {
  const { photos, videos } = getMedia(design)
  const feed: MediaItem[] = []
  let v = 0
  photos.forEach((p, i) => {
    feed.push(p)
    if ((i + 1) % 4 === 0 && v < videos.length) feed.push(videos[v++])
  })
  return feed.concat(videos.slice(v))
}

export const getHomeType = (id: string) => homeTypes.find((h) => h.id === id)
export const getStyle = (id: string) => styles.find((s) => s.id === id)
export const getDesigner = (id: string) => designers.find((d) => d.id === id)
export const getDesign = (id: string) => designs.find((d) => d.id === id)
export const getRoom = (id: string) => rooms.find((r) => r.id === id)

export function formatSqft(n: number) {
  return `${n.toLocaleString('en-IN')} sq. ft.`
}
