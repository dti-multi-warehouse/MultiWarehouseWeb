import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAllStocks} from "@/api/stock/getAllStocks";
import {getStockDetails} from "@/api/stock/getStockDetails";
import {getWarehouseAndStockAvailability} from "@/api/stock/getWarehouseAndStockAvailability";
import {getProductAndStockAvailability} from "@/api/stock/getProductAndStockAvailability";
import {getActiveStockMutationRequest} from "@/api/stock/getActiveStockMutationRequest";
import {getSession} from "next-auth/react";
import apiClient from "@/lib/apiClient";
import {AxiosError} from "axios";
import {config} from "@/constants/url";

const attachToken = async (configs: any) => {
    const session = await getSession();
    if (session?.accessToken) {
        configs.headers = {
            ...configs.headers,
            Authorization: `Bearer ${session.accessToken}`,
        };
    }
    return configs;
};

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
        queryKey: ['stock', 'mutation', warehouseId],
        queryFn: async () => getActiveStockMutationRequest(warehouseId),
        staleTime: 60 * 1000
    })

    return { data, isLoading, error }
}

export const useRestock = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (values: { productId: number; warehouseToId: number; warehouseFromId: number; quantity: number; maxQuantity: number; }) => {
            const configs = await attachToken({})
            await apiClient.post(
                config.BASE_URL + config.API_VER + config.endpoints.stock + '/restock',
                values,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['stock', 'mutation'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}

export const useRequestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (values: { productId: number; warehouseToId: number; warehouseFromId: number; quantity: number; maxQuantity: number; }) => {
            const configs = await attachToken({})
            await apiClient.post(
                config.BASE_URL + config.API_VER + config.endpoints.stock + '/mutation',
                values,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['stock', 'mutation'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}

export const useAcceptMutationRequest = () => {
    const queryClient = useQueryClient()

    return useMutation(
        async (id: number) => {
            const configs = await attachToken({})
            await apiClient.put(
                config.BASE_URL + config.API_VER + config.endpoints.stockMutation + `/${id}` + '/accept',
                {},
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['stock', 'mutation'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}

export const useRejectMutationRequest = () => {
    const queryClient = useQueryClient()

    return useMutation(
        async (id: number) => {
            const configs = await attachToken({})
            await apiClient.put(
                config.BASE_URL + config.API_VER + config.endpoints.stockMutation + `/${id}` + '/reject',
                {},
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['stock', 'mutation'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}