import {ProductAndStockAvailablity} from "@/types/datatypes";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (warehouseId: number): Promise<ProductAndStockAvailablity[]> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.stock + `/${warehouseId}`
        const response = await apiClient.get(url)
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getProductAndStockAvailability = async (warehouseId: number) => {
    return await getData(warehouseId);
}