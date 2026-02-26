# AGENTS.md — henryg.dev

Instructions for AI coding agents working on this project.

## Project Overview

Personal website/blog at henryg.dev. Astro + Tailwind CSS, deployed to Vercel.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build → ./dist/
npm run preview   # Preview production build locally
```

**Always verify with `npm run build`** before committing. The build must succeed with zero errors.

## Architecture

- **Astro 5.x** with static output — no SSR, no client-side framework
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`)
- **Content Collections** for blog posts (`src/data/blog/{year}/*.md`)
- Dark/light theme toggle via `src/scripts/theme.ts`

### Key Files

| File | Purpose |
|------|---------|
| `src/consts.ts` | Site metadata, nav links, social links |
| `src/content.config.ts` | Blog post schema (Zod) |
| `src/layouts/Layout.astro` | Base HTML layout, meta tags, OG |
| `src/styles/global.css` | Tailwind imports + CSS variables |
| `src/styles/typography.css` | Prose/markdown styling |
| `astro.config.mjs` | Astro + plugin config |

### Astro Content API (v5+)

Use the newer API patterns:

```ts
// ✅ Correct
import { render } from "astro:content";
const { Content } = await render(post);
const slug = post.id;

// ❌ Wrong (old API)
const { Content } = await post.render();
const slug = post.slug;
```

## Style Guide

- **Font:** Google Sans Mono everywhere (body + code), self-hosted in `public/fonts/`
- **Palette:** "Forest Floor" — see `src/styles/global.css` for CSS variables
- **Spacing:** Mobile-first, minimal padding, content-focused
- **No UI frameworks** — plain Astro components + Tailwind utilities

## Blog Posts

- The site layout renders the frontmatter `title` as the page heading — do NOT include a duplicate `# H1` at the top of post content (it will appear twice)
- Location: `src/data/blog/{year}/{slug}.md`
- URL pattern: `/posts/{year}/{slug}/`
- Required frontmatter: `title`, `pubDatetime`, `description`
- Optional: `tags`, `draft`, `modDatetime`, `ogImage`

## Git Conventions

- **Commit format:** `type: description` (e.g., `feat: add search page`, `fix: mobile nav spacing`)
- **Types:** `feat`, `fix`, `style`, `refactor`, `content`, `chore`, `docs`
- **Atomic commits** — one logical change per commit
- **Branch:** `main` (production), feature branches for larger work

## Deployment

- **Vercel** auto-deploys from `main`
- Preview deployments on branches/PRs
- No server-side runtime — pure static

## What NOT to Do

- Don't add client-side JS frameworks (React, Vue, etc.) — keep it static
- Don't modify `public/fonts/` — font files are checked in as-is
- Don't use `post.render()` or `post.slug` — use `render(post)` and `post.id`
- Don't add unit tests — CI is lint + build only
