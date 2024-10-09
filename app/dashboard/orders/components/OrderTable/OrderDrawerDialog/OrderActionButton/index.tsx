import {FC} from "react";
import {Status} from "@/types/order";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {config} from "@/constants/url";

interface OrderActionButtonProps {
    status: Status,
    id: number
    setOpen: (open: boolean) => void
}

const OrderActionButton: FC<OrderActionButtonProps> = ({status, id, setOpen}) => {
    const handleCancel = () => {
        axios.put(config.BASE_URL + config.API_VER + config.endpoints.order + `/${id}/cancel`)
        setOpen(false)
    }

    const handleConfirm = () => {
        axios.put(config.BASE_URL + config.API_VER + config.endpoints.order + `/${id}/confirm`)
        setOpen(false)
    }

    const handleDeliver = () => {
        axios.put(config.BASE_URL + config.API_VER + config.endpoints.order + `/${id}/send`)
        setOpen(false)
    }

    return {
        'AWAITING_PAYMENT': <Button className={'w-full bg-red-500'} onClick={handleCancel}>Cancel Order</Button>,
        'AWAITING_CONFIRMATION': <>
            <Button className={'w-full bg-cyan-500'} onClick={handleConfirm}>Confirm Payment</Button>
            <Button className={'w-full bg-red-500'} onClick={handleCancel}>Cancel Order</Button>
        </>,
        'PROCESSING': <>
            <Button className={'w-full bg-blue-500'} onClick={handleDeliver}>Deliver</Button>
            <Button className={'w-full bg-red-500'} onClick={handleCancel}>Cancel Order</Button>
        </>,
        'DELIVERING': <></>,
        'COMPLETED': <></>,
        'CANCELLED': <></>,
    }[status]
}

export default OrderActionButton