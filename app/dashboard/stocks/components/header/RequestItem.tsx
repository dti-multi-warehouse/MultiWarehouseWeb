import {FC} from "react";
import {StockMutation} from "@/types/datatypes";
import {Button} from "@/components/ui/button";


const RequestItem: FC<StockMutation> = ({
    id,
    warehouseToId,
    warehouseFromId,
    name,
    quantity,
    created_at

                                        }) => {
    return (
        <div className="mb-4 p-4 border rounded-lg">
            <p><strong>From:</strong> {warehouseFromId}</p>
            <p><strong>To:</strong> {warehouseToId}</p>
            <p><strong>Item:</strong> {name}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <div className="mt-2">
                <Button className="mr-2">Accept</Button>
                <Button variant="outline">Reject</Button>
            </div>
        </div>
    )
}

export default RequestItem;