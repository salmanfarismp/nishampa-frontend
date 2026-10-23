import React from "react";
import { CheckCircle2 } from "lucide-react";
import type { AffiliationsData } from "@/lib/data/home";

interface AffiliationsBarProps {
  data: AffiliationsData;
}

export default function AffiliationsBar({ data }: AffiliationsBarProps) {
  return (
    <section className="w-full bg-surface-container py-space-md border-b border-surface-variant">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-space-xs flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 text-secondary" />
          <span>{data.label}</span>
        </span>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-space-xl text-on-surface font-title-md text-title-md opacity-85">
          {data.partners.map((partner) => (
            <span
              key={partner}
              className="hover:text-secondary transition-colors tracking-tight font-bold cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
