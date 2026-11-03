"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import type { NavConfig } from "@/lib/data/home";

interface NavbarProps {
  data: NavConfig;
}

export default function Navbar({ data }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-primary/90 backdrop-blur-md border-b border-primary-fixed/15 py-4 lg:py-5 transition-all">
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" aria-label="Nisham PA Home" className="flex items-center gap-3 text-left group">
          <div className="flex flex-col">
            <span className="font-headline-sm text-title-lg leading-tight text-on-primary tracking-tight group-hover:text-secondary-container transition-colors">
              {data.brandName}
            </span>
            <span className="font-label-sm text-[0.65rem] uppercase tracking-widest text-primary-fixed-dim leading-none mt-0.5">
              {data.brandRole}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {data.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              data-path={link.pathId}
              className="font-label-lg text-body-sm text-primary-fixed hover:text-secondary-container tracking-wider transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-secondary-container transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Schedule CTA & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <Link
            href={data.cta.href}
            data-path="schedule-consultation"
            className="hidden sm:inline-flex items-center gap-2 font-label-md text-label-md font-semibold tracking-wider uppercase bg-secondary-container text-primary px-5 py-2.5 rounded-lg shadow-md hover:brightness-110 hover:shadow-lg transition-all border border-secondary-container/40 active:scale-[0.99]"
          >
            <span>{data.cta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-primary-fixed hover:text-secondary-container rounded-lg border border-primary-fixed/20 hover:bg-primary-container transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-xl border-b border-primary-fixed/15 px-gutter-sm py-4 space-y-3 transition-all">
          <nav className="flex flex-col space-y-2">
            {data.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-label-lg text-body-md text-primary-fixed hover:text-secondary-container py-2 border-b border-primary-fixed/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <Link
              href={data.cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 font-label-md text-label-md font-semibold tracking-wider uppercase bg-secondary-container text-primary px-4 py-2.5 rounded-lg shadow-md hover:brightness-110 transition-all border border-secondary-container/40"
            >
              <span>{data.cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
