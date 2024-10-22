"use client"

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const statustrxlink = [
    { link: "/waiting-payment", label: "Menunggu Pembayaran" },
    { link: "/waiting-confirmation", label: "Menunggu Konfirmasi" },
    { link: "/in-process", label: "Dalam Proses" },
    { link: "/order-sent", label: "Dikirim" },
    { link: "/order-confirmation", label: "Dikonfirmasi" },
    { link: "/cancel-order", label: "Dibatalkan " },
];

const StatusTransactionNav: React.FC = () => {
    const currentPath = usePathname(); 

    return (
        <div className="flex items-center gap-5 overflow-x-scroll status-trx">
            {statustrxlink.map((status, index) => {
                const isActive = currentPath === status.link; 

                return (
                    <Link
                        href={status.link}
                        key={index}
                        className={`py-2 px-5 border rounded-full text-xs font-medium md:text-sm whitespace-nowrap
                        ${isActive ? "bg-red-600 text-white border-red-600" : "text-red-600 border-red-600"}`}
                    >
                        {status.label}
                    </Link>
                );
            })}
        </div>
    );
};

export default StatusTransactionNav;