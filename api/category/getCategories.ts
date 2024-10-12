import {config} from "@/constants/url";
import {Category} from "@/types/category";
import apiClient from "@/lib/apiClient";


const getData = async (): Promise<Category[]> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.category
        const response = await apiClient.get(url);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getCategories = async (): Promise<Category[]> => {
    return await getData();
}