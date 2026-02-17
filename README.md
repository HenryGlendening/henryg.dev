# henryg.dev

Personal website and blog for [Henry Glendening](https://henryg.dev) — software engineer building at the intersection of mobile and AI.

Built from scratch with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Inspired by patterns from [AstroPaper](https://github.com/satnaing/astro-paper) and [steipete.me](https://steipete.me), but all original code.

## Stack

- **Framework:** [Astro](https://astro.build) (static site generation)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + [@tailwindcss/typography](https://github.com/tailwindcss/typography)
- **Font:** Google Sans Mono (self-hosted)
- **Hosting:** [Vercel](https://vercel.com)
- **Feed:** RSS + sitemap auto-generation

## Commands

All commands run from the project root:

| Command | What it does |
|:--------|:-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Astro CLI help |

## Project Structure

```
src/
├── components/       # Reusable UI (Header, Footer, PostCard)
├── content.config.ts # Blog post schema (Zod validation)
├── consts.ts         # Site metadata, nav links, social links
├── data/blog/        # Blog posts organized by year (2026/, etc.)
├── layouts/          # Page layouts (Layout.astro, AboutLayout.astro)
├── pages/            # File-based routing
│   ├── posts/        # Blog listing + individual posts
│   ├── about.md      # About page (markdown)
│   ├── projects.astro
│   ├── rss.xml.ts    # RSS feed
│   └── robots.txt.ts
├── scripts/          # Client-side JS (theme toggle)
├── styles/           # Global CSS + typography
└── utils/            # Helper functions (post sorting/filtering)
public/
└── fonts/            # Self-hosted font files
```

### Blog Posts

Posts live in `src/data/blog/{year}/` as Markdown files with frontmatter:

```md
---
title: "Post Title"
pubDatetime: 2026-02-16T12:00:00Z
description: "A short description for listings and SEO."
tags: ["tag1", "tag2"]
draft: false
---

Post content here.
```

URLs follow year-based routing: `/posts/2026/hello-world/`

## License

- **Blog content** (`src/data/blog/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Code**: [MIT](LICENSE)

## Acknowledgments

Design patterns and approach inspired by [AstroPaper](https://github.com/satnaing/astro-paper) by Sat Naing and [steipete.me](https://steipete.me) by Peter Steinberger. All code written from scratch.
