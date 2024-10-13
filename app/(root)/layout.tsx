import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ClientRootLayout from "./ClientRootLayout";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ClientRootLayout>
      <div>
        <div className="z-10 relative">
          <Header />
        </div>
        <div className="z-0">{children}</div>
        <Footer />
      </div>
    </ClientRootLayout>
  );
}