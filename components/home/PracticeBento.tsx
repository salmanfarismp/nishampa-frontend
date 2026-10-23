import React from "react";
import Link from "next/link";
import { ArrowRight, Users, FileText, Mic, GraduationCap } from "lucide-react";
import type { PracticeSectionData, PracticeIconName } from "@/lib/data/home";

interface PracticeBentoProps {
  data: PracticeSectionData;
}

const iconMap: Record<PracticeIconName, React.ComponentType<{ className?: string }>> = {
  family: Users,
  clinical: FileText,
  podium: Mic,
  school: GraduationCap,
};

export default function PracticeBento({ data }: PracticeBentoProps) {
  return (
    <section
      id="advisory"
      className="w-full bg-surface-container-low py-space-xl lg:py-margin-lg"
    >
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        {/* Header */}
        <div className="flex flex-col items-start gap-space-xs max-w-2xl mb-space-xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-md text-label-md font-semibold tracking-wider uppercase">
            {data.eyebrow}
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            {data.title}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {data.description}
          </p>
        </div>

        {/* 4-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {data.items.map((item) => {
            const Icon = iconMap[item.icon] || Users;
            const isGold = item.accent === "gold";

            return (
              <div
                key={item.id}
                className="flex flex-col bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-surface-variant/40 hover:-translate-y-0.5"
              >
                {/* Top Colored Accent Stripe */}
                <div
                  className={`h-1.5 w-full absolute top-0 left-0 ${
                    isGold ? "bg-secondary-container" : "bg-primary"
                  }`}
                />

                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-secondary-container transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Target Audience Tag */}
                <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                  {item.tag}
                </span>

                {/* Title */}
                <h3 className="font-title-lg text-title-lg text-primary mt-1 mb-space-xs">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body-md text-body-md text-on-surface-variant flex-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Interactive CTA Link */}
                <Link
                  href={item.linkHref}
                  className="mt-space-md pt-space-xs inline-flex items-center gap-1.5 text-primary font-label-md text-label-md group-hover:text-secondary transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
