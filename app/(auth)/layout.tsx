
import Header from "@/components/Header";
import RouteToAuth from "@/components/ProtectedRoute/RouteToAuth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      <RouteToAuth />
      <div>{children}</div>
    </div>
  );
}
