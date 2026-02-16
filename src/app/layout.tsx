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
  title: "DearDiary",
  description: "A minimal digital journal.",
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
