import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/Providers";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";

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
      <body className="w-full min-h-[200vh] bg-linear-to-b from-green-100 to-white">
        <Providers>
          <StoreProvider>
            <InitUser/>
            {children}
            </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
