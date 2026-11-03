"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ClientItem } from "@/lib/types/client";

interface ClientsSliderProps {
  items: ClientItem[];
}

export default function ClientsSlider({ items }: ClientsSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const checkOverflowAndScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Check if total content width exceeds visible container width
    const overflows = el.scrollWidth > el.clientWidth + 4;
    setHasOverflow(overflows);

    if (overflows) {
      const atStart = el.scrollLeft <= 4;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setCanScrollLeft(!atStart);
      setCanScrollRight(!atEnd);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  useEffect(() => {
    checkOverflowAndScroll();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkOverflowAndScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      checkOverflowAndScroll();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", checkOverflowAndScroll);
      resizeObserver.disconnect();
    };
  }, [items, checkOverflowAndScroll]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = Math.max(el.clientWidth * 0.5, 200);
    const targetScroll =
      direction === "left"
        ? el.scrollLeft - scrollAmount
        : el.scrollLeft + scrollAmount;

    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center md:justify-end gap-space-sm w-full min-w-0">
      {/* Slider Left Button - shown only when there is overflow / a lot of clients */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous clients"
          className="p-1 rounded-full text-on-surface-variant hover:text-secondary transition-colors disabled:opacity-20 disabled:pointer-events-none cursor-pointer flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Clients Row - exact original typography & consistent logo height */}
      <div
        ref={scrollContainerRef}
        className={`flex items-center gap-space-xl overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          hasOverflow ? "justify-start" : "justify-center md:justify-end flex-wrap md:flex-nowrap"
        }`}
      >
        {items.map((client) => {
          const hasImageError = failedImages[client.id];
          const shouldShowLogo = client.showLogo && client.logoUrl && !hasImageError;

          if (shouldShowLogo) {
            return (
              <div
                key={client.id}
                className="flex-shrink-0 flex items-center justify-center h-8"
              >
                <Image
                  src={client.logoUrl!}
                  alt={client.name || "Client logo"}
                  width={140}
                  height={32}
                  className="h-8 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [client.id]: true }))
                  }
                />
              </div>
            );
          }

          return (
            <span
              key={client.id}
              className="hover:text-secondary transition-colors tracking-tight font-bold cursor-default whitespace-nowrap text-on-surface font-title-md text-title-md opacity-85 flex-shrink-0"
            >
              {client.name}
            </span>
          );
        })}
      </div>

      {/* Slider Right Button - shown only when there is overflow / a lot of clients */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          aria-label="Next clients"
          className="p-1 rounded-full text-on-surface-variant hover:text-secondary transition-colors disabled:opacity-20 disabled:pointer-events-none cursor-pointer flex-shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
