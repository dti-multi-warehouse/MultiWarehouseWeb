import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Alpha March",
  description: "Your daily shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={montserrat.className}>
        <ReactQueryProvider>
          <SessionProviderWrapper>
            {children}
          </SessionProviderWrapper>
        </ReactQueryProvider>
    </body>
    </html>
  </ClerkProvider>
  );
}
