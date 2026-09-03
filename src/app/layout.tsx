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

export const metadata: Metadata = {
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
  openGraph: {
    title: "Charul Projects - Construction & Project Management, Nashik",
    description:
      "Turnkey projects, construction management and contracting in Nashik since 1997 - hospitals, MIDC industrial units, homes, wineries and landscapes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charul Projects - Construction & Project Management, Nashik",
    description:
      "Turnkey projects, construction management and contracting in Nashik since 1997 - hospitals, MIDC industrial units, homes, wineries and landscapes.",
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
