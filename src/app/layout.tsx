import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CrisisLens — Understand Emergency Documents",
  description:
    "CrisisLens helps people under stress understand emergency documents by keeping the original visible, highlighting confusing sections, and translating them into plain language.",
  keywords: ["crisis", "document translator", "plain language", "emergency", "Kalahandi", "Odia"],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "CrisisLens",
    description: "Understand emergency documents when every minute counts.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CrisisLens — Clarity when it counts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrisisLens",
    description: "Understand emergency documents when every minute counts.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
