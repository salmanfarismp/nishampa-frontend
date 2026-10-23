import React from "react";
import Link from "next/link";
import type { FooterData } from "@/lib/data/home";

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-surface-variant/40">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        {/* Top Tier: Brand & Directory */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-space-lg pb-space-lg mb-space-lg border-b border-surface-variant/30">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary font-serif">
              {data.brandName}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {data.brandRole}
            </span>
          </div>

          <nav
            aria-label="Footer Directory"
            className="flex flex-wrap gap-space-lg font-label-md text-label-md text-on-surface-variant"
          >
            {data.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                data-path={link.pathId}
                className="hover:text-primary transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Tier: Copyright & Philosophical Tagline */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant pt-space-xs text-center sm:text-left">
          <p>{data.copyright}</p>
          <p className="font-headline-sm text-body-sm italic text-secondary font-serif">
            {data.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
