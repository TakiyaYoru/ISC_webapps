import { productLabelInformation, productProvenance } from '../data/productProvenance'

type CatalogProduct = { slug: string; name: string; info: string; ingredients: string }
const componentSlugs = [
  'alpeh-mito-viv-first-treatment-essence',
  'zayin-rare-elements-vital-facial-essence',
  'chet-energy-restoration-facial-treatment',
  'smtrs-100-de-secret',
  '500-000-stem-media-skin-booster',
]

export function completeProductInformation<T extends CatalogProduct>(catalog: T[]): T[] {
  return catalog.map(product => {
    const provenance = productProvenance[product.slug]
    if (!provenance) return product
    const isSet = product.slug === 'comprehensive-skincare-solution-quintet' || product.slug === 'platinum-stemcell-reverse-aging-solution'
    const components = componentSlugs.map(slug => catalog.find(item => item.slug === slug))
    // Do not replace a set's ingredients unless every component is available.
    const ingredients = isSet && components.every(item => item?.ingredients.trim())
      ? components.map(item => `${item!.name}\n${item!.ingredients}`).join('\n\n')
      : product.ingredients
    return {
      ...product,
      ingredients,
      info: [
        `- Dung tích: ${provenance.volume}`,
        `- Xuất xứ: ${productLabelInformation.country}`,
        `- ${productLabelInformation.expiry}`,
        `- ${productLabelInformation.afterOpening}`,
        '',
        productLabelInformation.storage,
        productLabelInformation.precautions,
      ].join('\n'),
    }
  })
}
