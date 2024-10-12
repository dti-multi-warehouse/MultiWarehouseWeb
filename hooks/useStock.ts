import {useQuery} from "react-query";
import {getAllStocks} from "@/api/stock/getAllStocks";
import {getStockDetails} from "@/api/stock/getStockDetails";
import {getWarehouseAndStockAvailability} from "@/api/stock/getWarehouseAndStockAvailability";
import {getProductAndStockAvailability} from "@/api/stock/getProductAndStockAvailability";
import {getActiveStockMutationRequest} from "@/api/stock/getActiveStockMutationRequest";


export const useAllStocks = (warehouseId: number, date: Date, query: string, page: number, perPage: number) => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stocks', warehouseId, date, query, page, perPage],
        queryFn: async () => getAllStocks(warehouseId, date, query, page, perPage),
    })
    return { data, isLoading, error }
}

export const useStockDetails = (warehouseId: number, productId: number, date: Date) => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stock', 'details', warehouseId, productId, date],
        queryFn: async () => getStockDetails(warehouseId, productId, date),
    })

    return { data, isLoading, error }
}

export const useWarehouseAndStockAvailability = (warehouseId: number, productId: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stock', 'warehouse', warehouseId, productId],
        queryFn: async () => getWarehouseAndStockAvailability(warehouseId, productId),
    })

    return { data, isLoading, error }
}

export const useProductAndStockAvailability = (warehouseId: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stock', 'product', warehouseId],
        queryFn: async () => getProductAndStockAvailability(warehouseId),
    })

    return { data, isLoading, error }
}

export const useActiveStockMutationRequest = (warehouseId: number) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery( {
        queryKey: ['stock', 'mutation'],
        queryFn: async () => getActiveStockMutationRequest(warehouseId),
        staleTime: 60 * 1000
    })

    return { data, isLoading, error }
}