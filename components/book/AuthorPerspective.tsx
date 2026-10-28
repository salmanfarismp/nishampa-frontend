import React from "react";
import { PenLine, GraduationCap } from "lucide-react";
import type { AuthorPerspectiveData, AuthorCard } from "@/lib/data/book";

interface AuthorPerspectiveProps {
  data: AuthorPerspectiveData;
}

// ── Side card variants ─────────────────────────────────────────────────────
function SideCard({ card }: { card: AuthorCard }) {
  if (card.type === "quote") {
    return (
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-variant/40">
        <span className="text-label-sm text-secondary uppercase tracking-wider font-bold block mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
          {card.label}
        </span>
        <p className="text-body-md text-on-surface font-medium leading-relaxed [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
          {card.content}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-primary text-surface p-space-md rounded-xl shadow-sm">
      <div className="flex items-center gap-space-xs mb-1">
        <GraduationCap className="w-5 h-5 text-secondary-fixed flex-shrink-0" aria-hidden="true" />
        <span className="text-title-md font-semibold text-surface-bright [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
          {card.label}
        </span>
      </div>
      <p className="text-body-sm text-surface-container-high leading-relaxed [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
        {card.content}
      </p>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function AuthorPerspective({ data }: AuthorPerspectiveProps) {
  const { eyebrow, title, paragraphs, pullQuote, author, sideCards } = data;

  return (
    <section
      className="w-full bg-surface py-space-xl lg:py-margin-lg"
      id="author"
      aria-labelledby="author-title"
    >
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        {/* Contained editorial card */}
        <div className="bg-surface-container rounded-xl p-space-lg md:p-space-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
            {/* ── Main Author Note ── */}
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              {/* Eyebrow */}
              <div className="flex items-center gap-space-xs text-secondary text-label-md uppercase tracking-wider font-bold">
                <PenLine className="w-[18px] h-[18px]" aria-hidden="true" />
                <span className="[font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  {eyebrow}
                </span>
              </div>

              {/* Section Heading */}
              <h2
                id="author-title"
                className="text-headline-lg text-primary leading-tight [font-family:var(--font-noto-sans-ml,var(--font-serif))]"
              >
                {title}
              </h2>

              {/* Body Paragraphs + Inline Pull Quote */}
              <div className="space-y-space-sm text-on-surface-variant text-body-lg leading-relaxed">
                {/* First paragraph */}
                <p className="[font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  {paragraphs[0]}
                </p>

                {/* Inline pull quote */}
                <p className="text-primary text-headline-sm font-semibold [font-family:var(--font-noto-sans-ml,var(--font-serif))] border-l-[3px] border-secondary-container pl-4 py-1">
                  {pullQuote}
                </p>

                {/* Remaining paragraphs */}
                {paragraphs.slice(1).map((para, i) => (
                  <p
                    key={i}
                    className="[font-family:var(--font-noto-sans-ml,var(--font-sans))]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Author Attribution */}
              <div className="pt-space-sm flex items-center gap-space-md border-t border-surface-container-high/60">
                <div>
                  <span className="text-headline-sm text-primary block font-bold [font-family:var(--font-noto-sans-ml,var(--font-serif))]">
                    {author.name}
                  </span>
                  <span className="text-label-sm text-on-surface-variant [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                    {author.role}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Side Cards ── */}
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              {sideCards.map((card, i) => (
                <SideCard key={i} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

