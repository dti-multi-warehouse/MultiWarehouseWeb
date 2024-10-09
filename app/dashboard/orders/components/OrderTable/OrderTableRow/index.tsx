import React, {FC} from "react";
import OrderDrawerDialog from "@/app/dashboard/orders/components/OrderTable/OrderDrawerDialog";
import {TableCell, TableRow} from "@/components/ui/table";
import {Order} from "@/types/order";
import StatusBadge from "app/dashboard/orders/components/OrderTable/StatusBadge";


const OrderTableRow: FC<Order> = (order) => {
    return (
        <OrderDrawerDialog {...order}>
            <TableRow>
                <TableCell className="font-medium">#{order.id}</TableCell>
                {/*<TableCell>{order.name}</TableCell>*/}
                {/*<TableCell>{order.Address}</TableCell>*/}
                <TableCell className={"w-[150px]"}>{order.createdAt.toLocaleString().split('T')[0]}</TableCell>
                <TableCell className={"text-center"}>
                    <StatusBadge status={order.status} />
                </TableCell>
            </TableRow>
        </OrderDrawerDialog>
    )
}

export default OrderTableRow