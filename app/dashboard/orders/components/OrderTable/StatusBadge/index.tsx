import {FC} from "react";
import {Badge} from "@/components/ui/badge"
import {Status} from "@/types/order";

interface StatusBadgeProps {
    status: Status;
}

const StatusBadge: FC<StatusBadgeProps> = ({status}) => {
    return {
        'AWAITING_PAYMENT': <Badge className={'w-fit bg-orange-500'}>Pending</Badge>,
        'AWAITING_CONFIRMATION': <Badge className={'w-fit bg-yellow-500'}>Confirming</Badge>,
        'PROCESSING': <Badge className={'w-fit bg-cyan-500'}>Processing</Badge>,
        'DELIVERING': <Badge className={'w-fit bg-blue-500'}>Delivering</Badge>,
        'COMPLETED': <Badge className={'w-fit bg-green-500'}>Completed</Badge>,
        'CANCELLED': <Badge className={'w-fit bg-red-500'}>Cancelled</Badge>,
    }[status]
}

export default StatusBadge