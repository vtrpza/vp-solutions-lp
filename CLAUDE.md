# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

VP Solutions landing page — a marketing site for a Brazilian digital product development agency. Content is in pt-BR.

## Tech Stack

- **Astro 6** (static site generator, zero-JS by default)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin
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

```
src/
├── pages/index.astro          # Single route, assembles all section components
├── layouts/Layout.astro       # Master layout (head/meta, background effects, script imports)
├── components/                # Section components rendered in order:
│   │                          #   Nav → Hero → TrustMarquee → HowItWorks →
│   │                          #   Solutions → About → Projects → CTA → Footer
├── styles/global.css          # Tailwind @theme tokens, custom animations, utility classes
└── scripts/                   # Client-side vanilla TS
    ├── particles.ts           # Canvas particle system (adapts count/distance for mobile)
    ├── cursor-glow.ts         # Cursor-following glow (disabled on touch devices)
    ├── scroll-reveal.ts       # Intersection Observer for .reveal elements
    └── counter.ts             # Animated number counters in Hero section
```

## Design System

Defined in `src/styles/global.css` via Tailwind 4 `@theme` directive:

- **Dark theme:** bg `#050508`, cards `#111118`, borders `#1a1a25`
- **Accent:** cyan `#06b6d4`, light cyan `#67e8f9`, glow `#06b6d422`
- **Key utility classes:** `.glass-card`, `.btn-primary`, `.btn-secondary`, `.gradient-text`, `.reveal`, `.reveal-delay-{1-5}`
- **Custom animations:** `float`, `shimmer`, `marquee`, `pulse-dot`, `slide-down`, `fadeInUp`

## Patterns

- Component data (solutions, steps, projects, badges) is defined as arrays in each component's frontmatter and rendered with `.map()`
- SVG icons are stored as inline strings within component data
- Scroll reveal uses staggered delays via `reveal-delay-{index+1}` classes
- TrustMarquee duplicates items (`[...items, ...items]`) for seamless infinite scroll
- Mobile responsiveness: Tailwind `sm:`/`md:`/`lg:` breakpoints, hamburger menu toggle in Nav
- Static output — `dist/` is pure HTML/CSS, deployable to any CDN with no server runtime
