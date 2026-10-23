export interface NavItem {
  label: string;
  href: string;
  pathId?: string;
}

export interface NavConfig {
  brandName: string;
  brandRole: string;
  links: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface HeroData {
  headlinePrefix: string;
  headlineAccent: string;
  headlineSuffix: string;
  lead: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metrics: MetricItem[];
  portrait: {
    src: string;
    alt: string;
  };
  badge: {
    name: string;
    title: string;
  };
}

export interface AffiliationsData {
  label: string;
  partners: string[];
}

export interface BookData {
  eyebrow: string;
  titleEn: string;
  titleMl: string;
  description: string;
  metadata: string;
  ctaText: string;
  ctaHref: string;
  coverImage: {
    src: string;
    alt: string;
  };
}

export type PracticeIconName = "family" | "clinical" | "podium" | "school";

export interface PracticeItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  icon: PracticeIconName;
  accent: "gold" | "navy";
}

export interface PracticeSectionData {
  eyebrow: string;
  title: string;
  description: string;
  items: PracticeItem[];
}

export interface FieldworkItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface FieldworkSectionData {
  eyebrow: string;
  title: string;
  description: string;
  viewAllLink: {
    label: string;
    href: string;
  };
  items: FieldworkItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  accent: "gold" | "navy";
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title: string;
  items: TestimonialItem[];
}

export interface OfficeDetails {
  name: string;
  location: string;
  hours: string;
  email: string;
  sessionMode: string;
  advanceNotice: string;
}

export interface ConsultationData {
  eyebrow: string;
  title: string;
  description: string;
  whatsappCta: {
    label: string;
    href: string;
  };
  callCta: {
    label: string;
    href: string;
    display: string;
  };
  office: OfficeDetails;
}

export interface FooterLink {
  label: string;
  href: string;
  pathId?: string;
}

export interface FooterData {
  brandName: string;
  brandRole: string;
  links: FooterLink[];
  copyright: string;
  tagline: string;
}

export interface HomePageData {
  nav: NavConfig;
  hero: HeroData;
  affiliations: AffiliationsData;
  book: BookData;
  practice: PracticeSectionData;
  fieldwork: FieldworkSectionData;
  testimonials: TestimonialsSectionData;
  consultation: ConsultationData;
  footer: FooterData;
}

export const homeData: HomePageData = {
  nav: {
    brandName: "Nisham PA",
    brandRole: "Psychologist & Executive Advisor",
    links: [
      { label: "About", href: "#about", pathId: "about" },
      { label: "The Book", href: "#the-book", pathId: "the-book" },
      { label: "Advisory", href: "#advisory", pathId: "advisory" },
      { label: "Fieldwork", href: "#fieldwork", pathId: "fieldwork" },
    ],
    cta: {
      label: "Schedule Consultation",
      href: "#consultation-inquiry",
    },
  },

  hero: {
    headlinePrefix: "Psychologist & Mentor for ",
    headlineAccent: "leaders, businesses",
    headlineSuffix: ", and families.",
    lead: "I am Nisham PA. For over a decade, I've worked closely with business owners, professionals, and families to resolve conflicts, manage high-stakes decisions, and build emotional clarity.",
    primaryCta: {
      label: "Read About The Book",
      href: "#the-book",
    },
    secondaryCta: {
      label: "Get in Touch",
      href: "#consultation-inquiry",
    },
    metrics: [
      {
        value: "10+",
        label: "Years of Practice",
      },
      {
        value: "500+",
        label: "Sessions & Workshops",
      },
      {
        value: "Kerala & Global",
        label: "Online & In-Person",
      },
    ],
    portrait: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfnyBFo7SlxXoZbhfoBRzcClpluRt4lXl4DQ9cIhOvB6FVAYxCtTiTZ17-A8-DfJw6F8TUsMpnIdc_mLrXsA-D7ljUp_C3gQyGFJ-RzvIrgtoxz5-6ipG49GE8BrY1WEOuZACtweXzYNszEFDGs5PBtwfwG2JVIHfCar-7H59fNCgU6hh2ByH-kaKrNJYpY32FtXBLTNwJtg7fRnw9DYTpUF4UXBPWpUEcl_kHTflCRsKFs0WDgVv9ebrj7SlPyxYQdQ",
      alt: "Portrait of Nisham PA, Consulting Psychologist and Author",
    },
    badge: {
      name: "Nisham PA",
      title: "Psychologist & Founder, Sensebridge",
    },
  },

  affiliations: {
    label: "Clients & Collaborations",
    partners: [
      "Paragon Group",
      "Chiking Global",
      "Delicia Foods",
      "myG Digital",
      "Elixir Healthcare",
    ],
  },

  book: {
    eyebrow: "The Book",
    titleEn: "Panam, Adhikaram, Arogyam",
    titleMl: "പണം, അധികാരം, ആരോഗ്യം — ഒരു മനഃശാസ്ത്ര പഠനം",
    description:
      "A practical look at how our relationship with money, authority, and health shapes our everyday decisions, relationships, and peace of mind.",
    metadata: "Written in Malayalam • 300+ Pages",
    ctaText: "Buy now - get your copy",
    ctaHref:
      "https://wa.me/916238081953?text=Hello%20Nisham%20PA%20Office,%20I%20would%20like%20to%20order%20a%20copy%20of%20Panam,%20Adhikaram,%20Arogyam.",
    coverImage: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCua_7ZLhbSUJz3XAbRS18Jn3NGjjuKp3yLC7StILuHlBhop5M9nl7lhu_C630SUoW6mjuJcobI3jy4bhD51fNyW3YacQfbhrVP0OXZ1LVvrnPYgPmx3QD5LEjDIudlCB9gvjNh5GZh3KHgkxosLsvPsmK8JOGr-DPe6__sdj9z8FlSX6t67ZEPznNezJ9p-dErUJ3fV53NasNCruHVoeuAF7Scx2NeT7pgL1FkgblIqUWrU5RAbf0Vvx-f4HVRbgrevw",
      alt: "Book cover of Panam, Adhikaram, Arogyam authored by Nisham PA",
    },
  },

  practice: {
    eyebrow: "How I Work",
    title: "Consulting & Mentoring",
    description:
      "Structured psychological support for business owners, leadership teams, professionals, and students.",
    items: [
      {
        id: "family-business",
        tag: "Family Business",
        title: "Succession & Conflict",
        description:
          "Facilitating honest conversations between generations, handling business handover, and preventing disputes before they escalate.",
        linkText: "Learn more",
        linkHref: "#consultation-inquiry",
        icon: "family",
        accent: "gold",
      },
      {
        id: "counseling",
        tag: "1-on-1 Sessions",
        title: "Personal Counseling",
        description:
          "Confidential sessions for founders, executives, and individuals dealing with anxiety, career crossroads, and heavy emotional strain.",
        linkText: "Book a session",
        linkHref: "#consultation-inquiry",
        icon: "clinical",
        accent: "navy",
      },
      {
        id: "speaking",
        tag: "Speaking",
        title: "Keynotes & Talks",
        description:
          "Engaging, practical sessions on emotional resilience, leadership psychology, and team dynamics for conferences and institutions.",
        linkText: "Invite to speak",
        linkHref: "#consultation-inquiry",
        icon: "podium",
        accent: "gold",
      },
      {
        id: "academy",
        tag: "Education",
        title: "Sensebridge Academy",
        description:
          "Certificate programs and training workshops in applied psychology, counseling foundations, and personal development.",
        linkText: "View programs",
        linkHref: "#consultation-inquiry",
        icon: "school",
        accent: "navy",
      },
    ],
  },

  fieldwork: {
    eyebrow: "Recent Sessions",
    title: "Workshops & Speaking",
    description:
      "Moments from recent workshops, training programs, and convocation addresses.",
    viewAllLink: {
      label: "See all photos",
      href: "#fieldwork",
    },
    items: [
      {
        id: "convocation",
        tag: "Convocation",
        title: "Keynote Address",
        description:
          "Speaking with graduating students on emotional resilience and transition into careers.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhRMKvyLyGkhhBTbXHAyaFtGbinFh3ypgRromLlnsLDj4GOGXerKmQwp7tKghW8_fbPt1_BISG4TYEb7yc7A2VKRaMZ1gWbIDXPfMoTXgI0F6GrprRIBVo8Xcdvq2MGcJJTQMk-qZH9tViNUDJoNKBQEPAYXkN-uAN2EGLWAi8AK_1DtU_s0y9e2RL55Dp83rhhEgtO9z04Qvo5WOROBXXy9IE2ESU3iClKMcgqOhsnz7sceE1L3spP6dys8gP1XubUg",
          alt: "Nisham PA presenting convocation address",
        },
      },
      {
        id: "team-workshop",
        tag: "Team Workshop",
        title: "Communication & Conflict",
        description:
          "An interactive session helping department leaders communicate openly and resolve team friction.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAANHtdNlEREPUUbZHV0Fjhh5Vi4HK2Q9B1QsmXoPwsvFvoHCpCV80MhkAnmA-Y_FFphginVAp41UmtrgHmGtUKadfUYMkvv6RFw0wdatn7r34UC-akc3HfGkKDJBVEv9kvO0U3lneHyM3HT-ZwKUFVdcGatS4S-NveSqevo-tj47cgrL25Q4aq2lmKQdznZGvK8vsBmXKTz8Yw2atjoUCSNBwnF6Zsghf1msK1h2T0pe0wOWLLDPNDRimvmnY0BoQ6ug",
          alt: "Leadership workshop led by Nisham PA",
        },
      },
      {
        id: "academy-cohort",
        tag: "Training Program",
        title: "Sensebridge Academy",
        description:
          "A weekend applied psychology cohort training future counselors on core counseling methods.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV7Zm1slxUDWtLagJZ6w8avpx---mvIP3XHAJCYcY4e3g5QU9cW57Jgr4an2-F7nYMJoOPF49F4j1kZm9XkE_yjIrm4t4HZHlDOCZ_VEPuCRU29xY6v8_TvYWrrxt2HToQVafh6IrRAX25pW-BMfFIngie3gE_jw3Tw8W5oMs5XXfxrBAjfvbtWCRe35IBI_WQuvzM5_djMp2zDE-2kuv--9CwZUsnr1-H6W9kwTFIBsUlzFFW0YAULKD9kLGQeDaOkQ",
          alt: "Sensebridge Academy training cohort session",
        },
      },
    ],
  },

  testimonials: {
    eyebrow: "Feedback",
    title: "What people say about our work",
    items: [
      {
        id: "rejani-ks",
        quote:
          "Nisham sir explains deep psychology in simple, clear Malayalam and English. His sessions helped our family talk through difficult business decisions without damaging our relationships.",
        author: "Rejani Ks",
        role: "Sensebridge Student & Counselor",
        initials: "RK",
        accent: "gold",
      },
      {
        id: "ali-noufal",
        quote:
          "During a stressful business restructuring, his counseling gave our team clear perspective and prevented burnout. His insights on pressure and decision-making are genuinely practical.",
        author: "Ali Noufal",
        role: "Managing Director",
        initials: "AN",
        accent: "navy",
      },
    ],
  },

  consultation: {
    eyebrow: "Get in Touch",
    title: "Connect for consultations & workshops.",
    description:
      "Whether you're looking for family business advisory, personal counseling, an institutional keynote, or copies of the book, feel free to reach out directly.",
    whatsappCta: {
      label: "WhatsApp Office",
      href: "https://wa.me/916238081953",
    },
    callCta: {
      label: "Call Office",
      href: "tel:+916238081953",
      display: "+91 6238 081953",
    },
    office: {
      name: "Sensebridge Office",
      location: "Wayanad, Kerala",
      hours: "Monday – Saturday: 9:30 AM – 6:00 PM",
      email: "nishampaofficial@gmail.com",
      sessionMode: "Available for in-person & online sessions",
      advanceNotice:
        "Please schedule your consultation in advance for guaranteed time.",
    },
  },

  footer: {
    brandName: "Nisham PA",
    brandRole: "Clinical Psychologist, Author & Executive Advisory",
    links: [
      { label: "About", href: "#about", pathId: "about" },
      { label: "The Book", href: "#the-book", pathId: "the-book" },
      { label: "Advisory", href: "#advisory", pathId: "advisory" },
      { label: "Fieldwork", href: "#fieldwork", pathId: "fieldwork" },
      {
        label: "Schedule Consultation",
        href: "#consultation-inquiry",
        pathId: "schedule-consultation",
      },
    ],
    copyright: "© 2024 Nisham PA. All rights reserved.",
    tagline: "Applied psychology for life, leadership, and families.",
  },
};
