import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Writing on the Wall",
  description: "A digital archive of technical work, policy frameworks, and narrative explorations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
