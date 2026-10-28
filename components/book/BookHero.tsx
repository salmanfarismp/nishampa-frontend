import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, BookOpen, Truck } from "lucide-react";
import type { BookHeroData } from "@/lib/data/book";

interface BookHeroProps {
  data: BookHeroData;
}

export default function BookHero({ data }: BookHeroProps) {
  const { metadata, lead, stats, ctas, shippingNote, pricePlaque, badge } =
    data;

  return (
    <section
      className="relative w-full bg-primary-container text-on-primary overflow-hidden py-space-xl md:py-24"
      aria-labelledby="book-hero-title"
    >
      {/* Ambient radial glow — decorative only */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/40 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          {/* ── Left Editorial Column ── */}
          <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
            {/* Metadata Pill Badges */}
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-secondary-fixed text-label-sm font-label-sm tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed flex-shrink-0" />
                {metadata.language}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-bright/10 text-surface text-label-sm font-label-sm tracking-wide">
                {metadata.pages}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed text-label-sm font-label-sm font-semibold">
                {metadata.edition}
              </span>
            </div>

            {/* Multilingual Title Group */}
            <div className="flex flex-col gap-space-xs mt-space-xs">
              <h1
                id="book-hero-title"
                className="text-display text-surface-bright font-bold leading-[1.25] [font-family:var(--font-noto-sans-ml,var(--font-serif))]"
              >
                {metadata.titleMl}
              </h1>
              <p className="text-headline-md text-secondary-fixed font-medium [font-family:var(--font-noto-sans-ml,var(--font-serif))]">
                {metadata.subtitleMl}
              </p>
              <p className="text-title-lg text-primary-fixed-dim tracking-wide font-normal">
                {metadata.titleEn}
              </p>
            </div>

            {/* Lead Paragraph */}
            <p className="text-body-lg text-surface-container-low/95 leading-[1.85] max-w-2xl mt-space-xs [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
              {lead}
            </p>

            {/* Proof Stats Row */}
            <div className="grid grid-cols-3 gap-space-md py-space-sm w-full max-w-lg mt-space-xs">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-headline-md text-secondary-fixed font-bold">
                    {stat.value}
                  </span>
                  <span className="text-label-sm text-surface-container-high tracking-wide [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              {ctas.map((cta) =>
                cta.variant === "primary" ? (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="inline-flex items-center gap-space-xs bg-secondary-container text-on-secondary-fixed text-title-md px-space-lg py-3.5 rounded-lg shadow-lg hover:bg-secondary-fixed-dim hover:shadow-xl hover:brightness-105 transition-all font-semibold active:scale-[0.99]"
                  >
                    <MessageSquare className="w-[18px] h-[18px]" />
                    <span>{cta.label}</span>
                  </Link>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="inline-flex items-center gap-space-xs bg-transparent text-surface hover:bg-surface/10 text-title-md px-space-lg py-3.5 rounded-lg transition-all border border-surface/20 active:scale-[0.99]"
                  >
                    <BookOpen className="w-[18px] h-[18px]" />
                    <span>{cta.label}</span>
                  </Link>
                )
              )}
            </div>

            {/* Shipping Note */}
            <div className="flex items-center gap-space-xs text-surface-container-high text-body-sm pt-space-xs">
              <Truck className="w-[18px] h-[18px] text-secondary-fixed flex-shrink-0" />
              <span className="[font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                {shippingNote}
              </span>
            </div>
          </div>

          {/* ── Right Visual Column ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-space-lg lg:mt-0 relative">
            <div className="relative w-full max-w-md group">
              {/* Warm ember aura behind book */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-gradient-to-tr from-secondary/30 via-primary-container to-transparent rounded-2xl blur-xl opacity-75"
              />

              {/* Book Cover Container */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-primary transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]">
                {/* Book Cover Image */}
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={metadata.coverImage.src}
                    alt={metadata.coverImage.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px"
                    className="object-cover"
                  />
                </div>

                {/* Authenticity Badge Overlay — top-right */}
                <div className="absolute top-4 right-4 bg-primary/95 text-surface px-3 py-2 rounded-lg shadow-md backdrop-blur-md flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary-fixed flex-shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-label-sm font-bold text-secondary-fixed leading-tight [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                      {badge.label}
                    </span>
                    <span className="text-[0.625rem] font-medium text-surface-container-high leading-none [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                      {badge.subLabel}
                    </span>
                  </div>
                </div>

                {/* Price Plaque — bottom inset */}
                <div className="p-space-md bg-surface-container-lowest text-on-surface flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-title-md text-primary font-bold leading-snug [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                      {pricePlaque.title}
                    </p>
                    <p className="text-body-sm text-on-surface-variant mt-0.5 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                      {pricePlaque.subtitle}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <span className="text-label-sm uppercase tracking-wider text-secondary font-bold block [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                      {pricePlaque.editionLabel}
                    </span>
                    <span className="text-title-lg font-bold text-primary">
                      {pricePlaque.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

