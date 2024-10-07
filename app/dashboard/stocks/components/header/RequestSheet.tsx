'use client'
import {FC} from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button";
import useActiveStockMutationRequest from "@/hooks/useActiveStockMutationRequest";
import RequestItem from "@/app/dashboard/stocks/components/header/RequestItem";
import useDashboardStore from "@/hooks/useDashboardStore";


const RequestSheet: FC = () => {
    const warehouse = useDashboardStore(state => state.warehouse)
    const { data, isLoading, error } = useActiveStockMutationRequest(warehouse.id)
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>View Requests</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Stock Mutation Requests</SheetTitle>
                    <SheetDescription>
                        Review and manage incoming stock mutation requests.
                    </SheetDescription>
                </SheetHeader>
                <div>
                    {data?.map( request => <RequestItem key={request.id} {...request} />)}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default RequestSheet