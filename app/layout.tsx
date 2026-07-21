import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Air Delivery",
  description: "Minimal full-stack Next.js delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-zinc-50 text-zinc-900 antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
