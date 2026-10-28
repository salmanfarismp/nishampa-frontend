import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import BookHero from "@/components/book/BookHero";
import PullQuoteBanner from "@/components/book/PullQuoteBanner";
import PillarsSection from "@/components/book/PillarsSection";
import AuthorPerspective from "@/components/book/AuthorPerspective";
import ReaderReviews from "@/components/book/ReaderReviews";
import OrderCTA from "@/components/book/OrderCTA";
import { bookData } from "@/lib/data/book";
import { homeData } from "@/lib/data/home";

export const metadata: Metadata = {
  title:
    "പണം, അധികാരം, ആരോഗ്യം — Nisham PA | Malayalam Psychological Monograph",
  description:
    "A grounded Malayalam psychological study on how our relationships with money, authority, and health shape everyday decisions, family dynamics, and peace of mind. By Nisham PA, Clinical Psychologist & Executive Advisor. 240 pages. Second edition. ₹290.",
  openGraph: {
    title: "പണം, അധികാരം, ആരോഗ്യം — Nisham PA",
    description:
      "How money, power, and health intersect in our psychological lives — a practical study in Malayalam by Clinical Psychologist Nisham PA.",
    images: [
      {
        url: "/assets/panam-adhikaram=-arogyam.webp",
        alt: "Panam, Adhikaram, Arogyam — Book cover by Nisham PA",
      },
    ],
    type: "book",
  },
};

export default function TheBookPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex flex-col">
      {/* Shared Atmospheric Navbar */}
      <Navbar data={homeData.nav} />

      {/* Book Page Main Content */}
      <main
        className="w-full pt-16 sm:pt-20 flex-1 flex flex-col"
        id="top"
      >
        {/* 1 — Immersive Navy Hero: Cover, titles, stats, CTAs */}
        <BookHero data={bookData.hero} />

        {/* 2 — Editorial Pull Quote Breakout Strip */}
        <PullQuoteBanner data={bookData.pullQuote} />

        {/* 3 — Three Core Pillars: Panam / Adhikaram / Arogyam */}
        <PillarsSection data={bookData.pillars} />

        {/* 4 — Chapter Index & Reading Walkthrough */}

        {/* 5 — Author Note & Perspective */}
        <AuthorPerspective data={bookData.author} />

        {/* 6 — Reader Testimonials Grid */}
        <ReaderReviews data={bookData.reviews} />

        {/* 7 — Order Conversion Module with WhatsApp CTA */}
        <OrderCTA data={bookData.order} />
      </main>

      {/* Shared Semantic Footer */}
      <Footer data={homeData.footer} />
    </div>
  );
}

