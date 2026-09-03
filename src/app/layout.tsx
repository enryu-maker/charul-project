import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
