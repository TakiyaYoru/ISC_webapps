export type InstagramPost = {
  id: string
  caption: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  imageUrl: string
  permalink: string
  timestamp: string
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function httpsUrl(value: unknown, instagramOnly = false): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password) return undefined
    if (instagramOnly && !['instagram.com', 'www.instagram.com'].includes(url.hostname)) return undefined
    return url.href
  } catch {
    return undefined
  }
}

export function parseInstagramPosts(value: unknown): InstagramPost[] {
  if (!record(value) || !Array.isArray(value.posts)) return []
  const seen = new Set<string>()
  const posts: InstagramPost[] = []
  for (const item of value.posts) {
    if (!record(item) || typeof item.id !== 'string' || !item.id || seen.has(item.id)) continue
    const imageUrl = httpsUrl(item.imageUrl)
    const permalink = httpsUrl(item.permalink, true)
    if (!imageUrl || !permalink || !['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(String(item.mediaType))) continue
    seen.add(item.id)
    posts.push({
      id: item.id,
      caption: typeof item.caption === 'string' ? item.caption.slice(0, 2200).trim() : '',
      mediaType: item.mediaType as InstagramPost['mediaType'],
      imageUrl,
      permalink,
      timestamp: typeof item.timestamp === 'string' && !Number.isNaN(Date.parse(item.timestamp)) ? item.timestamp : '',
    })
    if (posts.length === 5) break
  }
  return posts
}

export async function loadInstagramPosts(endpoint: string, signal: AbortSignal): Promise<InstagramPost[]> {
  const response = await fetch(endpoint, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
    credentials: 'omit',
    headers: { Accept: 'application/json' },
  })
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Không thể tải bài viết Instagram')
  return parseInstagramPosts(await response.json())
}
