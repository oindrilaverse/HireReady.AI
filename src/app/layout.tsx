import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HireReady.AI | Recruiter-Grade Resume Scanner & ATS Optimizer",
    template: "%s | HireReady.AI"
  },
  description: "Score your resume against recruiter-grade ATS algorithms, identify missing keywords, close skill gaps, and match with the perfect roles using next-gen AI.",
  metadataBase: new URL("https://hire-ready-ai-v2.vercel.app"),
  openGraph: {
    title: "HireReady.AI | Recruiter-Grade Resume Scanner & ATS Optimizer",
    description: "Score your resume against recruiter-grade ATS algorithms, identify missing keywords, close skill gaps, and match with the perfect roles.",
    url: "https://hire-ready-ai-v2.vercel.app",
    siteName: "HireReady.AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/cinematic-poster.jpg",
        width: 1200,
        height: 630,
        alt: "HireReady.AI - AI Resume Scanner & ATS Optimizer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HireReady.AI | Recruiter-Grade Resume Scanner & ATS Optimizer",
    description: "Score your resume against recruiter-grade ATS algorithms, identify missing keywords, close skill gaps, and match with the perfect roles.",
    images: ["/cinematic-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#040406] text-[#f4f4f5]">{children}</body>
    </html>
  );
}
