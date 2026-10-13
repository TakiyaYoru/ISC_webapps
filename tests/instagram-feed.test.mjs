import test from 'node:test'
import assert from 'node:assert/strict'
import { createInstagramFeedHandler, normalizeInstagramMedia } from '../supabase/functions/_shared/instagram-feed.ts'
import { parseInstagramPosts, loadInstagramPosts } from '../src/services/instagram.ts'

const config = { accessToken: 'test-token-never-public', userId: '123456', apiVersion: 'v25.0', allowedOrigins: ['https://imperialskincare.vn'] }
const rawMedia = {
  id: '1', caption: 'Chăm sóc da mỗi ngày', media_type: 'IMAGE',
  media_url: 'https://cdn.example.com/photo.jpg', permalink: 'https://www.instagram.com/p/sample/', timestamp: '2026-10-13T00:00:00Z',
}
const request = () => new Request('https://edge.example.com/instagram-feed', { headers: { Origin: config.allowedOrigins[0] } })
const graphResponse = () => Response.json({ data: [rawMedia] })

test('video uses its thumbnail, and a carousel with a video cover gets a preview image', () => {
  const posts = normalizeInstagramMedia({ data: [
    { ...rawMedia, id: 'video', media_type: 'VIDEO', media_url: 'https://cdn.example.com/video.mp4', thumbnail_url: 'https://cdn.example.com/video.jpg' },
    { ...rawMedia, id: 'carousel', media_type: 'CAROUSEL_ALBUM', children: { data: [{ media_type: 'VIDEO', thumbnail_url: 'https://cdn.example.com/cover.jpg' }] } },
  ] })
  assert.equal(posts[0].imageUrl, 'https://cdn.example.com/video.jpg')
  assert.equal(posts[1].imageUrl, 'https://cdn.example.com/cover.jpg')
})

test('invalid media, unpreviewable videos, unsafe links and duplicates are discarded', () => {
  const posts = normalizeInstagramMedia({ data: [
    rawMedia, rawMedia,
    { ...rawMedia, id: 'video', media_type: 'VIDEO' },
    { ...rawMedia, id: 'unsafe', permalink: 'javascript:alert(1)' },
    { ...rawMedia, id: 'impostor', permalink: 'https://instagram.com.evil.example/p/1/' },
    { ...rawMedia, id: 'http', media_url: 'http://cdn.example.com/photo.jpg' },
  ] })
  assert.equal(posts.length, 1)
  assert.throws(() => normalizeInstagramMedia({ error: { message: 'test-token-never-public' } }))
})

test('feed is sorted by time, limited to five posts and captions are bounded', () => {
  const data = Array.from({ length: 12 }, (_, index) => ({ ...rawMedia, id: String(index), timestamp: `2026-10-${String(index + 1).padStart(2, '0')}T00:00:00Z`, caption: 'x'.repeat(4000) }))
  const posts = normalizeInstagramMedia({ data })
  assert.equal(posts.length, 5)
  assert.equal(posts[0].id, '11')
  assert.equal(posts[0].caption.length, 2200)
  assert.equal(parseInstagramPosts({ posts }).length, 5)
})

test('endpoint without server configuration never contacts Meta', async () => {
  let calls = 0
  const handler = createInstagramFeedHandler({ allowedOrigins: config.allowedOrigins }, { fetch: async () => { calls++; return graphResponse() } })
  const response = await handler(request())
  assert.equal(response.status, 503)
  assert.deepEqual(await response.json(), { posts: [] })
  assert.equal(calls, 0)
})

test('token only goes in the server Authorization header; response contains public media only', async () => {
  const handler = createInstagramFeedHandler(config, { fetch: async (url, options) => {
    assert.ok(!String(url).includes(config.accessToken))
    assert.ok(!String(url).includes('access_token='))
    assert.equal(options.headers.Authorization, `Bearer ${config.accessToken}`)
    assert.equal(new URL(url).hostname, 'graph.instagram.com')
    return graphResponse()
  } })
  const response = await handler(request())
  const body = await response.text()
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), config.allowedOrigins[0])
  assert.ok(!body.includes(config.accessToken))
  assert.equal(JSON.parse(body).posts[0].id, '1')
})

test('cached reads and concurrent visitors share one upstream request', async () => {
  let calls = 0
  const handler = createInstagramFeedHandler(config, { fetch: async () => { calls++; await new Promise(resolve => setTimeout(resolve, 10)); return graphResponse() } })
  await Promise.all(Array.from({ length: 8 }, () => handler(request())))
  await handler(request())
  assert.equal(calls, 1)
})

test('recent cached media survives a token error; retry cooldown is not prolonged by visitors', async () => {
  let time = 0
  let calls = 0
  let failed = false
  const handler = createInstagramFeedHandler(config, { now: () => time, fetch: async () => {
    calls++
    return failed ? Response.json({ error: { message: config.accessToken } }, { status: 401 }) : graphResponse()
  } })
  await handler(request())
  failed = true
  time = 11 * 60 * 1000
  const stale = await handler(request())
  assert.equal(stale.status, 200)
  assert.equal((await stale.json()).stale, true)
  time += 30 * 1000
  await handler(request())
  assert.equal(calls, 2)
  time += 31 * 1000
  await handler(request())
  assert.equal(calls, 3)
  time = 61 * 60 * 1000
  const expired = await handler(request())
  assert.equal(expired.status, 503)
  assert.ok(!(await expired.text()).includes(config.accessToken))
})

test('upstream errors are not exposed and unsupported methods/origins do not contact Meta', async () => {
  let calls = 0
  const handler = createInstagramFeedHandler(config, { fetch: async () => { calls++; return Response.json({ error: { message: config.accessToken } }, { status: 400 }) } })
  assert.equal((await handler(new Request(request().url, { method: 'POST' }))).status, 405)
  assert.equal((await handler(new Request(request().url, { headers: { Origin: 'https://untrusted.example' } }))).status, 403)
  assert.equal((await handler(new Request(request().url, { method: 'OPTIONS', headers: { Origin: config.allowedOrigins[0] } }))).status, 204)
  assert.equal(calls, 0)
  const response = await handler(request())
  assert.equal(response.status, 503)
  assert.ok(!(await response.text()).includes(config.accessToken))
})

test('client parser rejects arbitrary links and malformed response bodies', () => {
  assert.deepEqual(parseInstagramPosts('<html>static site fallback</html>'), [])
  const valid = normalizeInstagramMedia({ data: [rawMedia] })[0]
  assert.deepEqual(parseInstagramPosts({ posts: [{ ...valid, permalink: 'https://evil.example/' }, { ...valid, imageUrl: 'javascript:alert(1)' }] }), [])
  assert.equal(parseInstagramPosts({ posts: [valid, valid] }).length, 1)
})

test('client fetch requests no credentials and rejects a static HTML fallback', async t => {
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    assert.equal(options.credentials, 'omit')
    assert.equal(options.headers.Accept, 'application/json')
    return new Response('<html></html>', { headers: { 'Content-Type': 'text/html' } })
  })
  await assert.rejects(loadInstagramPosts('https://edge.example.com/instagram-feed', new AbortController().signal))
})

test('client cancellation is propagated and malformed JSON is rejected', async t => {
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    assert.equal(options.signal.aborted, true)
    throw new DOMException('Aborted', 'AbortError')
  })
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(loadInstagramPosts('https://edge.example.com/instagram-feed', controller.signal), { name: 'AbortError' })
  globalThis.fetch.mock.mockImplementation(async () => new Response('{', { headers: { 'Content-Type': 'application/json' } }))
  await assert.rejects(loadInstagramPosts('https://edge.example.com/instagram-feed', new AbortController().signal), SyntaxError)
})
