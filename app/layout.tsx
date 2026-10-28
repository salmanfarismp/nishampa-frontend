import type { Metadata } from "next";
import { Inter, Newsreader, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-ml",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nishampa.com"),
  title: "Nisham PA — Psychologist, Author & Consultant",
  description:
    "Consulting psychologist, author, and executive advisor for leaders, businesses, and families. Author of Panam, Adhikaram, Arogyam and founder of Sensebridge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${notoSansMalayalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}

