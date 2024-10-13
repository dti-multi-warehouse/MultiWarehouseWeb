import StatusTransactionNav from "@/components/StatusTransactionNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <div className="m-5 md:m-10 flex flex-col gap-5">
        <h1 className="text-xl font-bold">Status Transaksi</h1>
        <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
        <div className="border-2 rounded-xl">
          <div className="p-5 overflow-hidden">
            <StatusTransactionNav />
          </div>
          <hr className="border-dashed border-gray-800" />
          <div className="p-3 sm:p-5 md:p-10">
            {children}
          </div>
        </div>
      </div>
    );
}