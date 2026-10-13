type FeedPost = {
  id: string
  caption: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  imageUrl: string
  permalink: string
  timestamp: string
}

type Feed = { posts: FeedPost[]; updatedAt: string }
type Config = { accessToken?: string; userId?: string; apiVersion?: string; allowedOrigins: string[] }
type Dependencies = { fetch?: typeof fetch; now?: () => number }

const CACHE_TTL = 10 * 60 * 1000
const STALE_TTL = 60 * 60 * 1000
const RETRY_DELAY = 60 * 1000

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function safeUrl(value: unknown, post = false): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password) return undefined
    if (post && !['instagram.com', 'www.instagram.com'].includes(url.hostname)) return undefined
    return url.href
  } catch {
    return undefined
  }
}

function previewImage(item: Record<string, unknown>): string | undefined {
  if (item.media_type === 'VIDEO') return safeUrl(item.thumbnail_url)
  if (item.media_type === 'CAROUSEL_ALBUM' && record(item.children) && Array.isArray(item.children.data)) {
    for (const child of item.children.data) {
      if (!record(child)) continue
      const image = child.media_type === 'VIDEO' ? safeUrl(child.thumbnail_url) : safeUrl(child.media_url)
      if (image) return image
    }
  }
  return safeUrl(item.media_url)
}

export function normalizeInstagramMedia(value: unknown): FeedPost[] {
  if (!record(value) || !Array.isArray(value.data)) throw new Error('Invalid Instagram response')
  const seen = new Set<string>()
  const posts: FeedPost[] = []
  for (const item of value.data) {
    if (!record(item) || typeof item.id !== 'string' || !item.id || seen.has(item.id)) continue
    const imageUrl = previewImage(item)
    const permalink = safeUrl(item.permalink, true)
    if (!imageUrl || !permalink || !['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(String(item.media_type))) continue
    seen.add(item.id)
    posts.push({
      id: item.id,
      caption: typeof item.caption === 'string' ? item.caption.slice(0, 2200).trim() : '',
      mediaType: item.media_type as FeedPost['mediaType'],
      imageUrl,
      permalink,
      timestamp: typeof item.timestamp === 'string' && !Number.isNaN(Date.parse(item.timestamp)) ? item.timestamp : '',
    })
  }
  return posts.sort((a, b) => (Date.parse(b.timestamp) || 0) - (Date.parse(a.timestamp) || 0)).slice(0, 5)
}

// Public read-only endpoint for one account, fixed by server-side configuration.
// No upstream error payloads, account selection or access tokens are exposed.
export function createInstagramFeedHandler(config: Config, dependencies: Dependencies = {}) {
  const fetchGraph = dependencies.fetch ?? fetch
  const now = dependencies.now ?? Date.now
  let cache: { feed: Feed; fetchedAt: number } | undefined
  let pending: Promise<Feed> | undefined
  let retryAt = 0

  function refresh(): Promise<Feed> {
    if (pending) return pending
    pending = (async () => {
      const url = new URL(`https://graph.instagram.com/${config.apiVersion}/${config.userId}/media`)
      url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}')
      url.searchParams.set('limit', '12')
      const response = await fetchGraph(url, {
        headers: { Authorization: `Bearer ${config.accessToken}`, Accept: 'application/json' },
        signal: AbortSignal.timeout(7000),
      })
      if (!response.ok) throw new Error('Instagram unavailable')
      const posts = normalizeInstagramMedia(await response.json())
      const fetchedAt = now()
      const feed = { posts, updatedAt: new Date(fetchedAt).toISOString() }
      cache = { feed, fetchedAt }
      retryAt = 0
      return feed
    })().finally(() => { pending = undefined })
    return pending
  }

  return async function handle(request: Request): Promise<Response> {
    const origin = request.headers.get('Origin')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, apikey, authorization, x-client-info',
      'Vary': 'Origin',
      'X-Content-Type-Options': 'nosniff',
    }
    if (origin && !config.allowedOrigins.includes(origin)) {
      return new Response(JSON.stringify({ posts: [] }), { status: 403, headers })
    }
    if (origin) headers['Access-Control-Allow-Origin'] = origin
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers })
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ posts: [] }), { status: 405, headers: { ...headers, Allow: 'GET, OPTIONS' } })
    }
    const configured = config.accessToken && /^\d+$/.test(config.userId ?? '') && /^v\d+\.\d+$/.test(config.apiVersion ?? '')
    if (!configured) return new Response(JSON.stringify({ posts: [] }), { status: 503, headers: { ...headers, 'Cache-Control': 'no-store' } })

    try {
      const currentTime = now()
      let feed: Feed
      let stale = false
      if (cache && currentTime - cache.fetchedAt < CACHE_TTL) {
        feed = cache.feed
      } else {
        try {
          if (currentTime < retryAt) throw new Error('Retry later')
          feed = await refresh()
        } catch {
          if (currentTime >= retryAt) retryAt = now() + RETRY_DELAY
          if (!cache || now() - cache.fetchedAt >= STALE_TTL) throw new Error('No recent feed')
          feed = cache.feed
          stale = true
        }
      }
      return new Response(JSON.stringify({ ...feed, stale }), {
        headers: { ...headers, 'Cache-Control': stale ? 'public, max-age=60' : 'public, max-age=300, s-maxage=600' },
      })
    } catch {
      return new Response(JSON.stringify({ posts: [] }), { status: 503, headers: { ...headers, 'Cache-Control': 'no-store' } })
    }
  }
}
