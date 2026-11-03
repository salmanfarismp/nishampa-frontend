import React, { Suspense } from "react";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AffiliationsBar from "@/components/home/AffiliationsBar";
import AboutSection from "@/components/home/AboutSection";
import BookFeature from "@/components/home/BookFeature";
import PracticeBento from "@/components/home/PracticeBento";
import FieldworkGallery from "@/components/home/FieldworkGallery";
import Testimonials from "@/components/home/Testimonials";
import ConsultationBanner from "@/components/home/ConsultationBanner";
import Footer from "@/components/home/Footer";
import { homeData } from "@/lib/data/home";
import { getGalleryItems } from "@/lib/data/gallery";
import { getServiceReviews } from "@/lib/data/service-reviews";

async function LiveFieldworkGallery() {
  const galleryItems = await getGalleryItems();
  const fieldworkData = {
    ...homeData.fieldwork,
    items: galleryItems,
  };

  return <FieldworkGallery data={fieldworkData} />;
}

async function LiveTestimonials() {
  const reviews = await getServiceReviews();
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const testimonialsData = {
    ...homeData.testimonials,
    items: reviews,
  };

  return <Testimonials data={testimonialsData} />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">
      {/* Sticky Atmospheric Navbar */}
      <Navbar data={homeData.nav} />

      {/* Main Content Sanctuary */}
      <main className="w-full pt-16 sm:pt-20 bg-surface min-h-[calc(100vh-20rem)] flex-1">
        <div className="flex flex-col w-full">
          {/* Hero Section: Concentrated Royal Navy Night Canvas */}
          <HeroSection data={homeData.hero} />

          {/* Institutional Affiliations & Client Ticker Strip */}
          <AffiliationsBar data={homeData.affiliations} />

          {/* About Section: Background, Leadership & Credentials */}
          <AboutSection data={homeData.about} />

          {/* The Monograph: Panam, Adhikaram, Arogyam */}
          <BookFeature data={homeData.book} />

          {/* Practice & Consultation Bento Grid */}
          <PracticeBento data={homeData.practice} />

          {/* Documentary Fieldwork & Speaking Gallery */}
          <Suspense fallback={<FieldworkGallery data={homeData.fieldwork} />}>
            <LiveFieldworkGallery />
          </Suspense>

          {/* Editorial Client & Participant Testimonials */}
          <Suspense fallback={null}>
            <LiveTestimonials />
          </Suspense>

          {/* Direct Consultation & Contact Chambers Closing Banner */}
          <ConsultationBanner data={homeData.consultation} />
        </div>
      </main>

      {/* Semantic Footer */}
      <Footer data={homeData.footer} />
    </div>
  );
}
