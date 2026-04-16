export type Product = {
  id: string
  slug: string
  name: string
  collection: string
  tagline: string
  description: string
  price: number
  currency: string
  volume: string
  image: string
  imageAlt: string
  imageDetail: string
  palette: 'violet' | 'bronze' | 'sage' | 'clay' | 'bone'
  ingredients: string[]
  ritual: string[]
  benefits: string[]
  clinical: { label: string; value: string }[]
}

export const products: Product[] = [
  {
    id: 'p01',
    slug: 'celestial-serum',
    name: 'Celestial Serum',
    collection: 'The Signature Collection',
    tagline: 'Chronobiological night repair',
    description:
      'A midnight elixir formulated to synchronise with the skin\'s circadian rhythm. Encapsulated retinal and a proprietary peptide matrix restore firmness and translucency while you rest.',
    price: 420,
    currency: 'USD',
    volume: '30 ml',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Celestial Serum apothecary bottle on soft lilac surface',
    imageDetail:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1800&q=80',
    palette: 'violet',
    ingredients: [
      'Encapsulated Retinal 0.1%',
      'Bakuchiol from Psoralea',
      'Tetrapeptide-21',
      'Provence Rose Water',
      'Polyglutamic Acid',
    ],
    ritual: [
      'Dispense three drops into the palm.',
      'Warm between fingertips for six seconds.',
      'Press into the contours of the face in upward ribbons.',
      'Follow with the Clinical Provenance balm.',
    ],
    benefits: [
      'Visibly restores elasticity within 28 nights.',
      'Refines the appearance of pores without stripping.',
      'Brightens the complexion through gentle cellular turnover.',
    ],
    clinical: [
      { label: 'Bio-identical retinal', value: 'Encapsulated' },
      { label: 'In-vivo study', value: '94% / 28 nights' },
      { label: 'pH balanced', value: '5.4' },
      { label: 'Fragrance', value: 'None' },
    ],
  },
  {
    id: 'p02',
    slug: 'provenance-balm',
    name: 'Provenance Balm',
    collection: 'The Signature Collection',
    tagline: 'Cellular recovery moisturiser',
    description:
      'A cold-pressed balm-to-cream translating the richness of Provence apothecary into a featherlight ritual. Replenishes the barrier and seals in the preceding layers of care.',
    price: 360,
    currency: 'USD',
    volume: '50 ml',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Bronze jar of Provenance Balm on cream pedestal',
    imageDetail:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1800&q=80',
    palette: 'clay',
    ingredients: [
      'Squalane from Olive',
      'Ceramide NP',
      'Cold-pressed Camellia Oil',
      'Niacinamide 4%',
      'Japanese Rice Bran',
    ],
    ritual: [
      'Scoop a pearl-sized portion with the spatula.',
      'Press and sweep across the cheekbones first.',
      'Layer over the Celestial Serum to lock in actives.',
    ],
    benefits: [
      'Restores the lipid barrier in 14 days.',
      'Softens the appearance of fine lines.',
      'Leaves a cushioned, dewless finish.',
    ],
    clinical: [
      { label: 'Ceramide complex', value: 'NP, AP, EOP' },
      { label: 'Occlusive level', value: 'Whisper' },
      { label: 'pH balanced', value: '5.8' },
      { label: 'Fragrance', value: 'None' },
    ],
  },
  {
    id: 'p03',
    slug: 'atelier-essence',
    name: 'Atelier Essence',
    collection: 'The Signature Collection',
    tagline: 'Preparatory hydrating treatment',
    description:
      'A liminal layer between water and serum. Ferment-rich, glass-clear, and designed to prime the skin for the deeper rituals that follow.',
    price: 280,
    currency: 'USD',
    volume: '150 ml',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Atelier Essence bottle on seafoam stone plinth',
    imageDetail:
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1800&q=80',
    palette: 'sage',
    ingredients: [
      'Galactomyces Ferment 82%',
      'Polyglutamic Acid',
      'Copper Peptides',
      'Centella Asiatica',
    ],
    ritual: [
      'After cleansing, decant into cupped palms.',
      'Press lightly, layer by layer, until absorbed.',
      'Wait ninety seconds before the serum step.',
    ],
    benefits: [
      'Amplifies the efficacy of actives that follow.',
      'Quiets visible redness and sensitivity.',
      'Imparts a quiet, translucent finish.',
    ],
    clinical: [
      { label: 'Ferment concentration', value: '82%' },
      { label: 'Clinically soothing', value: '72h hydration' },
      { label: 'pH balanced', value: '5.2' },
      { label: 'Fragrance', value: 'None' },
    ],
  },
  {
    id: 'p04',
    slug: 'clarity-oil',
    name: 'Clarity Cleansing Oil',
    collection: 'The Daily Ritual',
    tagline: 'Dissolving cleansing phase',
    description:
      'An oil composed of eleven botanical distillates. Melts sunscreen, pigment, and the residue of the day into a silken cream on contact with water.',
    price: 180,
    currency: 'USD',
    volume: '200 ml',
    image:
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Amber bottles of Clarity Cleansing Oil backlit',
    imageDetail:
      'https://images.unsplash.com/photo-1598662972299-29cba6ee5f32?auto=format&fit=crop&w=1800&q=80',
    palette: 'bronze',
    ingredients: [
      'Cold-pressed Camellia Oil',
      'Jojoba Ester',
      'Sunflower Seed Oil',
      'Vitamin E',
    ],
    ritual: [
      'Apply three pumps to dry skin.',
      'Massage in slow, upward circles for 60 seconds.',
      'Emulsify with water and rinse.',
    ],
    benefits: [
      'Dissolves makeup without stripping the barrier.',
      'Leaves the skin soft, never tight.',
      'Suitable for the most reactive complexions.',
    ],
    clinical: [
      { label: 'Cold-pressed oils', value: '11 botanicals' },
      { label: 'Non-comedogenic', value: 'Verified' },
      { label: 'pH balanced', value: '5.6' },
      { label: 'Fragrance', value: 'None' },
    ],
  },
  {
    id: 'p05',
    slug: 'bespoke-mist',
    name: 'Bespoke Mist',
    collection: 'The Daily Ritual',
    tagline: 'Mineral-charged toner',
    description:
      'A fine veil of thermal spring water infused with hyaluronic fractions of three molecular weights. A pause between rituals.',
    price: 140,
    currency: 'USD',
    volume: '120 ml',
    image:
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Bespoke Mist glass bottle in soft morning light',
    imageDetail:
      'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?auto=format&fit=crop&w=1800&q=80',
    palette: 'bone',
    ingredients: [
      'Thermal Spring Water',
      'Low & High Molecular Hyaluronic Acid',
      'Magnesium',
      'Zinc PCA',
    ],
    ritual: [
      'Close the eyes.',
      'Mist at arm\'s length, twice across the face.',
      'Allow to settle before the next step.',
    ],
    benefits: [
      'Instant, weightless hydration.',
      'Sets the skin for serum penetration.',
      'Refreshes without disrupting layers.',
    ],
    clinical: [
      { label: 'Hyaluronic weights', value: 'Three' },
      { label: 'Clinically cooling', value: '−1.8°C on contact' },
      { label: 'pH balanced', value: '5.4' },
      { label: 'Fragrance', value: 'None' },
    ],
  },
  {
    id: 'p06',
    slug: 'imperial-mask',
    name: 'Imperial Mask',
    collection: 'The Rituals',
    tagline: 'Weekly cellular polish',
    description:
      'A ceremonial mask pairing enzymatic polish with a deeply restorative clay. Reserved for one evening a week — the skin\'s chapter of quiet restoration.',
    price: 320,
    currency: 'USD',
    volume: '75 ml',
    image:
      'https://images.unsplash.com/photo-1612538498456-e861df91d4d0?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Imperial Mask jar displayed as an artefact',
    imageDetail:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=80',
    palette: 'clay',
    ingredients: [
      'French Pink Clay',
      'Papain Enzyme',
      'Lactic Acid 5%',
      'Manuka Honey',
    ],
    ritual: [
      'Apply a generous layer to cleansed skin.',
      'Rest for ten minutes, no more.',
      'Rinse with lukewarm water and follow with essence.',
    ],
    benefits: [
      'Refines texture without abrasion.',
      'Evens the appearance of tone in one ritual.',
      'Leaves a luminous, untreated-looking finish.',
    ],
    clinical: [
      { label: 'Enzyme + AHA', value: 'Dual polish' },
      { label: 'Frequency', value: 'Once weekly' },
      { label: 'pH balanced', value: '4.2' },
      { label: 'Fragrance', value: 'None' },
    ],
  },
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
