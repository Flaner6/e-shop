# e-shop

A demo Next.js (Pages Router) e-commerce project showcasing different data-fetching strategies, MUI theming, and a simple AI chat widget.

---

## Features

- Next.js 15 + React 19 (Pages Router)
- MUI v6 with theme + dark mode toggle
- Fake Store API integration with:
  - Static Site Generation (SSG)
  - Incremental Static Regeneration (ISR)
  - Server-Side Rendering (SSR)
- Custom API routes:
  - `/api/products` → normalized products from fakestore
  - `/api/chat` → toy AI chat using TensorFlow.js Universal Sentence Encoder
- Middleware demo (`/middleware-ping`)
- Chat widget floating on all pages
- Developer experience: TypeScript, ESLint, Prettier, Husky, lint-staged

---

## Project Structure

```
src/
  components/   # UI components (Products, Chat, Welcome, etc.)
  lib/          # helpers (e.g., baseUrl resolver for ISR/SSG)
  pages/        # Pages Router routes and API under pages/api
  styles/       # CSS modules and global styles
  types/        # TypeScript types

next.config.ts
middleware.ts   # optional middleware demo
package.json
README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Install & Run

```bash
pnpm install
pnpm dev
```

Available scripts (from `package.json`):

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm start` — Run production server (after build)
- `pnpm lint` — Run ESLint + Prettier checks

---

## How it works

- The products pages use SSG with ISR for fast pages and SEO. Dynamic routes use `src/pages/products/[id].tsx`.
- The project includes examples of both SSG (with `getStaticProps` / `getStaticPaths`) and SSR (with `getServerSideProps`).
- The `api` routes provide a normalized local API layer that proxies the Fake Store API.

---

## Notes

- Images are fetched from the Fake Store API. For production, add `next/image` remote patterns in `next.config`.
- The AI chat (`/api/chat`) is a toy demo. It loads TensorFlow.js and may be heavy on cold starts.
- Middleware is optional and runs at the project root (`middleware.ts`). Middleware logs appear in the server terminal, not in the browser console.

---

## Roadmap / TODO

- Add a Redux Toolkit shopping cart and persist across pages
- Wire MUI SSR helpers (Emotion cache) to avoid style flicker
- Clean up dependencies and move dev-only packages to `devDependencies`
- Add `next/image` remote patterns for fakestore images
- (Optional) Migrate to App Router for RSC/layouts if needed

---
