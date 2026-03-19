# VP Solutions Landing Page — Design Spec

## Overview

A dark, premium, animated landing page for **VP Solutions**, a Brazilian software house / solo founder studio specializing in full-stack web development. The page serves dual purpose: portfolio showcase and lead capture.

**Target audience:** Non-technical Brazilian entrepreneurs and aspiring founders who dream of building their own SaaS or digital product but have no tech background. They don't know VP Solutions and don't understand software development — the page must build trust, explain the journey simply, and make them feel confident that their idea can become reality.
**Language:** Portuguese (pt-BR) only.
**Tone:** Approachable, confident, benefit-focused. Zero jargon. Speak to dreams and outcomes, not technical capabilities. Think "we turn your idea into a real product" not "we do full-stack engineering".

---

## Tech Stack

- **Astro** — static site generator, ships zero JS by default, islands architecture for interactive parts
- **Tailwind CSS** — utility-first styling
- **TypeScript** — type safety
- **Vanilla JS** — for animations (particles, scroll reveal, counters) via Astro `<script>` tags

---

## Visual Identity

### Color Palette (Cyan Frost on Dark)

| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#050508` | Page background |
| `bg-secondary` | `#0a0a12` | Section alternates |
| `bg-card` | `#111118` | Card backgrounds |
| `border` | `#1a1a25` | Borders, dividers |
| `text-primary` | `#e2e8f0` | Headings, body |
| `text-secondary` | `#94a3b8` | Descriptions |
| `text-muted` | `#64748b` | Captions, labels |
| `accent` | `#06b6d4` | Primary accent (cyan) |
| `accent-light` | `#67e8f9` | Hover states, gradients |

### Typography

- **Font:** Inter (Google Fonts) — weights 300–900
- **Hero heading:** 72px, weight 800, letter-spacing -3px
- **Section titles:** 44px, weight 700, letter-spacing -1.5px
- **Body:** 14–16px, weight 400
- **Labels:** 11px, uppercase, letter-spacing 3px

### Visual Effects

- Subtle grid background (60px cells, masked with radial gradient)
- Floating gradient orbs (3 orbs, slow float animation, blur 80px)
- Particle network canvas (60 particles with connection lines at <150px distance)
- Cursor-following glow (400px radial gradient, cyan at 6% opacity)
- Glassmorphism on cards (backdrop-filter blur, semi-transparent backgrounds)

---

## Page Structure

### 1. Navigation (fixed)
- Logo: "VP." (text mark, accent dot)
- Links: Soluções, Resultados, Como Funciona, Sobre, Contato
- CTA button: "Quero Meu Projeto →"
- Frosted glass background with backdrop blur
- Slide-down entrance animation

### 2. Hero Section (100vh)
- Availability badge: green dot + "Disponível para novos projetos"
- Heading: "Sua ideia merece / virar realidade" (second line has gradient shimmer)
- Subheading: "Você tem a visão. Nós temos a expertise para transformá-la em um produto digital de verdade — do zero ao lançamento."
- Dual CTAs: "Quero Meu Projeto →" (primary) + "Veja Resultados ↓" (secondary)
- Stats strip: 50+ Projetos | 5+ Anos | 100% Satisfação (counter animation on load)
- Staggered fadeInUp animations (0.2s–1s delays)

### 3. Trust Marquee
- Infinite horizontal scroll — but instead of tech names (audience doesn't care), use trust signals
- Items: "Projetos entregues no prazo" · "Comunicação transparente" · "Sem surpresas no orçamento" · "Do zero ao produto final" · "Suporte pós-lançamento" · "Acompanhamento semanal"
- Duplicated content for seamless loop
- Bordered top/bottom

### 4. "Como Funciona" Section — The Journey (non-tech process explainer)
- **This is the KEY section for the non-tech audience**
- Section title: "Do sonho ao produto real" / subtitle: "Você não precisa entender de tecnologia. Só precisa ter uma boa ideia."
- 4 steps presented as a visual timeline/journey, jargon-free:
  1. **Você conta sua ideia** — "Conversamos sobre o que você imagina. Sem termos técnicos, sem complicação. Só sua visão."
  2. **Nós planejamos tudo** — "Transformamos sua ideia em um plano visual claro. Você aprova cada detalhe antes de começarmos."
  3. **Construímos juntos** — "Você acompanha o progresso toda semana. Vê seu produto ganhar vida, tela por tela."
  4. **Seu produto no ar** — "Lançamos, testamos, e garantimos que tudo funciona. E continuamos ao seu lado depois."
- Scroll reveal with staggered delays

### 5. Solutions Section (benefit-focused, 3-column grid, 3 cards)
- Section label: "Soluções" / title: "O que podemos criar para você"
- Cards rewritten for non-tech audience — focus on WHAT they get, not HOW we build:
  - **Seu próprio SaaS** — "Transforme sua ideia em uma plataforma online que gera receita recorrente. Do conceito ao produto completo."
  - **Site profissional** — "Presença digital que impressiona e converte. Landing pages, sites institucionais, e-commerce."
  - **Sistemas sob medida** — "Dashboards, portais, aplicações internas — ferramentas digitais feitas exatamente para o seu negócio."
- Hover: card lifts 8px, top border glow line appears, icon scales
- Scroll reveal with staggered delays

### 6. About / Founder Section — "Quem está por trás"
- **Critical trust-building section**
- Left side: founder photo placeholder + name + title
- Right side: short personal story — why VP Solutions exists, what drives the work, commitment to quality
- Tone: personal, authentic, approachable
- Example copy: "Sou [Nome], fundador da VP Solutions. Há mais de 5 anos ajudo empreendedores a tirarem suas ideias do papel e transformá-las em produtos digitais de verdade. Acredito que toda boa ideia merece a melhor execução — e é isso que entrego em cada projeto."
- Below: 2-3 trust badges/differentials (e.g., "100% dos projetos entregues", "Comunicação direta comigo", "Transparência total")

### 7. Portfolio Section (4 cards, 2-column grid)
- Section label: "Resultados" / title: "Ideias que viraram realidade"
- Cards: browser mockup image area, tag, title, description (benefit-focused, no tech jargon in main text)
- Projects (placeholder): Dashboard de Analytics, Marketplace B2B, App de Gestão Financeira, Portal de Telemedicina
- Tech tags kept small/subtle at bottom for credibility but not featured
- Hover: card lifts with glow, inner mockup lifts slightly
- Scroll reveal with staggered delays

### 8. CTA Section
- Glowing card with gradient background
- Top border accent line
- Heading: "Pronto para tirar sua ideia do papel?"
- Subtext: "Me conta sobre seu projeto. Respondo em até 24 horas — sem compromisso."
- Dual CTAs: WhatsApp (primary) + Email (secondary)
- Extra line: "Sem termos técnicos. Sem enrolação. Só uma conversa honesta sobre sua ideia."

### 9. Footer
- Simple: "© 2026 VP Solutions. Todos os direitos reservados."

---

## Animations & Interactions

| Element | Animation | Trigger |
|---|---|---|
| Nav | slideDown 0.6s | Page load |
| Hero elements | fadeInUp staggered (0.2–1s) | Page load |
| Gradient text | shimmer 3s infinite | Continuous |
| Stats numbers | Count from 0 to target (40 steps) | 1.2s after load |
| Availability dot | Pulse 2s infinite | Continuous |
| Tech marquee | translateX 30s linear infinite | Continuous |
| Cards, sections | fadeInUp 0.8s | Scroll into view (IntersectionObserver, threshold 0.1) |
| Service cards hover | translateY(-8px) + glow border + top line | Mouse hover |
| Project cards hover | translateY(-8px) scale(1.01) + inner mock lifts | Mouse hover |
| Primary button | Sweeping light shine + translateY(-2px) + glow shadow | Mouse hover |
| Secondary button | Border color change + subtle bg | Mouse hover |
| Nav links | Underline width animation | Mouse hover |
| Particles | 60 particles, random drift, connection lines | Continuous (requestAnimationFrame) |
| Floating orbs | float 20-30s ease-in-out infinite | Continuous |
| Cursor glow | Follows mouse position | Mouse move |

---

## Responsive Behavior

- **Desktop (>1024px):** Full layout as designed
- **Tablet (768–1024px):** Services grid → 2 columns, process steps → 2x2 grid
- **Mobile (<768px):** Single column throughout, hero text ~40px, nav hamburger menu, marquee continues, stats stack vertically

---

## SEO & Performance

- Astro SSG for static HTML output
- `<html lang="pt-BR">` for Brazilian Portuguese
- Meta tags: title, description, og:image in Portuguese
- Inter font loaded via `<link rel="preconnect">` + `font-display: swap`
- Particle canvas and cursor glow loaded as client-side islands
- Images lazy-loaded with proper alt text
- Lighthouse target: 95+ on all metrics

---

## File Structure (Astro Project)

```
vp-solutions-lp/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout with meta, fonts, global styles
│   ├── pages/
│   │   └── index.astro           # Main landing page composing all sections
│   ├── components/
│   │   ├── Nav.astro             # Fixed navigation
│   │   ├── Hero.astro            # Hero section
│   │   ├── TrustMarquee.astro    # Scrolling trust signals ticker
│   │   ├── HowItWorks.astro      # Non-tech process journey (key section)
│   │   ├── Solutions.astro       # Benefit-focused solutions grid
│   │   ├── About.astro           # Founder/trust section
│   │   ├── Projects.astro        # Portfolio grid
│   │   ├── CTA.astro             # Contact CTA section
│   │   └── Footer.astro          # Footer
│   ├── scripts/
│   │   ├── particles.ts          # Particle network canvas
│   │   ├── scroll-reveal.ts      # IntersectionObserver scroll animations
│   │   ├── counter.ts            # Stats counter animation
│   │   └── cursor-glow.ts        # Cursor following glow
│   └── styles/
│       └── global.css            # Tailwind imports + custom CSS animations
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Content Notes

- All text in Portuguese (pt-BR)
- **Tone is NON-TECHNICAL throughout** — no developer jargon in main copy. Tech terms only appear in subtle tech-tags on portfolio cards.
- Portfolio projects are placeholder — user will replace with real projects later
- Stats numbers (50+, 5+, 100%) are placeholder — user should adjust
- WhatsApp link needs real phone number
- Email CTA needs real email or mailto link
- About section needs real founder name and photo — placeholder used initially
- The "Como Funciona" section is the most important for conversion — it demystifies the process for non-tech users
