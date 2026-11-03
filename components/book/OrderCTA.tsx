"use client";

import React, { useState, useEffect } from "react";
import {
  PenLine,
  Truck,
  Clock,
  Banknote,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  Store,
  CreditCard,
} from "lucide-react";
import type {
  OrderCTAData,
  OrderPerk,
  OrderStockist,
  OrderPerkIconName,
  StockistIconName,
} from "@/lib/data/book";
import CheckoutModal from "./CheckoutModal";

interface OrderCTAProps {
  data: OrderCTAData;
}

// ── Icon resolvers ─────────────────────────────────────────────────────────
const PerkIconMap: Record<OrderPerkIconName, React.ElementType> = {
  PenLine,
  Truck,
  Clock,
  Banknote,
};

const StockistIconMap: Record<StockistIconName, React.ElementType> = {
  BookOpen,
  Store,
};

// ── Perk row ───────────────────────────────────────────────────────────────
function PerkRow({ perk }: { perk: OrderPerk }) {
  const Icon = PerkIconMap[perk.icon];
  return (
    <div className="flex items-center gap-2 text-on-surface text-body-sm [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
      <Icon className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
      <span>{perk.label}</span>
    </div>
  );
}

// ── Stockist link ──────────────────────────────────────────────────────────
function StockistLink({ stockist }: { stockist: OrderStockist }) {
  const Icon = StockistIconMap[stockist.icon];
  return (
    <span className="flex items-center gap-1 text-primary text-label-md hover:underline cursor-pointer [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
      <Icon className="w-4 h-4" aria-hidden="true" />
      {stockist.label}
    </span>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function OrderCTA({ data }: OrderCTAProps) {
  const {
    badge,
    title,
    description,
    perks,
    price,
    originalPrice,
    freeShippingNote,
    whatsappHref,
    whatsappLabel,
    securityNote,
    stockistsLabel,
    stockists,
  } = data;

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Auto-open modal if returning with ?checkout=open from Google OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "open") {
      const timer = setTimeout(() => {
        setIsCheckoutOpen(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      className="w-full bg-primary-container text-surface py-space-xl relative overflow-hidden"
      id="order"
      aria-labelledby="order-title"
    >
      {/* Ambient gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-primary opacity-90"
      />

      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg relative z-10">
        {/* Inner white card */}
        <div className="bg-surface-container-lowest text-on-surface rounded-xl p-space-lg md:p-space-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* ── Left: Order Information ── */}
            <div className="lg:col-span-7 flex flex-col items-start gap-space-sm">
              {/* Distribution badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-label-sm font-label-sm font-bold [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                {badge}
              </div>

              {/* Heading */}
              <h2
                id="order-title"
                className="text-headline-lg text-primary leading-tight [font-family:var(--font-noto-sans-ml,var(--font-serif))]"
              >
                {title}
              </h2>

              {/* Description */}
              <p className="text-body-lg text-on-surface-variant leading-relaxed [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                {description}
              </p>

              {/* Perks Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs w-full py-space-xs">
                {perks.map((perk) => (
                  <PerkRow key={perk.label} perk={perk} />
                ))}
              </div>
            </div>

            {/* ── Right: Checkout Box ── */}
            <div className="lg:col-span-5 flex flex-col bg-surface-container-low rounded-xl p-space-lg border border-outline-variant/30">
              {/* Price Display */}
              <div className="flex items-baseline justify-between mb-space-xs">
                <span className="text-title-md text-on-surface-variant font-medium [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  പ്രത്യേക പതിപ്പ്
                </span>
                <div className="text-right">
                  <span className="text-headline-lg text-primary font-bold">
                    {price}
                  </span>
                  <span className="text-body-sm text-on-surface-variant line-through ml-2">
                    {originalPrice}
                  </span>
                </div>
              </div>

              {/* Free Shipping Note */}
              <p className="text-label-sm text-secondary font-bold uppercase tracking-wider mb-space-md [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                {freeShippingNote}
              </p>

              {/* Primary: Online Checkout with Razorpay */}
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full inline-flex items-center justify-center gap-space-xs bg-primary text-on-primary text-title-md py-4 px-space-md rounded-lg hover:bg-primary-container shadow-md transition-all font-semibold active:scale-[0.99] cursor-pointer mb-2.5"
              >
                <CreditCard className="w-[20px] h-[20px]" aria-hidden="true" />
                <span className="[font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  ഓർഡർ ചെയ്യുക (Pay Online)
                </span>
              </button>

              {/* Secondary: WhatsApp CTA */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-space-xs bg-secondary-container/20 text-secondary border border-secondary/30 text-body-md py-3 px-space-md rounded-lg hover:bg-secondary-container/30 transition-all font-medium active:scale-[0.99]"
              >
                <MessageSquare className="w-[18px] h-[18px]" aria-hidden="true" />
                <span className="[font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  {whatsappLabel}
                </span>
              </a>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-space-xs mt-space-sm text-on-surface-variant text-label-sm">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="[font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  {securityNote}
                </span>
              </div>

              {/* Stockist Links */}
              <div className="mt-space-md pt-space-md border-t border-surface-container-high text-center">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block mb-space-xs [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  {stockistsLabel}
                </span>
                <div className="flex items-center justify-center gap-space-md flex-wrap">
                  {stockists.map((s) => (
                    <StockistLink key={s.label} stockist={s} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay + Address Collection Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </section>
  );
}
