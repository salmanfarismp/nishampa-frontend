import React from "react";
import { Wallet, Building2, HeartPulse, CheckCircle2 } from "lucide-react";
import type {
  PillarsSectionData,
  PillarItem,
  PillarIconName,
  PillarAccentColor,
} from "@/lib/data/book";

interface PillarsSectionProps {
  data: PillarsSectionData;
}

// ── Icon resolver ──────────────────────────────────────────────────────────
const PillarIconMap: Record<PillarIconName, React.ElementType> = {
  Wallet,
  Building2,
  HeartPulse,
};

// ── Accent colour maps (top strip + icon circle) ───────────────────────────
const stripColorMap: Record<PillarAccentColor, string> = {
  gold: "bg-secondary-container",
  navy: "bg-primary",
  amber: "bg-secondary",
};

const iconCircleMap: Record<PillarAccentColor, string> = {
  gold: "bg-secondary-container/20 text-secondary",
  navy: "bg-primary-fixed/30 text-primary",
  amber: "bg-secondary-container/20 text-secondary",
};

const partLabelColorMap: Record<PillarAccentColor, string> = {
  gold: "text-secondary",
  navy: "text-primary",
  amber: "text-secondary",
};

// ── Single pillar card ─────────────────────────────────────────────────────
function PillarCard({ item }: { item: PillarItem }) {
  const Icon = PillarIconMap[item.icon];

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Top accent strip */}
      <div
        className={`absolute top-0 left-0 w-full h-1 ${stripColorMap[item.accentColor]}`}
        aria-hidden="true"
      />

      <div>
        {/* Icon Circle */}
        <div
          className={`w-12 h-12 rounded-full ${iconCircleMap[item.accentColor]} flex items-center justify-center mb-space-md`}
          aria-hidden="true"
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Part Label + Separator + Title */}
        <div className="flex items-baseline gap-2 mb-space-xs flex-wrap">
          <span
            className={`text-label-sm uppercase tracking-wider ${partLabelColorMap[item.accentColor]} font-bold`}
          >
            {item.part}
          </span>
          <span className="text-on-surface-variant/40 font-bold" aria-hidden>
            •
          </span>
          <span className="text-headline-sm text-primary [font-family:var(--font-noto-sans-ml,var(--font-serif))]">
            {item.titleMl}
          </span>
        </div>

        {/* Card Heading */}
        <h3 className="text-title-lg text-primary mb-space-xs [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
          {item.heading}
        </h3>

        {/* Description */}
        <p className="text-body-md text-on-surface-variant leading-relaxed mb-space-md [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
          {item.description}
        </p>
      </div>

      {/* Key Takeaway Bullets */}
      <div className="pt-space-md border-t border-surface-container-high/60 flex flex-col gap-2">
        {item.takeaways.map((t, i) => (
          <span
            key={i}
            className="text-label-sm text-primary font-semibold flex items-start gap-1.5 [font-family:var(--font-noto-sans-ml,var(--font-sans))]"
          >
            <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            {t.text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function PillarsSection({ data }: PillarsSectionProps) {
  const { eyebrow, title, description, items } = data;

  return (
    <section
      className="w-full bg-surface py-space-xl lg:py-margin-lg"
      id="pillars"
      aria-labelledby="pillars-title"
    >
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl">
          <span className="text-label-sm text-secondary uppercase tracking-wider font-bold mb-space-xs [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
            {eyebrow}
          </span>
          <h2
            id="pillars-title"
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

        {/* 3-card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
          {items.map((item) => (
            <PillarCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

