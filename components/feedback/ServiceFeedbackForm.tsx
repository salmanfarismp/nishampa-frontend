"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function ServiceFeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    occupation: "",
    place: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage("Please tell us your name.");
      return;
    }

    if (!formData.comment.trim()) {
      setErrorMessage("Please share a few sentences about your experience.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/service-reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          comment: formData.comment.trim(),
          occupation: formData.occupation.trim() || null,
          place: formData.place.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit feedback. Please try again.");
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
      name: "",
      comment: "",
      occupation: "",
      place: "",
    });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface-container-lowest border border-surface-variant/40 rounded-3xl p-8 sm:p-12 shadow-sm text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-primary font-bold mb-3">
          Thank you for sharing your feedback
        </h2>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
          Your reflections have been received with deep gratitude. Your perspective is invaluable to our practice.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-container transition-colors"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-surface-variant text-on-surface hover:bg-surface-container transition-colors font-medium cursor-pointer"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest border border-surface-variant/40 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm">
      {/* Form Header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary mb-2">
          Consultation & Counselling Feedback
        </h1>
        <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
          A simple, welcoming space to share your experience from your sessions or advisory consultations with Nisham PA.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-error-container/30 border border-error/30 text-error text-sm">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
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

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm sm:text-base font-semibold text-primary mb-2"
          >
            How was your experience working with Nisham PA?{" "}
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
            placeholder="Share a few sentences about your takeaways, clarity gained, or the impact of your sessions..."
            className="w-full rounded-2xl border border-stone-200 bg-surface px-4 py-3.5 text-on-surface placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-4 focus:ring-stone-200/50 transition-all text-sm sm:text-base resize-y"
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
            placeholder="e.g. Founder, Architect, Educator"
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
            placeholder="e.g. Kozhikode, Dubai, Kochi"
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
              <span>Submit Feedback</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

