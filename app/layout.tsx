import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Numans } from "next/font/google";
import { Jura } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const numans = Numans({
  weight: "400",
  variable: "--font-numans",
  subsets: ["latin"],
});

const jura = Jura({
  weight: ["400", "500", "600"],
  variable: "--font-jura",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "stop the tilt.",
  description: "A simple app to help you calm down after frustrating gaming sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${numans.variable} ${jura.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
