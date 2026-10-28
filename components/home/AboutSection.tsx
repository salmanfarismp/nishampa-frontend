import React from "react";
import Image from "next/image";
import { GraduationCap, Building2, Network, Award } from "lucide-react";
import type { AboutSectionData, AboutIconName } from "@/lib/data/home";

interface AboutSectionProps {
  data: AboutSectionData;
}

const iconMap: Record<AboutIconName, React.ComponentType<{ className?: string }>> = {
  school: GraduationCap,
  advisory: Building2,
  initiatives: Network,
  credentials: Award,
};

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="w-full bg-surface py-space-xl lg:py-margin-lg border-b border-surface-variant scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:sticky lg:top-24">
            <div className="relative w-full max-w-[420px] flex flex-col items-center justify-center">
              <Image
                src={data.portrait.src}
                alt={data.portrait.alt}
                width={720}
                height={900}
                className="w-full max-w-[360px] h-auto object-cover select-none pointer-events-none"
                priority
              />
            </div>
          </div>

          {/* Right Column: Bio & Leadership */}
          <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/20 border border-secondary-container/30 text-secondary font-label-md text-label-md font-semibold tracking-wider uppercase">
              {data.eyebrow}
            </div>

            {/* Headline */}
            <h2 className="font-display text-headline-lg text-primary tracking-tight leading-tight">
              {data.headline}
            </h2>

            {/* Editorial Paragraphs */}
            <div className="flex flex-col gap-space-sm text-on-surface-variant leading-relaxed">
              <p className="font-body-lg text-body-lg text-primary/90 font-medium">
                {data.lead}
              </p>
              <p className="font-body-md text-body-md">
                {data.bio}
              </p>
            </div>

            {/* 4-Card Highlight Grid */}
            <div className="w-full pt-space-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {data.cards.map((card) => {
                  const Icon = iconMap[card.icon] || GraduationCap;
                  return (
                    <div
                      key={card.id}
                      className="bg-surface-container-low p-space-md rounded-xl border border-secondary-container/20 flex flex-col gap-1.5 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-[18px] h-[18px]" />
                        </div>
                        <h3 className="font-title-md text-title-md text-primary font-bold">
                          {card.title}
                        </h3>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                        {card.role}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Philosophy Quote Banner */}
            <div className="w-full bg-surface-container-lowest p-space-md rounded-xl border-l-4 border-secondary-container shadow-sm mt-space-xs">
              <p className="font-headline-sm text-body-lg italic text-primary leading-relaxed">
                {data.quote}{" "}
                <span className="text-secondary font-semibold not-italic text-label-md uppercase tracking-wider block sm:inline sm:ml-2">
                  {data.quoteAuthor}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

