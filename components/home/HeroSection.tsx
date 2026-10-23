import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import type { HeroData } from "@/lib/data/home";

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-primary-container text-on-primary overflow-hidden pb-20 lg:pt-36 lg:pb-28 pt-20">
      {/* Ambient gold/navy atmospheric glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[540px] h-[540px] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-20 w-[420px] h-[420px] bg-primary/40 rounded-full blur-2xl pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start gap-space-lg">
            {/* Dignified Serif Headline */}
            <h1 className="font-display text-display leading-tight text-on-primary tracking-tight">
              {data.headlinePrefix}
              <span className="font-headline-lg italic text-secondary-container">
                {data.headlineAccent}
              </span>
              {data.headlineSuffix}
            </h1>

            {/* Crisp Subtext */}
            <p className="font-body-lg text-body-lg text-primary-fixed max-w-2xl leading-relaxed">
              {data.lead}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <Link
                href={data.primaryCta.href}
                className="inline-flex items-center gap-space-sm font-label-lg text-label-lg bg-secondary-container text-primary px-space-xl py-space-md rounded-lg font-bold shadow-md hover:brightness-110 hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <span>{data.primaryCta.label}</span>
                <ArrowRight className="w-[18px] h-[18px]" />
              </Link>

              <Link
                href={data.secondaryCta.href}
                className="inline-flex items-center gap-space-sm font-label-lg text-label-lg border border-primary-fixed/40 text-on-primary px-space-xl py-space-md rounded-lg font-medium hover:bg-on-primary/10 transition-all active:scale-[0.99]"
              >
                <span>{data.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Proof Metrics Counter Strip */}
            <div className="w-full grid grid-cols-3 gap-space-md pt-space-xl border-t border-primary-fixed/15 mt-space-md">
              {data.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <span className="font-display text-headline-lg text-secondary-container leading-none font-medium">
                    {metric.value}
                  </span>
                  <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider mt-1">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[420px] rounded-xl overflow-hidden bg-primary shadow-2xl p-2 bg-gradient-to-b from-secondary-container/20 to-transparent">
              {/* Portrait Graphic */}
              <div className="relative w-full aspect-[0.94] overflow-hidden rounded-lg shadow-inner">
                <Image
                  src={data.portrait.src}
                  alt={data.portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>

              {/* Floating Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-primary-container/95 backdrop-blur-md px-space-md py-space-sm rounded-lg border border-secondary-container/30 shadow-xl flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center flex-shrink-0 text-secondary-container">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-primary font-bold truncate">
                    {data.badge.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary-container truncate">
                    {data.badge.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
