import { Cormorant_Garamond, DM_Sans, Space_Mono } from "next/font/google";

/** Apply all three `.variable` classes on `<html>` or `<body>` in `app/layout.tsx`. */
export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-display",
  display: "swap",
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const brandFontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
].join(" ");
