import {Product} from "@/types/product";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (id: number): Promise<Product> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.product + `/${id}`
        const response = await apiClient.get(url)
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getProductDetails = async (id: number): Promise<Product> => {
    return await getData(id);
}