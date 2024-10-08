import {FC} from "react";
import {StockMutation} from "@/types/datatypes";
import {Button} from "@/components/ui/button";
import {config} from "@/constants/url";
import axios from "axios";


interface RequestItemProps extends StockMutation {
    refetch: () => void;
}

const RequestItem: FC<RequestItemProps> = ({
    id,
    warehouseToId,
    warehouseFromId,
    name,
    quantity,
    created_at,
    refetch
                                        }) => {
    const url = config.BASE_URL + config.API_VER + config.endpoints.stockMutation + `/${id}`
    const handleAccept = () => {
        axios.put(url + "/accept")
        refetch()
    }

    const handleReject = () => {
        axios.put(url + "/reject")
        refetch()
    }
    return (
        <div className="mb-4 p-4 border rounded-lg">
            <p><strong>From:</strong> {warehouseFromId}</p>
            <p><strong>To:</strong> {warehouseToId}</p>
            <p><strong>Item:</strong> {name}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <div className="mt-2">
                <Button className="mr-2" onClick={handleAccept}>Accept</Button>
                <Button variant="outline" onClick={handleReject}>Reject</Button>
            </div>
        </div>
    )
}

export default RequestItem;