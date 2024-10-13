import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProducts} from "@/api/product/getProducts";
import {ReadonlyURLSearchParams} from "next/navigation";
import {getProductDetails} from "@/api/product/getProductDetails";
import {getFeaturedProducts} from "@/api/product/getFeaturedProducts";
import {getDashboardProducts} from "@/api/product/getDashboardProducts";
import {getSession} from "next-auth/react";
import apiClient from "@/lib/apiClient";
import {config} from "@/constants/url";
import {AxiosError} from "axios";

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

export const useProducts = ( params: ReadonlyURLSearchParams) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', params.toString()],
        queryFn: async () => getProducts(params),
    })

    return { data, isLoading, error }
}

export const useProductDetails = (id: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => getProductDetails(id),
    })

    return { data, isLoading, error }
}

export const useFeaturedProducts = () => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', 'featured'],
        queryFn: async () => getFeaturedProducts(),
    })

    return { data, isLoading, error }
}

export const useDashboardProducts = (query: string, page: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', 'dashboard', query, page],
        queryFn: async () => getDashboardProducts(query, page),
    })

    return { data, isLoading, error }
}

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (formData: FormData) => {
            const contentTypeConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const configs = await attachToken(contentTypeConfig)
            await apiClient.post(
                config.BASE_URL + config.API_VER + config.endpoints.product,
                formData,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['product'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (values: {formData: FormData, id: number}) => {
            const contentTypeConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const configs = await attachToken(contentTypeConfig)
            await apiClient.put(
                config.BASE_URL + config.API_VER + config.endpoints.product + `/${values.id}`,
                values.formData,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['product'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (id: number) => {
            const configs = await attachToken({})
            await apiClient.delete(
                config.BASE_URL + config.API_VER + config.endpoints.product + `/${id}`,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['product'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}