import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FieldworkSectionData } from "@/lib/data/home";

interface FieldworkGalleryProps {
  data: FieldworkSectionData;
}

export default function FieldworkGallery({ data }: FieldworkGalleryProps) {
  return (
    <section id="fieldwork" className="w-full bg-surface py-space-xl lg:py-margin-lg">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
          <div className="flex flex-col items-start gap-space-xs max-w-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-md text-label-md font-semibold tracking-wider uppercase">
              {data.eyebrow}
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              {data.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {data.description}
            </p>
          </div>

          <Link
            href={data.viewAllLink.href}
            className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-primary hover:text-secondary transition-colors font-medium group"
          >
            <span>{data.viewAllLink.label}</span>
            <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-surface-variant/40"
            >
              {/* Image Frame with Smooth Scale Zoom */}
              <div className="relative w-full aspect-square overflow-hidden bg-surface-container">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Metadata */}
              <div className="p-space-md flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="font-title-md text-title-md text-primary">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
