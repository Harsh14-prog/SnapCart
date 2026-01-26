import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/Providers";

export const metadata: Metadata = {
  title: "SnapCart 10 Minute Grocerry Delivery App",
  description: "10 Minute Grocerry Delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-linear-to-b from-green-100 to-white">
        <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
