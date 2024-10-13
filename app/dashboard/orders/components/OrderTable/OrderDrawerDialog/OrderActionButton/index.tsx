import {FC} from "react";
import {Status} from "@/types/order";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {config} from "@/constants/url";
import {useCancelOrder, useConfirmPayment, useSendOrder} from "@/hooks/useOrder";

interface OrderActionButtonProps {
    status: Status,
    id: number
    setOpen: (open: boolean) => void
}

const OrderActionButton: FC<OrderActionButtonProps> = ({status, id, setOpen}) => {
    const cancel = useCancelOrder()
    const confirm = useConfirmPayment()
    const deliver = useSendOrder()
    const handleCancel = () => {
        cancel.mutate(id)
        setOpen(false)
    }

    const handleConfirm = () => {
        confirm.mutate(id)
        setOpen(false)
    }

    const handleDeliver = () => {
        deliver.mutate(id)
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