import React from "react";
import Image from "next/image";
import { BookOpen, ShoppingBag } from "lucide-react";
import type { BookData } from "@/lib/data/home";

interface BookFeatureProps {
  data: BookData;
}

export default function BookFeature({ data }: BookFeatureProps) {
  return (
    <section className="w-full bg-surface py-space-xl lg:py-margin-lg" id="the-book">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        <div className="bg-surface-container-low p-space-lg lg:p-space-xl rounded-xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left: Monograph Details */}
            <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-md text-label-md font-semibold tracking-wider uppercase">
                {data.eyebrow}
              </div>

              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                {data.titleEn}
              </h2>

              <p className="font-headline-sm text-headline-sm italic text-secondary">
                {data.titleMl}
              </p>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed mt-space-xs">
                {data.description}
              </p>

              <div className="flex items-center gap-space-sm text-secondary font-label-md text-label-md mt-space-xs">
                <BookOpen className="w-[18px] h-[18px]" />
                <span>{data.metadata}</span>
              </div>

              <div className="pt-space-md">
                <a
                  href={data.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-space-sm font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container px-space-xl py-space-md rounded-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <ShoppingBag className="w-5 h-5 text-secondary-container" />
                  <span>{data.ctaText}</span>
                </a>
              </div>
            </div>

            {/* Right: Illuminated Book Cover Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group max-w-[340px] w-full transition-transform duration-300 hover:-translate-y-1">
                {/* Luminous Gold Halo Glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 bg-secondary-container/30 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"
                />

                <div className="relative w-full aspect-[0.67] overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={data.coverImage.src}
                    alt={data.coverImage.alt}
                    fill
                    sizes="(max-width: 1024px) 340px, 340px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
