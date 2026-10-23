import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* ====================================================================
          Hero Environment: Concentrated Royal Navy Night Canvas
          Demonstrating luminous tension, hairline gold borders, and depth
          ==================================================================== */}
      <header className="bg-primary-container text-on-primary border-b border-brand-gold/15 relative overflow-hidden">
        {/* Subtle radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(226, 176, 35, 0.25) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter lg:px-gutter-lg py-space-xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-space-md border-b border-white/10 pb-space-lg mb-space-xl">
            <div className="flex items-center gap-space-sm">
              <span className="w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(226,176,35,0.8)]" />
              <span className="text-label-md tracking-widest text-brand-gold font-sans uppercase">
                Royal Editorial Canvas
              </span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-label-sm text-white/70">
                Design System Specification v1.0
              </span>
            </div>

            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                Tailwind CSS v4
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-white/10 text-white/90 border border-white/15">
                Next.js 16 (App Router)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            <div className="lg:col-span-7">
              <span className="text-label-md text-brand-gold uppercase tracking-wider block mb-space-xs">
                Theme Architecture & Smoke Test
              </span>
              <h1 className="text-display-mobile md:text-display text-white font-serif mb-space-md">
                Authoritative State, <span className="italic">Sanctuary of Light.</span>
              </h1>
              <p className="text-body-lg text-white/80 max-w-2xl font-sans mb-space-lg">
                Bridging an immersive, dramatic royal navy hero environment with
                an illuminated, breathable warm ivory editorial sanctuary below.
              </p>

              {/* Action Buttons in Hero */}
              <div className="flex flex-wrap items-center gap-space-md">
                <button
                  type="button"
                  className="bg-brand-gold text-primary font-sans font-medium px-5 py-2.5 rounded text-label-lg transition-all hover:brightness-105 active:scale-[0.99] shadow-[0_2px_12px_rgba(226,176,35,0.3)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-container cursor-pointer"
                >
                  Accent Hero Action
                </button>
                <button
                  type="button"
                  className="bg-transparent text-white border border-white/30 font-sans font-medium px-5 py-2.5 rounded text-label-lg transition-all hover:bg-white/10 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-primary-container cursor-pointer"
                >
                  Secondary Action
                </button>
                <button
                  type="button"
                  className="bg-transparent text-white/80 hover:text-white font-sans font-medium px-4 py-2.5 rounded text-label-lg transition-all hover:bg-white/5 cursor-pointer"
                >
                  Ghost Action →
                </button>
              </div>
            </div>

            {/* Elevated Hero Dark Card with Luminous Inner Glow */}
            <div className="lg:col-span-5">
              <div className="bg-primary-container border border-brand-gold/20 rounded-lg p-space-lg shadow-luminous-glow relative">
                <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-white/10">
                  <span className="text-label-sm text-brand-gold uppercase tracking-wider">
                    Hero Navy Elevation
                  </span>
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                </div>
                <h3 className="text-headline-sm font-serif text-white mb-space-xs">
                  Inner Luminous Glow Token
                </h3>
                <p className="text-body-sm text-white/70 mb-space-md">
                  Crafted via <code className="text-brand-gold font-mono text-xs">shadow-luminous-glow</code> with 12% gold opacity hairline border and ambient oceanic depth.
                </p>
                <div className="bg-black/30 rounded p-space-sm font-mono text-xs text-brand-gold/90 border border-brand-gold/15">
                  inset 0 1px 0 rgba(226,176,35,0.2), 0 12px 32px rgba(2,26,52,0.4)
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          Main Editorial Sanctuary: Warm Ivory Canvas (#FBF9F5)
          ==================================================================== */}
      <main className="max-w-7xl mx-auto px-gutter-sm md:px-gutter lg:px-gutter-lg py-space-xl space-y-space-xl">
        {/* SECTION 1: Typographic Hierarchy */}
        <section className="bg-surface-container-lowest border border-brand-linen rounded-lg p-space-lg md:p-space-xl shadow-editorial">
          <div className="border-b border-brand-linen pb-space-sm mb-space-lg flex items-center justify-between">
            <div>
              <span className="text-label-sm text-tertiary uppercase tracking-wider block">
                Typography Scale Spec
              </span>
              <h2 className="text-headline-md font-serif text-brand-slate">
                Typographic Hierarchy
              </h2>
            </div>
            <span className="text-label-sm text-on-surface-variant font-mono">
              Newsreader (Serif) & Inter (Sans)
            </span>
          </div>

          <div className="space-y-space-lg">
            {/* Display */}
            <div className="border-b border-brand-linen pb-space-md">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-label-sm text-outline font-mono">
                  text-display (Newsreader 3.5rem / 4rem / 400 / -0.02em)
                </span>
                <span className="text-label-sm text-brand-ochre font-medium">Serif Display</span>
              </div>
              <p className="text-display font-serif text-brand-slate">
                Prestige of Heritage <span className="italic text-primary-container">&amp; Literary Gravitas</span>
              </p>
            </div>

            {/* Headline Large */}
            <div className="border-b border-brand-linen pb-space-md">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-label-sm text-outline font-mono">
                  text-headline-lg (Newsreader 2.5rem / 3rem / 500 / -0.015em)
                </span>
                <span className="text-label-sm text-brand-ochre font-medium">Serif Headline LG</span>
              </div>
              <p className="text-headline-lg font-serif text-brand-slate">
                Authoritative Statesmanship with Warmth
              </p>
            </div>

            {/* Headline Medium */}
            <div className="border-b border-brand-linen pb-space-md">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-label-sm text-outline font-mono">
                  text-headline-md (Newsreader 1.75rem / 2.25rem / 500 / -0.01em)
                </span>
                <span className="text-label-sm text-brand-ochre font-medium">Serif Headline MD</span>
              </div>
              <p className="text-headline-md font-serif text-brand-slate">
                Thoughtful private-office craftsmanship and journal poise
              </p>
            </div>

            {/* Headline Small */}
            <div className="border-b border-brand-linen pb-space-md">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-label-sm text-outline font-mono">
                  text-headline-sm (Newsreader 1.25rem / 1.75rem / 600)
                </span>
                <span className="text-label-sm text-brand-ochre font-medium">Serif Headline SM</span>
              </div>
              <p className="text-headline-sm font-serif text-brand-slate">
                Structured Section Headings with Tactile Weight
              </p>
            </div>

            {/* Titles (Inter) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md border-b border-brand-linen pb-space-md">
              <div>
                <span className="text-label-sm text-outline font-mono block mb-1">
                  text-title-lg (Inter 1.25rem / 1.75rem / 600)
                </span>
                <p className="text-title-lg text-on-surface">
                  Interface Navigation Title
                </p>
              </div>
              <div>
                <span className="text-label-sm text-outline font-mono block mb-1">
                  text-title-md (Inter 1rem / 1.5rem / 600)
                </span>
                <p className="text-title-md text-on-surface">
                  Component Card &amp; Modal Header Title
                </p>
              </div>
            </div>

            {/* Body Copy (Inter) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md border-b border-brand-linen pb-space-md">
              <div>
                <span className="text-label-sm text-outline font-mono block mb-1">
                  text-body-lg (Inter 1.125rem / 400)
                </span>
                <p className="text-body-lg text-on-surface-variant">
                  Lead introductory paragraphs offering generous line-height and effortless scannability across desktop widths.
                </p>
              </div>
              <div>
                <span className="text-label-sm text-outline font-mono block mb-1">
                  text-body-md (Inter 0.9375rem / 400)
                </span>
                <p className="text-body-md text-on-surface-variant">
                  Standard interface copy engineered for high-density reading, form instructions, and content blocks.
                </p>
              </div>
              <div>
                <span className="text-label-sm text-outline font-mono block mb-1">
                  text-body-sm (Inter 0.8125rem / 400)
                </span>
                <p className="text-body-sm text-on-surface-variant">
                  Secondary captions, timestamps, and supplementary explanatory text maintaining legibility across screens.
                </p>
              </div>
            </div>

            {/* Labels & Microcopy with Extended Tracking */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="bg-surface-container-low p-space-sm rounded">
                <span className="text-outline font-mono text-[10px] block mb-1">
                  text-label-lg (Inter 0.875rem / 500 / 0.01em)
                </span>
                <p className="text-label-lg text-primary-container">
                  BUTTONS &amp; INTERACTIVE CONTROLS
                </p>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded">
                <span className="text-outline font-mono text-[10px] block mb-1">
                  text-label-md (Inter 0.75rem / 600 / 0.04em uppercase)
                </span>
                <p className="text-label-md text-primary-container">
                  METADATA &amp; FORM INPUT LABELS
                </p>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded">
                <span className="text-outline font-mono text-[10px] block mb-1">
                  text-label-sm (Inter 0.6875rem / 600 / 0.06em uppercase)
                </span>
                <p className="text-label-sm text-brand-ochre">
                  STATUS BADGES &amp; MICRO TAGS
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Palette & Surface Swatches */}
        <section className="space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-xs">
            <div>
              <span className="text-label-sm text-tertiary uppercase tracking-wider block">
                Color Engine
              </span>
              <h2 className="text-headline-md font-serif text-brand-slate">
                Semantic Color &amp; Surface Swatches
              </h2>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Every token from <code className="text-primary font-mono text-xs">design.md</code> mapped to Tailwind utilities
            </p>
          </div>

          {/* Surface Container Progression */}
          <div className="bg-surface-container-lowest border border-brand-linen rounded-lg p-space-lg shadow-editorial">
            <h3 className="text-title-md font-sans text-on-surface mb-space-sm">
              Surface Elevation Progression
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-sm">
              <div className="bg-surface-container-lowest border border-brand-linen p-space-sm rounded text-center">
                <span className="text-label-sm font-mono block text-on-surface">lowest</span>
                <span className="text-xs text-outline block">#ffffff</span>
                <div className="h-6 w-full rounded mt-1 bg-surface-container-lowest border border-brand-linen" />
              </div>
              <div className="bg-surface-container-low border border-brand-linen p-space-sm rounded text-center">
                <span className="text-label-sm font-mono block text-on-surface">low</span>
                <span className="text-xs text-outline block">#f5f3ef</span>
                <div className="h-6 w-full rounded mt-1 bg-surface-container-low" />
              </div>
              <div className="bg-surface-container border border-brand-linen p-space-sm rounded text-center">
                <span className="text-label-sm font-mono block text-on-surface">container</span>
                <span className="text-xs text-outline block">#efeeea</span>
                <div className="h-6 w-full rounded mt-1 bg-surface-container" />
              </div>
              <div className="bg-surface-container-high border border-brand-linen p-space-sm rounded text-center">
                <span className="text-label-sm font-mono block text-on-surface">high</span>
                <span className="text-xs text-outline block">#eae8e4</span>
                <div className="h-6 w-full rounded mt-1 bg-surface-container-high" />
              </div>
              <div className="bg-surface-container-highest border border-brand-linen p-space-sm rounded text-center">
                <span className="text-label-sm font-mono block text-on-surface">highest</span>
                <span className="text-xs text-outline block">#e4e2de</span>
                <div className="h-6 w-full rounded mt-1 bg-surface-container-highest" />
              </div>
              <div className="bg-surface-dim border border-brand-linen p-space-sm rounded text-center">
                <span className="text-label-sm font-mono block text-on-surface">dim</span>
                <span className="text-xs text-outline block">#dbdad6</span>
                <div className="h-6 w-full rounded mt-1 bg-surface-dim" />
              </div>
            </div>
          </div>

          {/* Key Semantic Actions Palette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
            {/* Primary Navy */}
            <div className="bg-primary-container text-white p-space-md rounded-lg shadow-sm">
              <span className="text-label-sm text-brand-gold uppercase tracking-wider block">
                Primary Container
              </span>
              <p className="text-title-md font-sans font-semibold mt-1">Deep Royal Navy</p>
              <div className="flex justify-between items-baseline mt-4 text-xs font-mono text-white/70">
                <span>bg-primary-container</span>
                <span>#023a72</span>
              </div>
            </div>

            {/* Secondary Gold */}
            <div className="bg-brand-gold text-primary p-space-md rounded-lg shadow-sm">
              <span className="text-label-sm text-primary uppercase tracking-wider block font-semibold">
                Secondary Accent
              </span>
              <p className="text-title-md font-sans font-semibold mt-1">Warm Luminous Gold</p>
              <div className="flex justify-between items-baseline mt-4 text-xs font-mono text-primary/80">
                <span>bg-brand-gold</span>
                <span>#e2b023</span>
              </div>
            </div>

            {/* Tertiary Ochre */}
            <div className="bg-tertiary text-on-tertiary p-space-md rounded-lg shadow-sm">
              <span className="text-label-sm text-brand-gold uppercase tracking-wider block">
                Tertiary Tone
              </span>
              <p className="text-title-md font-sans font-semibold mt-1">Burnished Ochre</p>
              <div className="flex justify-between items-baseline mt-4 text-xs font-mono text-white/70">
                <span>bg-tertiary</span>
                <span>#322200</span>
              </div>
            </div>

            {/* Error Container */}
            <div className="bg-error-container text-on-error-container p-space-md rounded-lg shadow-sm border border-error/20">
              <span className="text-label-sm text-error uppercase tracking-wider block font-semibold">
                Error State
              </span>
              <p className="text-title-md font-sans font-semibold mt-1">Destructive Alert</p>
              <div className="flex justify-between items-baseline mt-4 text-xs font-mono text-on-error-container/80">
                <span>bg-error-container</span>
                <span>#ffdad6</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Button Component Suite & Focus Ring Verification */}
        <section className="bg-surface-container-lowest border border-brand-linen rounded-lg p-space-lg md:p-space-xl shadow-editorial">
          <div className="border-b border-brand-linen pb-space-sm mb-space-lg flex items-center justify-between">
            <div>
              <span className="text-label-sm text-tertiary uppercase tracking-wider block">
                Component Standards
              </span>
              <h2 className="text-headline-md font-serif text-brand-slate">
                Button Suite &amp; Focus Rings
              </h2>
            </div>
            <span className="text-body-sm text-on-surface-variant">
              Press Tab to verify luminous gold focus rings
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-space-md">
            {/* Primary Navy Action with Gold Focus Ring */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                className="bg-primary-container text-surface px-5 py-2.5 rounded text-label-lg font-medium border border-[#012b55] transition-all hover:bg-primary active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 cursor-pointer shadow-sm"
              >
                Primary Navy Action
              </button>
              <span className="text-[11px] font-mono text-outline text-center">
                Gold Focus Ring
              </span>
            </div>

            {/* Accent Hero Action */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                className="bg-brand-gold text-primary font-sans font-medium px-5 py-2.5 rounded text-label-lg transition-all hover:brightness-105 active:scale-[0.99] shadow-[0_2px_12px_rgba(226,176,35,0.25)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                Accent Hero Action
              </button>
              <span className="text-[11px] font-mono text-outline text-center">
                Luminous Gold
              </span>
            </div>

            {/* Secondary / Outline */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                className="bg-transparent text-primary-container border border-primary-container font-sans font-medium px-5 py-2.5 rounded text-label-lg transition-all hover:bg-primary-container/5 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 cursor-pointer"
              >
                Secondary Outline
              </button>
              <span className="text-[11px] font-mono text-outline text-center">
                1px Navy Border
              </span>
            </div>

            {/* Ghost Button */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                className="bg-transparent text-primary-container font-sans font-medium px-4 py-2.5 rounded text-label-lg transition-all hover:bg-primary-container/[0.04] active:scale-[0.99] cursor-pointer"
              >
                Ghost Action
              </button>
              <span className="text-[11px] font-mono text-outline text-center">
                4% Navy Fade
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4: Editorial Cards, Micro-Components & Blockquotes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
          {/* Editorial Card with 1px border and elevation */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-brand-linen rounded-lg p-space-lg shadow-editorial relative overflow-hidden">
            {/* Featured top hairline variant (2px warm gold) */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gold" />

            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                {/* Category Chip */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm font-medium bg-[#f3efe6] text-primary-container border border-[#e5e0d3]">
                  Longform Journal
                </span>
                {/* Status Indicator */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-semibold bg-brand-gold/15 text-[#996e00]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#996e00]" />
                  Curated Dispatch
                </span>
              </div>
              <span className="text-body-sm text-outline font-mono">12 min read</span>
            </div>

            <h3 className="text-headline-md font-serif text-brand-slate mb-space-xs">
              The Architecture of Restraint
            </h3>
            <p className="text-body-md text-on-surface-variant mb-space-md">
              Visual depth is achieved through fine tonal boundaries and gentle surface layering rather than intense drop shadows. Standard cards feature low-contrast, warm-tinted outlines paired with ambient diffused shading.
            </p>

            {/* Editorial Blockquote */}
            <blockquote className="border-l-[3px] border-brand-gold pl-space-md py-1 my-space-md bg-surface-container-low/50 rounded-r">
              <p className="text-headline-sm font-serif italic text-primary-container">
                &ldquo;True authority doesn&rsquo;t shout. It speaks with typographic precision, measured rhythm, and luminous clarity.&rdquo;
              </p>
              <cite className="block text-label-sm font-sans font-bold text-brand-ochre mt-2 not-italic tracking-wider uppercase">
                — Royal Editorial Guidelines, Section 4.2
              </cite>
            </blockquote>

            <div className="flex items-center justify-between pt-space-sm border-t border-brand-linen text-body-sm text-on-surface-variant">
              <span>Published by Editorial Office</span>
              <a
                href="#read"
                className="text-label-lg font-medium text-primary-container hover:text-brand-ochre transition-colors"
              >
                Read Article →
              </a>
            </div>
          </div>

          {/* Form Controls & Verification Box */}
          <div className="lg:col-span-5 bg-surface-container-lowest border border-brand-linen rounded-lg p-space-lg shadow-editorial flex flex-col justify-between">
            <div>
              <span className="text-label-sm text-tertiary uppercase tracking-wider block mb-1">
                Input &amp; Metadata System
              </span>
              <h3 className="text-headline-sm font-serif text-brand-slate mb-space-sm">
                Interactive Form Controls
              </h3>

              <div className="space-y-space-md">
                {/* Input with Label */}
                <div>
                  <label
                    htmlFor="dispatch-email"
                    className="block text-label-md text-primary-container uppercase tracking-wider mb-1.5"
                  >
                    Subscriber Dispatch Email
                  </label>
                  <input
                    id="dispatch-email"
                    type="email"
                    placeholder="editor@gazette.org"
                    className="w-full bg-white border border-[#ddd9ce] text-on-surface text-body-md px-3.5 py-2.5 rounded focus:outline-none focus:border-primary-container focus:ring-3 focus:ring-primary-container/10 transition-all font-sans"
                  />
                  <span className="text-body-sm text-outline mt-1 block">
                    Focus snaps to #023A72 with an ambient 3px ring.
                  </span>
                </div>

                {/* Selection Controls */}
                <div className="pt-space-xs space-y-space-xs">
                  <span className="block text-label-md text-primary-container uppercase tracking-wider mb-2">
                    Preferences
                  </span>
                  <label className="flex items-center gap-space-sm cursor-pointer text-body-md text-on-surface">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded-sm border-1.5 border-[#b4aea0] accent-primary-container text-brand-gold cursor-pointer"
                    />
                    Receive weekly editorial monograph
                  </label>
                  <label className="flex items-center gap-space-sm cursor-pointer text-body-md text-on-surface">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-sm border-1.5 border-[#b4aea0] accent-primary-container text-brand-gold cursor-pointer"
                    />
                    Enable serif optical kerning dispatches
                  </label>
                </div>
              </div>
            </div>

            {/* Token Badge Footer */}
            <div className="mt-space-lg pt-space-sm border-t border-brand-linen flex items-center justify-between text-xs text-outline font-mono">
              <span>Radius: 0.25rem (DEFAULT)</span>
              <span>Elevation: shadow-editorial</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-linen bg-surface-container-low mt-space-xl py-space-lg">
        <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter lg:px-gutter-lg flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <p className="text-body-sm text-on-surface-variant font-sans">
            Royal Editorial Canvas • Scalable Design System Architecture
          </p>
          <p className="text-label-sm text-outline font-mono">
            Newsreader + Inter • Tailwind CSS v4 • Next.js 16
          </p>
        </div>
      </footer>
    </div>
  );
}
