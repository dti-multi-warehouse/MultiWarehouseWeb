import {DashboardProductDto} from "@/types/product";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (query: String, page: number): Promise<DashboardProductDto> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.product + `/dashboard`
        const response = await apiClient.get(url, {
            params: {
                query,
                page
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getDashboardProducts = async (query: String, page: number): Promise<DashboardProductDto> => {
    return await getData(query, page);
}