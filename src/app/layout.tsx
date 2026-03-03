import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "utxo AG — Email-First AI Agents",
  description:
    "We build agentic coworkers. You hire them by email. utxo AG is a product studio focused on Email-First AI Agents that integrate into your existing workflows.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "utxo AG — Email-First AI Agents",
    description:
      "We build agentic coworkers. You hire them by email. utxo AG is a product studio focused on Email-First AI Agents that integrate into your existing workflows.",
    type: "website",
    url: "https://utxo.ag",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
