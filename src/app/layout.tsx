import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

import "./globals.css";

export const metadata: Metadata = {
  title: "Cipher Atlas",
  description: "An original educational cryptography visualization studio for AES, DES, and Diffie-Hellman."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="site-shell site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
