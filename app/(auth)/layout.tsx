import Header from "@/components/Header";

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="">
        <Header />
        <div>{children}</div>
      </div>
    );
  }
  