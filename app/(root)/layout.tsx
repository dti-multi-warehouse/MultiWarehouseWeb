import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        <div className="z-10 relative">
          <Header />
        </div>
        <div className="z-0">{children}</div>
        <Footer />
      </div>
    );
  }
  