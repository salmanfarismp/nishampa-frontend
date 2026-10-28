import React from "react";
import { Quote } from "lucide-react";
import type { PullQuoteData } from "@/lib/data/book";

interface PullQuoteBannerProps {
  data: PullQuoteData;
}

export default function PullQuoteBanner({ data }: PullQuoteBannerProps) {
  const { quote, author, citation } = data;

  return (
    <section className="w-full bg-surface-container-low py-space-lg">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
          {/* Quote Icon */}
          <div className="lg:col-span-1 flex justify-start lg:justify-center">
            <Quote
              className="w-10 h-10 text-secondary flex-shrink-0"
              aria-hidden="true"
            />
          </div>

          {/* Blockquote */}
          <div className="lg:col-span-8">
            <blockquote className="text-headline-sm text-primary font-medium leading-relaxed [font-family:var(--font-noto-sans-ml,var(--font-serif))] italic">
              {quote}
            </blockquote>
          </div>

          {/* Attribution */}
          <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between border-l lg:border-l-0 pl-4 lg:pl-0 gap-space-xs">
            <span className="text-title-md font-bold text-primary [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
              {author}
            </span>
            <span className="text-label-sm text-on-surface-variant font-medium [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
              {citation}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

