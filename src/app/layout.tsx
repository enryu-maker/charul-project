import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://charul-project.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Charul Projects - Construction & Project Management, Nashik",
  description:
    "Turnkey projects, construction management and contracting in Nashik since 1997 - hospitals, MIDC industrial units, homes, wineries and landscapes.",
  keywords: [
    "Construction Nashik",
    "Project Management Nashik",
    "Turnkey Construction Nashik",
    "MIDC Industrial Construction",
    "Hospital Construction Nashik",
    "Winery Construction Nashik",
    "Charul Projects",
  ],
  authors: [{ name: "Charul Projects" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Charul Projects - Construction & Project Management, Nashik",
    description:
      "Turnkey projects, construction management and contracting in Nashik since 1997 - hospitals, MIDC industrial units, homes, wineries and landscapes.",
    type: "website",
    url: "/",
    images: ["/hero-construction.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charul Projects - Construction & Project Management, Nashik",
    description:
      "Turnkey projects, construction management and contracting in Nashik since 1997 - hospitals, MIDC industrial units, homes, wineries and landscapes.",
    images: ["/hero-construction.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
