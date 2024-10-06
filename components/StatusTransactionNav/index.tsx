import Link from "next/link";
import React from "react";

const statustrxlink = [
    { link: "/waiting-payment", label: "Menunggu Pembayaran" },
    { link: "/in-process", label: "Dalam Proses" },
    { link: "/order-sent", label: "Dikirim" },
    { link: "/order-confirmation", label: "Dikonfirmasi" },
    { link: "/cancel-order", label: "Dibatalkan " },
]

const StatusTransactionNav: React.FC = () => {
    return(
        <>
        <div className="flex items-center gap-5">
            {statustrxlink.map((status, index) => (
                <Link href={status.link} key={index} className="text-red-600 py-2 px-5 border border-red-600 rounded-full">{status.label}</Link>
            ))}
        </div>
        </>
    )
}

export default StatusTransactionNav;