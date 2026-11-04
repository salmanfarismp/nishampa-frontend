"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowRight, BookOpen } from "lucide-react";
import type { BookRow } from "@/lib/types/book";
import StarRating from "./StarRating";

interface BookFeedbackFormProps {
  book: BookRow;
}

export default function BookFeedbackForm({ book }: BookFeedbackFormProps) {
  const [formData, setFormData] = useState({
    stars: 5,
    comment: "",
    name: "",
    occupation: "",
    place: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.stars || formData.stars < 1 || formData.stars > 5) {
      setErrorMessage("Please select a star rating between 1 and 5.");
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage("Please tell us your name.");
      return;
    }

    if (!formData.comment.trim()) {
      setErrorMessage("Please share your thoughts or takeaways about the book.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book-reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stars: formData.stars,
          comment: formData.comment.trim(),
          name: formData.name.trim(),
          book_id: book.id,
          occupation: formData.occupation.trim() || null,
          place: formData.place.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit review. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      stars: 5,
      comment: "",
      name: "",
      occupation: "",
      place: "",
    });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const bookTitle = book.name_ml || book.name || "The Book";

  if (isSubmitted) {
    return (
      <div className="bg-surface-container-lowest border border-surface-variant/40 rounded-3xl p-8 sm:p-12 shadow-sm text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-primary font-bold mb-3">
          Thank you for sharing your review
        </h2>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
          Your reflections on &ldquo;{bookTitle}&rdquo; have been received with sincere gratitude. We appreciate your thoughtful contribution as a reader.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/the-book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-container transition-colors"
          >
            <span>Visit Book Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-surface-variant text-on-surface hover:bg-surface-container transition-colors font-medium cursor-pointer"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest border border-surface-variant/40 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm">
      {/* Book Context Card */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-variant/30 flex items-center gap-4 sm:gap-5">
        <div className="relative w-16 h-22 sm:w-20 sm:h-28 shrink-0 rounded-lg overflow-hidden shadow-sm bg-surface-container-high border border-surface-variant/20">
          {book.cover_url ? (
            <Image
              src={book.cover_url}
              alt={bookTitle}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant/50">
              <BookOpen className="w-8 h-8" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-secondary mb-1">
            Reader Feedback
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-primary truncate [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
            {book.name_ml || book.name}
          </h2>
          {book.name && book.name_ml && (
            <p className="text-xs sm:text-sm text-on-surface-variant truncate">
              {book.name}
            </p>
          )}
          <p className="text-xs text-on-surface-variant/70 mt-1">
            By Nisham PA
          </p>
        </div>
      </div>

      {/* Form Header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-2">
          Share your review & reflections
        </h1>
        <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
          How did reading this monograph resonate with you? Share your experience, key insights, and takeaways.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-error-container/30 border border-error/30 text-error text-sm">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Star Rating */}
        <div>
          <label className="block text-sm sm:text-base font-semibold text-primary mb-2">
            Your overall rating <span className="text-error">*</span>
          </label>
          <StarRating
            value={formData.stars}
            onChange={(val) => setFormData({ ...formData, stars: val })}
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm sm:text-base font-semibold text-primary mb-2"
          >
            Tell us about your reading experience{" "}
            <span className="text-error">*</span>
          </label>
          <textarea
            id="comment"
            required
            rows={5}
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder="What chapters or ideas resonated with you? How did it change or enrich your perspective?"
            className="w-full rounded-2xl border border-stone-200 bg-surface px-4 py-3.5 text-on-surface placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-4 focus:ring-stone-200/50 transition-all text-sm sm:text-base resize-y"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-base font-semibold text-primary mb-2"
          >
            What is your name? <span className="text-error">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full rounded-2xl border border-stone-200 bg-surface px-4 py-3.5 text-on-surface placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-4 focus:ring-stone-200/50 transition-all text-sm sm:text-base"
          />
        </div>

        {/* Occupation */}
        <div>
          <label
            htmlFor="occupation"
            className="block text-sm sm:text-base font-semibold text-primary mb-2"
          >
            Your occupation or profession{" "}
            <span className="text-xs font-normal text-on-surface-variant/70">
              (Optional)
            </span>
          </label>
          <input
            id="occupation"
            type="text"
            value={formData.occupation}
            onChange={(e) =>
              setFormData({ ...formData, occupation: e.target.value })
            }
            placeholder="e.g. Teacher, Entrepreneur, Engineer"
            className="w-full rounded-2xl border border-stone-200 bg-surface px-4 py-3.5 text-on-surface placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-4 focus:ring-stone-200/50 transition-all text-sm sm:text-base"
          />
        </div>

        {/* Place */}
        <div>
          <label
            htmlFor="place"
            className="block text-sm sm:text-base font-semibold text-primary mb-2"
          >
            Where are you based?{" "}
            <span className="text-xs font-normal text-on-surface-variant/70">
              (Optional)
            </span>
          </label>
          <input
            id="place"
            type="text"
            value={formData.place}
            onChange={(e) =>
              setFormData({ ...formData, place: e.target.value })
            }
            placeholder="e.g. Kozhikode, Dubai, Bangalore"
            className="w-full rounded-2xl border border-stone-200 bg-surface px-4 py-3.5 text-on-surface placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-4 focus:ring-stone-200/50 transition-all text-sm sm:text-base"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary-container transition-all shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 text-base"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Review</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

