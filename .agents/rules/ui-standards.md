# Nishampa UI Architecture & Design Standards

This document defines the architectural, visual, and code standards for the Nishampa frontend. Adhere to these standards for all UI components, pages, and layout modifications to ensure visual cohesion and minimal iteration cycles.

---

## 1. Design System & Aesthetics: "Royal Editorial Canvas"

The UI expresses a balance between authoritative statesmanship and intimate human warmth, pairing an immersive royal navy night zone with an illuminated, breathable ivory editorial sanctuary.

### Color Tokens & Atmosphere Mapping
* **Night Canvas (Dark Zones - Navbar, Hero, Consultation Closing)**:
  * Background: `bg-primary` (`#00244c`) or `bg-primary-container` (`#023a72`)
  * Text: Primary `text-on-primary` (`#ffffff`), Muted `text-primary-fixed` (`#d5e3ff`), Subtext `text-primary-fixed-dim` (`#a8c8ff`)
  * Atmosphere: Ambient soft glows with `bg-secondary-container/10 blur-3xl rounded-full pointer-events-none`
  * Hairline borders: `border-primary-fixed/15` or `border-secondary-container/30`
* **Editorial Sanctuary Canvas (Light Zones - Main Content, Articles, Bento, Gallery)**:
  * Base Background: `bg-surface` (`#fbf9f5`)
  * Section Alternation: `bg-surface-container-low` (`#f5f3ef`)
  * Card Surfaces: `bg-surface-container-lowest` (`#ffffff`) or `bg-surface-container` (`#efeeea`)
  * Card Borders: `border border-surface-variant/40` (`#e4e2de`)
  * Primary Text: `text-primary` (`#00244c`) or `text-on-surface` (`#1b1c1a`)
  * Secondary / Body Text: `text-on-surface-variant` (`#434750`)
* **Luminous Gold Accent**:
  * Class: `bg-secondary-container` (`#ffca40`), `text-secondary` (`#775a00`), or `text-secondary-fixed`
  * Rule: Illuminant accent only (badges, active pills, quote marks, counter values, hero primary CTA). Never use as large background masses.

---

## 2. Typography Standard & Tailwind Utilities

Always pair the font family utility with its corresponding text size utility.

### Newsreader (Serif - Literary & Editorial Prestige)
* **Display Headline**: `font-display text-display leading-tight tracking-tight`
* **Section Headline Large**: `font-headline-lg text-headline-lg text-primary tracking-tight`
* **Sub-headline / Quotes**: `font-headline-sm text-headline-sm italic text-secondary` (ideal for Malayalam text & testimonials)

### Inter (Sans-Serif - Interface & Structure)
* **Title Large (Card Titles)**: `font-title-lg text-title-lg text-primary`
* **Title Medium**: `font-title-md text-title-md text-primary`
* **Body Large (Intro text)**: `font-body-lg text-body-lg leading-relaxed`
* **Body Medium (General copy)**: `font-body-md text-body-md leading-relaxed text-on-surface-variant`
* **Body Small (Footnotes / Meta)**: `font-body-sm text-body-sm text-on-surface-variant`
* **Label Large (Buttons)**: `font-label-lg text-label-lg font-bold`
* **Label Medium (Eyebrows / Badges)**: `font-label-md text-label-md font-semibold tracking-wider uppercase`
* **Label Small (Micro tags / Footers)**: `font-label-sm text-label-sm font-bold uppercase tracking-wider`

---

## 3. Data-Driven Architecture (Zero Hardcoding)

1. **Content in `lib/data/`**: All text, links, image URLs, badges, and metrics must be declared in dedicated data files (e.g., `lib/data/home.ts`, `lib/data/about.ts`).
2. **Explicit Interfaces**: Every section data structure must have an exported TypeScript interface.
3. **Props Convention**: Section components must accept typed props:
   ```tsx
   interface FeatureSectionProps {
     data: FeatureSectionData;
   }
   export default function FeatureSection({ data }: FeatureSectionProps) { ... }
   ```
4. **Clean Parent Pages**: Page components (`app/page.tsx`, `app/*/page.tsx`) assemble sections and pass data slices down without inline copy.

---

## 4. Component Rules & Server/Client Boundary

* **Server Components by Default**: Never add `"use client"` to display or layout sections. Keep them React Server Components (RSC).
* **"use client" Exception**: Only mark components with `"use client"` when they manage interactive client state (e.g. mobile drawer toggles, tabs, interactive modals, form inputs).
* **Next.js Imports**:
  * Use `next/image` for all images with `sizes`, `alt`, and aspect-ratio wrappers. Use `priority` only for hero above-the-fold assets.
  * Use `next/link` for internal routes, passing `data-path` attributes for telemetry/tracking where applicable.
* **Icons**: Use `lucide-react` exclusively. Sizing should be standardized (`w-4 h-4`, `w-5 h-5`, `w-[18px] h-[18px]`, `w-6 h-6`).

---

## 5. Structural Layout & Spacing Engine

* **Max Width & Gutters**:
  ```tsx
  <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
  ```
* **Section Vertical Cadence**:
  ```tsx
  <section className="w-full bg-surface py-space-xl lg:py-margin-lg">
  ```
* **Standard Section Header**:
  ```tsx
  <div className="flex flex-col items-start gap-space-xs max-w-2xl mb-space-xl">
    <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-md text-label-md font-semibold tracking-wider uppercase">
      {data.eyebrow}
    </div>
    <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
      {data.title}
    </h2>
    <p className="font-body-lg text-body-lg text-on-surface-variant">
      {data.description}
    </p>
  </div>
  ```

---

## 6. Micro-Interactions & Radii Rules

* **Radii System**:
  * Buttons / Inputs / Icon containers: `rounded-lg` (8px)
  * Cards / Banners / Panels: `rounded-xl` (12px)
  * Eyebrows / Badges / Avatars: `rounded-full` (strictly for pill elements)
* **Micro-Interactions**:
  * Buttons: `hover:brightness-110 shadow-md hover:shadow-lg transition-all active:scale-[0.99]`
  * Cards: `hover:-translate-y-0.5 hover:shadow-md transition-all`
  * Card Images: `overflow-hidden` with inner `transition-transform duration-500 group-hover:scale-105`
  * Action Links: `ArrowRight` with `transition-transform group-hover:translate-x-0.5`
  * Header Nav Links: Hover underline expanding from 0 to 100%: `group-hover:w-full`.

