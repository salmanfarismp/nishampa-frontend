import React from "react";
import { MessageSquare, Phone, Building2, Clock, Mail, Globe } from "lucide-react";
import type { ConsultationData } from "@/lib/data/home";

interface ConsultationBannerProps {
  data: ConsultationData;
}

export default function ConsultationBanner({ data }: ConsultationBannerProps) {
  return (
    <section
      id="consultation-inquiry"
      className="w-full bg-surface py-space-xl lg:py-margin-lg"
    >
      <div className="max-w-[1280px] mx-auto px-gutter-sm lg:px-gutter-lg">
        <div className="bg-primary rounded-xl overflow-hidden shadow-xl text-on-primary p-space-lg lg:p-space-xl relative">
          {/* Ambient subtle gold glow in footer card */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative">
            {/* Left: Call to Action Details */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container/20 border border-secondary-container/30 text-secondary-fixed font-label-md text-label-md font-semibold tracking-wider uppercase w-fit">
                {data.eyebrow}
              </div>

              <h2 className="font-display text-headline-lg text-on-primary tracking-tight">
                {data.title}
              </h2>

              <p className="font-body-lg text-body-lg text-primary-fixed max-w-xl leading-relaxed">
                {data.description}
              </p>

              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <a
                  href={data.whatsappCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-space-sm bg-secondary-container text-primary font-bold px-space-lg py-space-md rounded-lg shadow-md hover:brightness-110 transition-all font-label-lg text-label-lg active:scale-[0.99]"
                >
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>{data.whatsappCta.label}</span>
                </a>

                <a
                  href={data.callCta.href}
                  className="inline-flex items-center gap-space-sm bg-primary-container text-on-primary font-medium px-space-lg py-space-md rounded-lg border border-primary-fixed/30 hover:bg-on-primary/10 transition-all font-label-lg text-label-lg active:scale-[0.99]"
                >
                  <Phone className="w-5 h-5 text-secondary-container" />
                  <span>{data.callCta.display}</span>
                </a>
              </div>
            </div>

            {/* Right: Chambers & Hours Box */}
            <div className="lg:col-span-5 bg-primary-container/80 backdrop-blur-sm p-space-lg rounded-xl border border-secondary-container/20 shadow-inner flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm pb-space-sm border-b border-primary-fixed/20">
                <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-primary font-semibold">
                    {data.office.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-primary-fixed-dim">
                    {data.office.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-primary-fixed">
                <div className="flex items-center gap-space-sm">
                  <Clock className="w-[18px] h-[18px] text-secondary-container flex-shrink-0" />
                  <span>{data.office.hours}</span>
                </div>

                <div className="flex items-center gap-space-sm">
                  <Mail className="w-[18px] h-[18px] text-secondary-container flex-shrink-0" />
                  <a
                    href={`mailto:${data.office.email}`}
                    className="hover:text-secondary-container transition-colors truncate"
                  >
                    {data.office.email}
                  </a>
                </div>

                <div className="flex items-center gap-space-sm">
                  <Globe className="w-[18px] h-[18px] text-secondary-container flex-shrink-0" />
                  <span>{data.office.sessionMode}</span>
                </div>
              </div>

              <p className="font-label-sm text-label-sm text-primary-fixed-dim border-t border-primary-fixed/15 pt-space-sm">
                {data.office.advanceNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
