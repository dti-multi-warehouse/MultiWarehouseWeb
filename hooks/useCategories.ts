import {useMutation, useQuery, useQueryClient} from "react-query";
import {getCategories} from "@/api/category/getCategories";
import {getSession} from "next-auth/react";
import apiClient from "@/lib/apiClient";
import {config} from "@/constants/url";
import {AxiosError} from "axios";
import {getCategory} from "@/api/category/getCategory";

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

export const useCategories = () => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => getCategories(),
    })

    return { data, isLoading, error }
}

export const useCategory = (id: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['categories', id],
        queryFn: async () => getCategory(id),
    })

    return { data, isLoading, error }
}

export const useAddCategory = () => {
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
                config.BASE_URL + config.API_VER + config.endpoints.category,
                formData,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['categories'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}

export const useUpdateCategory = () => {
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
                config.BASE_URL + config.API_VER + config.endpoints.category + `/${values.id}`,
                values.formData,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['categories'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (id: number) => {
            const configs = await attachToken({})
            await apiClient.delete(
                config.BASE_URL + config.API_VER + config.endpoints.category + `/${id}`,
                configs)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['categories'])
            },
            onError: (error: AxiosError) => {
                throw error;
            }
        }
    );
}