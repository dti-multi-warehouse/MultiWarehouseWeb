import {FC} from "react";
import {StockMutation} from "@/types/datatypes";
import {Button} from "@/components/ui/button";
import {useAcceptMutationRequest, useRejectMutationRequest} from "@/hooks/useStock";

const RequestItem: FC<StockMutation> = ({
    id,
    warehouseToName,
    name,
    quantity,
    created_at
}) => {
    const useAccept = useAcceptMutationRequest()
    const useReject = useRejectMutationRequest()
    const handleAccept = () => {
        useAccept.mutate(id)
    }

    const handleReject = () => {
        useReject.mutate(id)
    }
    return (
        <div className="mb-4 p-4 border rounded-lg">
            <p><strong>Requester:</strong> {warehouseToName}</p>
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