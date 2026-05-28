/**
 * Copy to `app/layout.tsx` and wire fonts so BookingSection picks up
 * Cormorant Garamond, DM Sans, and Space Mono via CSS variables.
 */
import type { Metadata } from "next";
import { brandFontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antilego — AI Receptionist Agency",
  description:
    "AI receptionists that handle every call, book appointments, and qualify leads — 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={brandFontVariables}>
      <body className="bg-black font-[family-name:var(--font-sans)] antialiased text-white">
        {children}
      </body>
    </html>
  );
}
