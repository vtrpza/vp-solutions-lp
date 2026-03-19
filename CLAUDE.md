# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

VP Solutions landing page — a marketing site for a Brazilian digital product development agency. Content is in pt-BR.

## Tech Stack

- **Astro 6** (static site generator, zero-JS by default)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin
- **GSAP 3** for scroll-triggered animations, horizontal scrolling, and text reveals
- **Lenis** for smooth scrolling (replaces native `scroll-behavior`)
- **split-type** for character/word-level text animation splits
- **TypeScript** for client-side scripts
- No frontend frameworks (React/Vue) — all interactivity is vanilla TS

## Commands

```bash
npm run dev       # Dev server (localhost:4321)
npm run build     # Production build → dist/
npm run preview   # Preview production build
```

**Requires:** Node >=22.12.0, npm >=7

## Architecture

Single-page landing site. All sections are Astro components composed in `src/pages/index.astro`.

**Component render order:** Nav → Hero → TrustMarquee → HowItWorks → Solutions → About → Projects → FAQ → CTA → Footer

**Layout** (`src/layouts/Layout.astro`): Wraps all content with `<html lang="pt-BR">`, global background effects (grid, orbs, particles canvas, cursor), page loader overlay, and imports all client scripts via a single `<script>` block.

**Client scripts** (`src/scripts/`): All loaded from Layout.astro in this order:
1. `smooth-scroll` — Lenis smooth scroll init
2. `page-loader` — loading overlay dismissal
3. `hero-entrance` — GSAP timeline for hero section entrance
4. `gsap-animations` — ScrollTrigger-based animations (horizontal scroll panels, section reveals, parallax)
5. `particles` — canvas particle system (adapts count/distance for mobile)
6. `adam-hands` — hero image animation
7. `custom-cursor` — custom dot+ring cursor (disabled on touch devices)
8. `magnetic` — magnetic hover effect on buttons/links
9. `card-tilt` — 3D tilt effect on cards via mouse tracking
10. `text-reveal` — split-type character reveals on scroll
11. `terminal-typing` — typewriter effect in terminal UI components
12. `counter` — animated number counters in Hero section

## Design System

Defined in `src/styles/global.css` via Tailwind 4 `@theme` directive:

- **Dark theme:** bg `#050508`, cards `#111118`, borders `#1a1a25`
- **Accent:** cyan `#06b6d4`, light cyan `#67e8f9`, glow `#06b6d422`
- **Fonts:** Inter (sans), JetBrains Mono (mono) — loaded via Google Fonts
- **Key utility classes:** `.glass-card`, `.btn-primary`, `.btn-secondary`, `.gradient-text`, `.card-spotlight`, `.terminal`, `.reveal`, `.reveal-delay-{1-5}`, `.line-clip`
- **Custom animations:** `float`, `shimmer`, `marquee`, `marquee-reverse`, `pulse-dot`, `slideDown`, `fadeInUp`, `gradient-sweep`, `border-glow`, `blink`
- **Custom cursor:** `cursor: none` on body; `.cursor-dot` + `.cursor-ring` elements. Touch devices get `cursor: auto` via `@media (hover: none)`.

## Patterns

- Component data (solutions, steps, projects, badges, FAQs) is defined as arrays in each component's frontmatter and rendered with `.map()`
- SVG icons are stored as inline strings within component data
- GSAP ScrollTrigger drives most scroll-based animations; the older `.reveal` CSS class system still coexists for simpler fade-ins
- TrustMarquee duplicates items (`[...items, ...items]`) for seamless infinite scroll
- Mobile responsiveness: Tailwind `sm:`/`md:`/`lg:` breakpoints, hamburger menu toggle in Nav
- `<noscript>` block in Layout ensures content is visible with JS disabled (hides loader, removes reveal transforms, hides cursor)
- Static output — `dist/` is pure HTML/CSS/JS, deployable to any CDN with no server runtime
