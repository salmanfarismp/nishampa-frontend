import React from "react";
import type { Metadata } from "next";
import FeedbackShell from "@/components/feedback/FeedbackShell";
import ServiceFeedbackForm from "@/components/feedback/ServiceFeedbackForm";

export const metadata: Metadata = {
  title: "Client Feedback & Testimonials — Nisham PA",
  description:
    "Share your candid experience and reflections on clinical psychology and executive advisory sessions with Nisham PA.",
};

export default function FeedbackPage() {
  return (
    <FeedbackShell backHref="/" backLabel="Back to Home">
      <ServiceFeedbackForm />
    </FeedbackShell>
  );
}

