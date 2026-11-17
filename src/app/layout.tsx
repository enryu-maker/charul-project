import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased selection:bg-emerald-400 selection:text-slate-900">{children}</body>
    </html>
  );
}
