import React from "react";
import { CheckCircle2 } from "lucide-react";
import type { AffiliationsData } from "@/lib/data/home";
import type { ClientItem } from "@/lib/types/client";
import ClientsSlider from "@/components/home/ClientsSlider";

interface AffiliationsBarProps {
  data: AffiliationsData;
  items?: ClientItem[];
}

export default function AffiliationsBar({ data, items }: AffiliationsBarProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-surface-container py-space-md border-b border-surface-variant">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-space-xs flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 text-secondary" />
          <span>{data.label}</span>
        </span>
        <div className="w-full md:w-auto md:max-w-[75%] lg:max-w-[80%] flex items-center justify-center md:justify-end min-w-0">
          <ClientsSlider items={items} />
        </div>
      </div>
    </section>
  );
}
