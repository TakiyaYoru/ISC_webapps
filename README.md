# IMPERIAL Skin Care

Official website for **IMPERIAL Skin Care** — the consumer house of IMPERIAL Beauty Clinic. A clinical atelier of luxury skincare.

- **Design system:** The Clinical Atelier (editorial · minimal luxury)
- **Stack:** Vite · React 19 · TypeScript · Tailwind CSS · React Router · Framer Motion
- **Deploy:** Render (Static Site)

---

## Getting started

```bash
npm install
npm run dev         # http://localhost:5173
npm run build       # production build → ./dist
npm run preview     # preview the production build locally
```

## Project structure

```
src/
  components/    Nav, Footer, Logo, Reveal, ScrollToTop
  data/          products.ts, journal.ts  (static content)
  layouts/       MainLayout
  pages/         Home, Collection, ProductDetail, Rituals,
                 Journal, JournalArticle, About, Bespoke
  index.css      Tailwind + Clinical Atelier tokens
```

## Routes

| Path               | Page                         |
| ------------------ | ---------------------------- |
| `/`                | Home (editorial landing)     |
| `/collection`      | Product grid                 |
| `/product/:slug`   | Product detail               |
| `/rituals`         | Composed routines            |
| `/journal`         | Journal index                |
| `/journal/:slug`   | Journal article              |
| `/about`           | Atelier & provenance         |
| `/bespoke`         | Private consultation request |

## Deployment — Render

The repo ships with a [`render.yaml`](./render.yaml) for one-click deploy.

1. Push this repo to GitHub.
2. In Render, **New → Blueprint** → connect the repo → *apply*.
3. Render will build (`npm ci && npm run build`) and serve `./dist` as a Static Site.
4. A `/*` rewrite to `/index.html` is configured so React Router works.

Alternatively, without the blueprint: **New → Static Site** → Build `npm ci && npm run build`, Publish `dist`, add one rewrite rule `/*  →  /index.html  (200)`.

## Roadmap (phase 2)

- [ ] Cart drawer + checkout flow
- [ ] Stripe integration for payments
- [ ] CMS (Sanity / Contentful) for journal & products
- [ ] Client account area
- [ ] Booking integration with clinic calendar
