import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello! My name is Jodeci Correa — UX/UI Designer",
  description: "10 years of experience in e-commerce, finance, and graphic design. UX/UI Designer crafting thoughtful digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}