import React from "react";
import { Quote } from "lucide-react";
import type { TestimonialsSectionData } from "@/lib/data/home";

interface TestimonialsProps {
  data: TestimonialsSectionData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  if (!data?.items || data.items.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-surface-container-low py-space-xl lg:py-margin-lg">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-space-xs max-w-2xl mb-space-xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-md text-label-md font-semibold tracking-wider uppercase">
            {data.eyebrow}
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* 2-Column Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {data.items.map((item) => {
            const isGold = item.accent === "gold";

            return (
              <div
                key={item.id}
                className={`bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-sm border-l-4 ${
                  isGold ? "border-secondary-container" : "border-primary"
                } flex flex-col justify-between border-t border-r border-b border-surface-variant/30`}
              >
                <div>
                  <Quote
                    className={`w-9 h-9 mb-space-sm ${
                      isGold ? "text-secondary" : "text-primary"
                    }`}
                  />
                  <blockquote className="font-headline-sm text-headline-sm italic text-primary leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-space-md mt-space-lg pt-space-md border-t border-surface-variant">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-headline-sm font-bold text-base ${
                      isGold
                        ? "bg-secondary-container/20 text-secondary"
                        : "bg-primary-fixed text-primary"
                    }`}
                  >
                    {item.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-primary">
                      {item.author}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
