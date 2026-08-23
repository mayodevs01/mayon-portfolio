import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAYODEVS | Creative Studio × AI Lab",
  description:
    "A premium creative operating system for design, content, AI automation, and SaaS solutions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
