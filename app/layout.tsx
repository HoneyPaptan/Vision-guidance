import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vision Guidance - AI-Powered Vision Agents",
  description: "Real-time AI vision agents for sports coaching, security monitoring, interview assistance and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
