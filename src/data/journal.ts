export type JournalEntry = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  image: string
  imageAlt: string
  date: string
  body: string[]
}

export const journal: JournalEntry[] = [
  {
    id: 'j01',
    slug: 'circadian-rhythm-of-cellular-repair',
    title: 'The Circadian Rhythm of Cellular Repair',
    excerpt:
      'On the quiet science of working with the skin\'s internal clock — and why midnight is no longer an accident.',
    category: 'Science',
    readingTime: '7 min',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'A still winter landscape at dusk',
    date: '2026.01',
    body: [
      'For more than a century, the cosmetic industry treated the skin as a surface to decorate. The clinical revolution of the last decade has finally positioned it as what it has always been: a living, rhythmic organ with its own time signature.',
      'Every cell in the basal layer carries a set of circadian proteins. By night they orchestrate DNA repair; by day they tune themselves to shield against oxidative insult. Formulate against this rhythm and you will work twice as hard for half the result. Formulate with it, and the complexion begins to behave the way it did a decade earlier.',
      'Our night rituals are engineered around this temporal biology. Retinal is encapsulated so it arrives at the precise moment the skin is prepared to accept it. Peptides are sequenced to mimic the body\'s own repair cascade. Nothing shouts; everything arrives exactly on time.',
      'The honest luxury of a well-made night serum is not a scent or a texture. It is a timing.',
    ],
  },
  {
    id: 'j02',
    slug: 'marine-botanicals-the-deep-source',
    title: 'Marine Botanicals — The Deep Source',
    excerpt:
      'A dive into the slow-grown seagrasses that shape our most restorative formulas.',
    category: 'Provenance',
    readingTime: '5 min',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Pale ocean, low horizon',
    date: '2025.11',
    body: [
      'Below twenty metres of cold Atlantic, the light begins to dim and the ecosystems slow. It is here that our partner divers, working in windows of forty minutes, hand-harvest the seagrasses whose cellular architecture will eventually enter the Atelier Essence.',
      'The reason is not romance. It is density. A fortnight of stillness on the sea floor produces the highest concentrations of phycoerythrin and marine peptides we have measured — the kind that teach the skin how to hold water again.',
      'Luxury is often confused with excess. In our atelier, it is a function of restraint: what we take, we take slowly; what we leave is more than what we take.',
    ],
  },
  {
    id: 'j03',
    slug: 'collagen-integrity',
    title: 'The Architecture of Collagen Integrity',
    excerpt:
      'How our clinical research team is reframing firmness as a question of matrix — not of volume.',
    category: 'Research',
    readingTime: '9 min',
    image:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Close texture of woven natural fibre',
    date: '2025.09',
    body: [
      'The industry sells us volume; the skin asks for integrity. These are not the same ask.',
      'Our in-vivo study of 124 women between 42 and 68 measured not the amount of collagen but its organisation — the orthogonal weave that confers the quality we recognise as "firm" skin. Over twelve weeks, signatory actives restored that weave in 78% of the cohort without introducing a single additional volumising molecule.',
      'Firmness, in other words, is a question of architecture. You cannot purchase it in a syringe. You can, however, cultivate it across a season of honest rituals.',
    ],
  },
]

export const findArticle = (slug: string) => journal.find((j) => j.slug === slug)
