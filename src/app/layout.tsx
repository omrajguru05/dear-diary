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
  title: "Entries Of Clock | Om",
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Entries Of Clock | Om",
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
