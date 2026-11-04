"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
}

const RATING_LABELS: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Outstanding",
};

export default function StarRating({
  value,
  onChange,
  required = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const activeRating = hovered !== null ? hovered : value;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5"
          role="radiogroup"
          aria-label="Star Rating"
          aria-required={required}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= activeRating;
            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={value === star}
                aria-label={`${star} star${star > 1 ? "s" : ""} - ${RATING_LABELS[star]}`}
                onClick={() => onChange(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                className="p-1 rounded-lg transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 md:w-9 md:h-9 transition-colors duration-150 ${
                    isFilled
                      ? "text-secondary fill-secondary"
                      : "text-stone-300 hover:text-stone-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {activeRating > 0 && (
          <span className="text-sm font-medium text-on-surface-variant transition-opacity animate-in fade-in duration-200">
            {RATING_LABELS[activeRating]}
          </span>
        )}
      </div>
      {required && value === 0 && (
        <span className="text-xs text-stone-500">
          Please select a rating from 1 to 5 stars.
        </span>
      )}
    </div>
  );
}

