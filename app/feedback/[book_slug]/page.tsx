import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookX } from "lucide-react";
import FeedbackShell from "@/components/feedback/FeedbackShell";
import BookFeedbackForm from "@/components/feedback/BookFeedbackForm";
import { getBookBySlug } from "@/lib/data/books";

interface BookFeedbackPageProps {
  params: Promise<{
    book_slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BookFeedbackPageProps): Promise<Metadata> {
  const { book_slug } = await params;
  const book = await getBookBySlug(book_slug);

  if (!book) {
    return {
      title: "Book Review — Nisham PA",
      description: "Submit a reader review for books authored by Nisham PA.",
    };
  }

  const title = book.name_ml || book.name || "Book";
  return {
    title: `Review ${title} — Nisham PA`,
    description: `Share your reader review, takeaways, and reflections on "${title}" by Nisham PA.`,
  };
}

export default async function BookFeedbackPage({
  params,
}: BookFeedbackPageProps) {
  const { book_slug } = await params;
  const book = await getBookBySlug(book_slug);

  if (!book) {
    return (
      <FeedbackShell backHref="/the-book" backLabel="Back to Book">
        <div className="bg-surface-container-lowest border border-surface-variant/40 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-error-container/30 text-error flex items-center justify-center">
            <BookX className="w-9 h-9" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-primary font-bold mb-3">
            Book Not Found
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
            We couldn&apos;t find a book matching &ldquo;{book_slug}&rdquo;. Please check the link or browse our featured publications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/the-book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-container transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go to The Book</span>
            </Link>
            <Link
              href="/feedback"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-surface-variant text-on-surface hover:bg-surface-container transition-colors font-medium text-center"
            >
              General Feedback
            </Link>
          </div>
        </div>
      </FeedbackShell>
    );
  }

  return (
    <FeedbackShell backHref="/the-book" backLabel="Back to Book">
      <BookFeedbackForm book={book} />
    </FeedbackShell>
  );
}

