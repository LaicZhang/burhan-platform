# Repository Guidelines

## Project Structure & Module Organization

Burhan is a Nuxt 4 multi-tenant platform (Vue 3 + Supabase + Tailwind).

- `app/` — Frontend: `pages/` (routing), `components/` (`ui/`, `dashboard/`, `tenant/`, `hub/`, `premium/`), `composables/`, `layouts/`, `middleware/`, `i18n/` (`zh.json`, `en.json`), `types/`, `utils/`, `assets/css/`
- `server/` — Nitro API: `api/` (`auth`, `orgs`, `entities`, `observatory`, `admin`), `utils/`
- `supabase/` — `migrations/` and `schema.sql`
- `public/` — Static assets and PWA icons
- `docs/` — Changelog and project notes

## Build, Test, and Development Commands

```bash
pnpm install          # Install deps (runs nuxt prepare)
cp .env.example .env # Configure Supabase (+ optional Turnstile)
pnpm dev          # Local dev server
pnpm build        # Production build
pnpm generate     # Static generation
pnpm preview      # Preview production build
pnpm typecheck    # TypeScript checks
pnpm lint         # ESLint via @nuxt/eslint
```

Apply DB changes with Supabase migrations or `supabase/schema.sql`. Never commit real keys.

## Coding Style & Naming Conventions

- TypeScript throughout; Vue SFCs use `<script setup lang="ts">`
- Components: PascalCase (`GlassCard.vue`, `RichTextEditor.vue`)
- Composables: `useX` (`useUser`, `useOrg`, `useLocale`)
- Prefer Nuxt auto-imports; colocate feature UI under the matching component folder
- Tailwind utility classes; keep Onyx/Gold tokens from `tailwind.config.ts` / `main.css`
- Support bilingual ZH/EN (both LTR); update both `app/i18n/zh.json` and `en.json`
- Prefer logical CSS properties for layout direction

## Testing Guidelines

No dedicated unit/e2e suite is checked in yet. Before opening a PR:

1. `pnpm typecheck`
2. `pnpm lint`
3. Manually verify tenant isolation, auth middleware, and bilingual UI paths you touch

If you add tests, colocate them near the feature and document the runner in the PR.

## Commit & Pull Request Guidelines

No strict history convention is enforced. Use short, imperative subjects:

- `fix: prevent empty org list crash on hub`
- `feat: redesign about page glass cards`

PRs should include: summary, linked issue (if any), env/migration notes, and screenshots for UI. Call out RLS, auth, or i18n (zh/en) impacts.

## Security & Configuration Tips

- Secrets live in `.env` only (`SUPABASE_*`, Turnstile keys). Use placeholders in docs.
- Respect PostgreSQL RLS and the RBAC roles: `super_admin`, `owner`, `manager`, `member`.
- Keep service-role usage server-side (`server/utils`); never expose `SUPABASE_SECRET_KEY` to the client.
