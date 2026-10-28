// =============================================================================
// Book Page Data: Panam, Adhikaram, Arogyam — Nisham PA
// Strict TypeScript interfaces + full Malayalam/English content
// =============================================================================

// ---------------------------------------------------------------------------
// Type literals for icons (resolved to lucide-react in components)
// ---------------------------------------------------------------------------
export type PillarIconName = "Wallet" | "Building2" | "HeartPulse";
export type PillarAccentColor = "gold" | "navy" | "amber";
export type AuthorCardType = "quote" | "foundation";
export type OrderPerkIconName = "PenLine" | "Truck" | "Clock" | "Banknote";
export type StockistIconName = "BookOpen" | "Store";

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
export interface BookMetadata {
  titleMl: string;
  subtitleMl: string;
  titleEn: string;
  edition: string;
  pages: string;
  language: string;
  coverImage: {
    src: string;
    alt: string;
  };
}

export interface HeroStatItem {
  value: string;
  label: string;
}

export interface HeroCTAItem {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroPricePlaque {
  title: string;
  subtitle: string;
  editionLabel: string;
  price: string;
}

export interface HeroAuthenticityBadge {
  label: string;
  subLabel: string;
}

export interface BookHeroData {
  metadata: BookMetadata;
  lead: string;
  stats: HeroStatItem[];
  ctas: HeroCTAItem[];
  shippingNote: string;
  pricePlaque: HeroPricePlaque;
  badge: HeroAuthenticityBadge;
}

// ---------------------------------------------------------------------------
// Pull Quote Banner
// ---------------------------------------------------------------------------
export interface PullQuoteData {
  quote: string;
  author: string;
  citation: string;
}

// ---------------------------------------------------------------------------
// Pillars Section
// ---------------------------------------------------------------------------
export interface PillarTakeaway {
  text: string;
}

export interface PillarItem {
  id: string;
  part: string;
  titleMl: string;
  heading: string;
  description: string;
  takeaways: PillarTakeaway[];
  accentColor: PillarAccentColor;
  icon: PillarIconName;
}

export interface PillarsSectionData {
  eyebrow: string;
  title: string;
  description: string;
  items: PillarItem[];
}

// ---------------------------------------------------------------------------
// Chapter Walkthrough
// ---------------------------------------------------------------------------
export interface ChapterItem {
  number: string;
  titleMl: string;
  pages: string;
  summary: string;
}

export interface ChapterWalkthroughData {
  eyebrow: string;
  title: string;
  description: string;
  readingStyleNote: string;
  chapters: ChapterItem[];
}

// ---------------------------------------------------------------------------
// Author Perspective
// ---------------------------------------------------------------------------
export interface AuthorCard {
  type: AuthorCardType;
  label: string;
  content: string;
}

export interface AuthorPerspectiveData {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  pullQuote: string;
  author: {
    name: string;
    role: string;
  };
  sideCards: AuthorCard[];
}

// ---------------------------------------------------------------------------
// Reader Reviews
// ---------------------------------------------------------------------------
export interface ReviewItem {
  id: string;
  stars: number;
  quote: string;
  author: string;
  role: string;
  verified: boolean;
}

export interface ReaderReviewsData {
  eyebrow: string;
  title: string;
  description: string;
  items: ReviewItem[];
}

// ---------------------------------------------------------------------------
// Order CTA
// ---------------------------------------------------------------------------
export interface OrderPerk {
  icon: OrderPerkIconName;
  label: string;
}

export interface OrderStockist {
  icon: StockistIconName;
  label: string;
}

export interface OrderCTAData {
  badge: string;
  title: string;
  description: string;
  perks: OrderPerk[];
  price: string;
  originalPrice: string;
  freeShippingNote: string;
  whatsappHref: string;
  whatsappLabel: string;
  securityNote: string;
  stockistsLabel: string;
  stockists: OrderStockist[];
}

// ---------------------------------------------------------------------------
// Root Page Data
// ---------------------------------------------------------------------------
export interface BookPageData {
  hero: BookHeroData;
  pullQuote: PullQuoteData;
  pillars: PillarsSectionData;
  chapters: ChapterWalkthroughData;
  author: AuthorPerspectiveData;
  reviews: ReaderReviewsData;
  order: OrderCTAData;
}

// =============================================================================
// DATA
// =============================================================================

export const bookData: BookPageData = {
  // -------------------------------------------------------------------------
  // Hero
  // -------------------------------------------------------------------------
  hero: {
    metadata: {
      titleMl: "പണം, അധികാരം, ആരോഗ്യം",
      subtitleMl: "ഒരു മനഃശാസ്ത്ര പഠനം",
      titleEn: "Money, Power, Health: A Psychological Study",
      edition: "രണ്ടാം പതിപ്പ്",
      pages: "240 പേജുകൾ",
      language: "മലയാളം നോൺ-ഫിക്ഷൻ",
      coverImage: {
        src: "/assets/panam-adhikaram=-arogyam.webp",
        alt: "Panam Adhikaram Arogyam — Nisham PA — Book Cover",
      },
    },
    lead: "നമ്മുടെ ദൈനംദിന ജീവിതത്തിൽ പണവും അധികാരവും എങ്ങനെയാണ് മാനസിക സമ്മർദ്ദവും ആരോഗ്യപ്രശ്നങ്ങളുമായി മാറുന്നത്? പത്തു വർഷത്തിലേറെ നീണ്ട ക്ലിനിക്കൽ അനുഭവങ്ങളിലൂടെയും യഥാർത്ഥ ജീവിതസാഹചര്യങ്ങളിലൂടെയും നിഷാം പി.എ നടത്തുന്ന ഹൃദ്യമായ അന്വേഷണം.",
    stats: [
      { value: "12+", label: "വർഷത്തെ അനുഭവം" },
      { value: "18+", label: "ജീവിത കഥകൾ" },
      { value: "5,000+", label: "വായനക്കാർ" },
    ],
    ctas: [
      { label: "ഇപ്പോൾ തന്നെ വാങ്ങാം", href: "#order", variant: "primary" },
      {
        label: "സാമ്പിൾ വായിച്ചുനോക്കാം",
        href: "#chapters",
        variant: "secondary",
      },
    ],
    shippingNote:
      "കേരളത്തിലുടനീളം സ്പീഡ് പോസ്റ്റ് സൗകര്യം • എല്ലാ ഇന്ത്യൻ നഗരങ്ങളിലേക്കും ഡെലിവറി",
    pricePlaque: {
      title: "നിങ്ങളുടെ കൈകളിലേക്ക് നേരിട്ടെത്തുന്ന ഒപ്പിട്ട കോപ്പി",
      subtitle: "രചയിതാവ്: നിഷാം പി.എ (ക്ലിനിക്കൽ സൈക്കോളജിസ്റ്റ്)",
      editionLabel: "പ്രത്യേക പതിപ്പ്",
      price: "₹290",
    },
    badge: {
      label: "5,000+ വായനക്കാർ",
      subLabel: "കേരളത്തിലുടനീളം",
    },
  },

  // -------------------------------------------------------------------------
  // Pull Quote Banner
  // -------------------------------------------------------------------------
  pullQuote: {
    quote:
      "\"നമ്മുടെ ജീവിതത്തിൽ പണവും അധികാരവും വെറും ബാഹ്യമായ കാര്യങ്ങളല്ല; അത് നമ്മുടെ മനസ്സിന്റെയും ആഴത്തിലുള്ള ആഗ്രഹങ്ങളുടെയും പ്രതിഫലനമാണ്.\"",
    author: "നിഷാം പി.എ",
    citation: "അധ്യായം 4-ൽ നിന്ന്",
  },

  // -------------------------------------------------------------------------
  // Pillars Section
  // -------------------------------------------------------------------------
  pillars: {
    eyebrow: "മൂന്ന് പ്രധാന തലങ്ങൾ",
    title: "പുസ്തകം ചർച്ച ചെയ്യുന്ന മൂന്ന് പ്രധാന മേഖലകൾ",
    description:
      "ജീവിതത്തിലും ജോലിസ്ഥലത്തും കുടുംബത്തിലും നാം അനുഭവിക്കുന്ന യാഥാർത്ഥ്യങ്ങളിലേക്ക് ഒരു എളിയ എത്തിനോട്ടം.",
    items: [
      {
        id: "panam",
        part: "ഒന്നാം ഭാഗം",
        titleMl: "പണം (Wealth & Security)",
        heading: "സാമ്പത്തിക അരക്ഷിതാവസ്ഥയും അനാവശ്യ ആശങ്കകളും",
        description:
          "സമ്പത്ത് വർദ്ധിക്കുമ്പോഴും മനസ്സിന് ശാന്തി ലഭിക്കാത്തത് എന്തുകൊണ്ട്? സാമ്പത്തിക ഭയം, മറ്റുള്ളവരുമായുള്ള താരതമ്യം, അനാവശ്യ ചെലവുകളിലേക്ക് നയിക്കുന്ന മനഃശാസ്ത്രപരമായ കാരണങ്ങൾ എന്നിവയുടെ വിശദമായ വിശകലനം.",
        takeaways: [
          { text: "പണത്തെക്കുറിച്ചുള്ള ബാല്യകാല ഓർമ്മകളും ശീലങ്ങളും" },
          { text: "സമ്പാദ്യവും മാനസിക സംതൃപ്തിയും തമ്മിലുള്ള പൊരുത്തം" },
        ],
        accentColor: "gold",
        icon: "Wallet",
      },
      {
        id: "adhikaram",
        part: "രണ്ടാം ഭാഗം",
        titleMl: "അധികാരം (Authority & Ego)",
        heading: "ബന്ധങ്ങളിലും അധികാരങ്ങളിലും വരുന്ന പിടിവാശികൾ",
        description:
          "ഓഫീസിലും കുടുംബത്തിലും നാം കാണിക്കുന്ന ആധിപത്യ പ്രവണതകൾ പലപ്പോഴും ഉള്ളിലെ അപകർഷതാബോധത്തിന്റെ മറയാണോ? പരസ്പര ബഹുമാനത്തോടെ കാര്യങ്ങൾ സംസാരിച്ചു തീർക്കാനുള്ള പ്രായോഗിക സമീപനങ്ങൾ.",
        takeaways: [
          { text: "ഈഗോയും അധികാര വടംവലികളും ഒഴിവാക്കാനുള്ള വഴികൾ" },
          { text: "ബന്ധങ്ങളിൽ സമാധാനവും സ്വസ്ഥതയും നിലനിർത്താൻ" },
        ],
        accentColor: "navy",
        icon: "Building2",
      },
      {
        id: "arogyam",
        part: "മൂന്നാം ഭാഗം",
        titleMl: "ആരോഗ്യം (Health & Mind-Body)",
        heading: "മനസ്സിലെ സംഘർഷങ്ങളും ശരീരത്തിലെ അസുഖങ്ങളും",
        description:
          "തുടർച്ചയായ ടെൻഷൻ, ഉത്കണ്ഠ, ഉറക്കമില്ലായ്മ എന്നിവ എങ്ങനെയാണ് തലവേദന, അസിഡിറ്റി തുടങ്ങിയ ശാരീരിക അസ്വസ്ഥതകളായി മാറുന്നത്? മനസ്സമാധാനത്തിലൂടെ പൂർണ്ണ ആരോഗ്യം തിരിച്ചുപിടിക്കാം.",
        takeaways: [
          { text: "സ്ട്രെസ് തിരിച്ചറിയാനും നിയന്ത്രിക്കാനുമുള്ള വഴികൾ" },
          { text: "ശാന്തമായ ഉറക്കവും ഊർജ്ജസ്വലമായ ദിനചര്യയും" },
        ],
        accentColor: "amber",
        icon: "HeartPulse",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Chapter Walkthrough
  // -------------------------------------------------------------------------
  chapters: {
    eyebrow: "അധ്യായങ്ങളിലൂടെ",
    title: "പ്രധാന വിഷയങ്ങളും പാഠങ്ങളും",
    description:
      "ലളിതമായ മലയാളത്തിൽ, എല്ലാവർക്കും മനസ്സിലാകുന്ന തരത്തിൽ തയ്യാറാക്കിയ 9 പ്രധാന അധ്യായങ്ങൾ. ഓരോ അധ്യായത്തിനൊടുവിലും ആത്മപരിശോധനയ്ക്കുള്ള ചോദ്യങ്ങളും ഉൾപ്പെടുത്തിയിട്ടുണ്ട്.",
    readingStyleNote:
      "ക്ലിനിക്കൽ പദാവലികളില്ലാതെ, ഒരു നല്ല സുഹൃത്തിനോട് സംസാരിക്കുന്നതുപോലെ ലളിതവും ഊഷ്മളവുമായ ഭാഷയിൽ എഴുതപ്പെട്ട പുസ്തകം.",
    chapters: [
      {
        number: "01",
        titleMl: "താരതമ്യങ്ങളുടെ ലോകവും നഷ്ടപ്പെടുന്ന സംതൃപ്തിയും",
        pages: "32 പേജുകൾ",
        summary:
          "നമുക്ക് വേണ്ടതിനേക്കാൾ കൂടുതൽ മറ്റുള്ളവരെ ബോധ്യപ്പെടുത്താൻ നാം ചെലവഴിക്കുന്നതെങ്ങനെ? അയൽപക്ക, ബന്ധുജന താരതമ്യങ്ങൾ മനസ്സിൽ സൃഷ്ടിക്കുന്ന നിരന്തരമായ അസ്വസ്ഥതകൾ.",
      },
      {
        number: "02",
        titleMl: "അധികാരമോ അതോ അരക്ഷിതാവസ്ഥയോ?",
        pages: "28 പേജുകൾ",
        summary:
          "കുടുംബത്തിലും ജോലിസ്ഥലത്തും മറ്റുള്ളവരെ വരുതിയിലാക്കാൻ ശ്രമിക്കുന്നത് യഥാർത്ഥത്തിൽ ഒരു സംരക്ഷണ കവചമാണോ? അമിതാധികാര പ്രവണതകളെ എങ്ങനെ മറികടക്കാം?",
      },
      {
        number: "03",
        titleMl: "ശരീരം സംസാരിക്കുമ്പോൾ: സമ്മർദ്ദവും അസുഖങ്ങളും",
        pages: "34 പേജുകൾ",
        summary:
          "മനസ്സിൽ അടക്കിവെച്ച ദേഷ്യവും ഉത്കണ്ഠകളും പലവിധ ശാരീരിക വേദനകളായി മാറുന്ന വഴി. മനസ്സിനെ തിരിച്ചറിഞ്ഞ് ശരീരക്ഷീണത്തെ അകറ്റിനിർത്താനുള്ള ഉപായങ്ങൾ.",
      },
      {
        number: "04",
        titleMl: "സന്തുലിതമായ ഒരു ജീവിതത്തിലേക്ക് ലളിതമായ വഴികൾ",
        pages: "30 പേജുകൾ",
        summary:
          "ആഗ്രഹങ്ങളും ആവശ്യങ്ങളും വേർതിരിച്ച് കണ്ട്, ഉള്ളതുകൊണ്ട് സമാധാനത്തോടെയും സന്തോഷത്തോടെയും ജീവിക്കാനുള്ള പ്രായോഗിക മനഃശാസ്ത്ര നിർദ്ദേശങ്ങൾ.",
      },
      {
        number: "05",
        titleMl: "ആത്മബോധം: ഉള്ളിൽ നിന്ന് വിജയം",
        pages: "24 പേജുകൾ",
        summary:
          "പണവും അധികാരവും ആഗ്രഹിക്കുന്നതിന് പിന്നിൽ സ്വന്തം ആഴമേറിയ ആഗ്രഹങ്ങൾ ഏതൊക്കെ? ആത്മബോധം വളർത്തിയെടുക്കുന്നതിലൂടെ ജീവിതത്തിൽ കൂടുതൽ ദൃഢചിത്തതയോടെ തീരുമാനങ്ങൾ എടുക്കാം.",
      },
      {
        number: "06",
        titleMl: "കുടുംബ ബന്ധങ്ങൾ: ആശ്വാസമോ ഭാരമോ?",
        pages: "26 പേജുകൾ",
        summary:
          "കുടുംബത്തിൽ പണത്തിന്റെ പേരിലും അധികാരത്തിന്റെ പേരിലും ഉണ്ടാകുന്ന ഉൾസംഘർഷങ്ങൾ. അനുരഞ്ജനവും ആദരവും ഉറപ്പാക്കാനുള്ള ആശയവിനിമയ ഉപകരണങ്ങൾ.",
      },
      {
        number: "07",
        titleMl: "ജോലിസ്ഥലത്തെ ആരോഗ്യകരമായ അതിർവരമ്പുകൾ",
        pages: "28 പേജുകൾ",
        summary:
          "ഓഫീസ് രാഷ്ട്രീയം, ടാർഗ്ഗറ്റ് സമ്മർദ്ദം, ബോസ്-സഹപ്രവർത്തക ബന്ധങ്ങൾ — ഇവ മാനസിക ആരോഗ്യത്തെ ബാധിക്കാതെ നോക്കാൻ ആരോഗ്യകരമായ അതിർവരമ്പുകൾ സ്ഥാപിക്കാം.",
      },
      {
        number: "08",
        titleMl: "ഉൾഭയങ്ങൾ: ആരോഗ്യത്തിന്റെ ആഴം",
        pages: "20 പേജുകൾ",
        summary:
          "ഉള്ളിൽ ഒളിഞ്ഞിരിക്കുന്ന ഭയങ്ങളും ആശങ്കകളും ദീർഘകാലാടിസ്ഥാനത്തിൽ ശാരീരിക ആരോഗ്യത്തെ ഹനിക്കുന്ന വഴി. ഇവ തിരിച്ചറിഞ്ഞ് ചികിത്സിക്കാനുള്ള ലളിതമായ ഉപായങ്ങൾ.",
      },
      {
        number: "09",
        titleMl: "പൂർണ്ണ ജീവിതത്തിലേക്കുള്ള പ്രായോഗിക ചുവടുകൾ",
        pages: "18 പേജുകൾ",
        summary:
          "പണം, അധികാരം, ആരോഗ്യം — ഈ മൂന്ന് തലങ്ങളും ഒരുമിച്ചു ചേർത്ത് ഒരു സമഗ്ര, ആനന്ദകരമായ ജീവിതം കെട്ടിപ്പടുക്കാനുള്ള പ്രായോഗിക ചുവടുകൾ.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Author Perspective
  // -------------------------------------------------------------------------
  author: {
    eyebrow: "എഴുത്തുകാരന്റെ ആമുഖം",
    title: "ഈ പുസ്തകത്തെക്കുറിച്ച് നിഷാം",
    paragraphs: [
      "കോഴിക്കോട്ടെയും കൊച്ചിയിലെയും കൗൺസിലിംഗ് മുറികളിൽ ഇരുന്ന് സംസാരിക്കുമ്പോൾ, സമൂഹത്തിന്റെ കണ്ണിൽ എല്ലാ വിജയങ്ങളും കൈവരിച്ച ഒരുപാട് പേരെ ഞാൻ കണ്ടിട്ടുണ്ട്. വലിയ വീടുകൾ, ഉയർന്ന ശമ്പളം, പൊതുസമൂഹത്തിൽ ആദരവ്... എന്നാൽ അവരുടെ കണ്ണുകളിൽ ശാന്തതയോ മനസ്സിന് ആശ്വാസമോ ഉണ്ടായിരുന്നില്ല.",
      "നമ്മുടെ സ്വീകരണമുറികളിലും ഊണുമേശകളിലും ഓഫീസിലെ ചായസമയങ്ങളിലും ചർച്ച ചെയ്യപ്പെടേണ്ടതാണ് ഈ വിഷയങ്ങൾ. സാധാരണ മനുഷ്യരുടെ സങ്കടങ്ങളും സന്തോഷങ്ങളും കണ്ടറിഞ്ഞ അനുഭവത്തിൽ നിന്നാണ് ഈ പുസ്തകം പിറന്നത്. നിങ്ങളുടെ ജീവിതത്തിലും ഇത് ചെറിയൊരു വെളിച്ചം പകരുമെന്ന് ഞാൻ പൂർണ്ണമായും വിശ്വസിക്കുന്നു.",
    ],
    pullQuote:
      "\"മനഃശാസ്ത്രം പുസ്തകത്താളുകളിൽ ഒതുങ്ങേണ്ട ഒന്നല്ല; അത് നമ്മുടെ ഓരോരുത്തരുടെയും സാധാരണ ജീവിതത്തിൽ പ്രയോജനപ്പെടേണ്ട ഒന്നാണ്.\"",
    author: {
      name: "നിഷാം പി.എ",
      role: "ക്ലിനിക്കൽ സൈക്കോളജിസ്റ്റ് & രചയിതാവ്",
    },
    sideCards: [
      {
        type: "quote",
        label: "പ്രധാന ചിന്ത",
        content:
          "\"രോഗങ്ങളില്ലാത്ത അവസ്ഥ മാത്രമല്ല ആരോഗ്യം; പണവും അധികാരവും കൈകാര്യം ചെയ്യുമ്പോൾ മനസ്സിൽ തോന്നുന്ന ശാന്തത കൂടിയാണത്.\"",
      },
      {
        type: "foundation",
        label: "ശാസ്ത്രീയ അടിത്തറ",
        content:
          "കേരളീയ സാമൂഹിക സാഹചര്യങ്ങളെയും കുടുംബ ഘടനകളെയും മനസ്സിലാക്കി ചിട്ടപ്പെടുത്തിയ മനഃശാസ്ത്ര പഠനങ്ങൾ.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Reader Reviews
  // -------------------------------------------------------------------------
  reviews: {
    eyebrow: "വായനക്കാരുടെ അഭിപ്രായങ്ങൾ",
    title: "വായനക്കാരുടെ അനുഭവങ്ങൾ",
    description:
      "പുസ്തകം വായിച്ച് ജീവിതത്തിൽ നല്ല മാറ്റങ്ങൾ അനുഭവിച്ചറിഞ്ഞ കേരളത്തിലെ വിവിധ മേഖലകളിൽ നിന്നുള്ള പ്രിയ വായനക്കാരുടെ വാക്കുകൾ.",
    items: [
      {
        id: "haris-k",
        stars: 5,
        quote:
          "\"എന്റെ ചിന്തകളെയും കുടുംബത്തിലെ സാമ്പത്തിക തീരുമാനങ്ങളെയും ശരിയായ ദിശയിലേക്ക് നയിക്കാൻ ഈ പുസ്തകം ഒരുപാട് സഹായിച്ചു.\"",
        author: "ഹാരിസ് കെ.",
        role: "വ്യാപാരി, കോഴിക്കോട്",
        verified: true,
      },
      {
        id: "suma-v-nair",
        stars: 5,
        quote:
          "\"സ്കൂളിലെയും വീട്ടിലെയും പല പ്രശ്നങ്ങളെയും മറ്റൊരു കണ്ണിലൂടെ കാണാൻ എനിക്ക് സാധിച്ചു. വളരെ ലളിതമായ ശൈലി.\"",
        author: "സുമ വി. നായർ",
        role: "പ്രിൻസിപ്പൽ, തൃശൂർ",
        verified: true,
      },
      {
        id: "dr-faisal",
        stars: 5,
        quote:
          "\"വർഷങ്ങളായി അനുഭവിച്ചിരുന്ന തലവേദനയുടെയും ടെൻഷന്റെയും മാനസിക കാരണങ്ങൾ തിരിച്ചറിയാൻ സാധിച്ചു.\"",
        author: "ഡോ. ഫൈസൽ റഹ്മാൻ",
        role: "ഡോക്ടർ, മലപ്പുറം",
        verified: true,
      },
      {
        id: "anjali-menon",
        stars: 5,
        quote:
          "\"ഐ.ടി മേഖലയിലെ അമിത ജോലിഭാരവും ആകുലതകളും എങ്ങനെ കൈകാര്യം ചെയ്യണമെന്ന് എനിക്ക് മനസ്സിലാക്കിത്തന്ന പുസ്തകം.\"",
        author: "അഞ്ജലി മേനോൻ",
        role: "സോഫ്റ്റ്‌വെയർ എൻജിനീയർ, കൊച്ചി",
        verified: true,
      },
      {
        id: "muhammad-shafi",
        stars: 5,
        quote:
          "\"ഭാരമേറിയ സിദ്ധാന്തങ്ങളില്ലാതെ, ഒരു നല്ല സുഹൃത്ത് നമ്മളോട് സംസാരിക്കുന്നത് പോലെ തോന്നി.\"",
        author: "മുഹമ്മദ് ഷാഫി",
        role: "ഗവേഷകൻ, കാലിക്കറ്റ്",
        verified: true,
      },
      {
        id: "kv-mathew",
        stars: 5,
        quote:
          "\"എന്റെ മക്കൾക്ക് ഞാൻ നൽകിയ ഏറ്റവും നല്ല സമ്മാനമാണിത്. ജീവിതത്തെക്കുറിച്ച് നല്ലൊരു ബോധ്യം നൽകുന്നു.\"",
        author: "കെ. വി. മാത്യു",
        role: "റിട്ട. ബാങ്ക് മാനേജർ, കോട്ടയം",
        verified: true,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Order CTA
  // -------------------------------------------------------------------------
  order: {
    badge: "നേരിട്ടുള്ള വിതരണം",
    title: "രചയിതാവിന്റെ ഒപ്പോടുകൂടിയ കോപ്പി നേരിട്ട് ഓർഡർ ചെയ്യാം",
    description:
      "നിങ്ങളുടെ വീട്ടുപടിക്കലേക്ക് സ്പീഡ് പോസ്റ്റിൽ സുരക്ഷിതമായി പുസ്തകം എത്തും. രചയിതാവിന്റെ കയ്യൊപ്പും ആശംസാ കുറിപ്പും ഒപ്പം ഒരു മനോഹരമായ ബുക്ക്‌മാർക്കും ഉണ്ടാകും.",
    perks: [
      { icon: "PenLine", label: "രചയിതാവിന്റെ സ്വന്തം കയ്യൊപ്പ്" },
      { icon: "Truck", label: "കേരളത്തിലുടനീളം സൗജന്യ ഡെലിവറി" },
      { icon: "Clock", label: "24 മണിക്കൂറിനുള്ളിൽ അയക്കുന്നു" },
      { icon: "Banknote", label: "GPay / PhonePe / UPI സൗകര്യം" },
    ],
    price: "₹290",
    originalPrice: "₹350",
    freeShippingNote: "തപാൽ ചാർജ്ജ് സൗജന്യം (കേരളത്തിൽ)",
    whatsappHref:
      "https://wa.me/916238081953?text=Hello%20Nisham%20PA%20Office%2C%20I%20would%20like%20to%20order%20a%20signed%20copy%20of%20Panam%2C%20Adhikaram%2C%20Arogyam.%20Please%20confirm%20delivery%20details.",
    whatsappLabel: "വാട്സാപ്പ് വഴി ഓർഡർ ചെയ്യാം",
    securityNote: "എഴുത്തുകാരന്റെ ഓഫീസിൽ നിന്നുള്ള നേരിട്ടുള്ള സഹായം",
    stockistsLabel: "മറ്റ് പുസ്തകശാലകളിലും ലഭ്യമാണ്",
    stockists: [
      { icon: "BookOpen", label: "പ്രമുഖ പുസ്തകശാലകളിൽ" },
      { icon: "Store", label: "കേരള സ്റ്റേറ്റ് ലൈബ്രറികളിൽ" },
    ],
  },
};

