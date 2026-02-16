import type { Metadata } from "next";
import { Inter, Libre_Caslon_Text, Faustina } from "next/font/google"; // Import fonts
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreCaslonText = Libre_Caslon_Text({
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
  subsets: ["latin"],
});

const faustina = Faustina({
  variable: "--font-faustina",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dear-diary.vercel.app"), // Fallback or env
  title: "DearDiary",
  description: "A minimal digital journal.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "DearDiary",
    description: "A minimal digital journal.",
    images: [
      "/android-chrome-512x512.png",
      "/android-chrome-192x192.png",
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${libreCaslonText.variable} ${faustina.variable} antialiased bg-paper text-espresso min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
