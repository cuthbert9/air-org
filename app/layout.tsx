import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Airtel Partner Portal",
  description: "Internal analytics portal for Airtel partner performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
