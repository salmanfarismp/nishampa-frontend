import React from "react";
import { Star, ShieldCheck } from "lucide-react";
import type { ReaderReviewsData, ReviewItem } from "@/lib/data/book";

interface ReaderReviewsProps {
  data: ReaderReviewsData;
}

// ── Single review card ─────────────────────────────────────────────────────
function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <article className="bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all">
      <div className="flex flex-col gap-space-sm">
        {/* Star Rating */}
        <div className="flex items-center gap-0.5" aria-label={`${review.stars} out of 5 stars`}>
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star
              key={i}
              className="w-[18px] h-[18px] text-secondary fill-current"
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-body-md text-on-surface leading-relaxed [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
          {review.quote}
        </p>
      </div>

      {/* Author + Verified Badge */}
      <div className="pt-space-md mt-space-md border-t border-surface-container-high flex items-center justify-between gap-space-sm">
        <div className="min-w-0">
          <h4 className="text-title-md text-primary font-bold truncate [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
            {review.author}
          </h4>
          <p className="text-body-sm text-on-surface-variant [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
            {review.role}
          </p>
        </div>
        {review.verified && (
          <ShieldCheck
            className="w-6 h-6 text-secondary/60 flex-shrink-0"
            aria-label="Verified reader"
          />
        )}
      </div>
    </article>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function ReaderReviews({ data }: ReaderReviewsProps) {
  const { eyebrow, title, description, items } = data;

  return (
    <section
      className="w-full bg-surface-container-low py-space-xl lg:py-margin-lg"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl">
          <span className="text-label-sm text-secondary uppercase tracking-wider font-bold mb-space-xs [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
            {eyebrow}
          </span>
          <h2
            id="reviews-title"
            className="text-headline-lg text-primary tracking-tight [font-family:var(--font-noto-sans-ml,var(--font-serif))]"
          >
            {title}
          </h2>
          <div
            className="w-12 h-0.5 bg-secondary-container mt-space-xs mb-space-sm"
            aria-hidden="true"
          />
          <p className="text-body-md text-on-surface-variant [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
            {description}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
          {items.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

