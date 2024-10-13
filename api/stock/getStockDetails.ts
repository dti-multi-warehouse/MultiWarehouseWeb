import {config} from "@/constants/url";
import {StockDetailsResponse} from "@/types/datatypes";
import apiClient from "@/lib/apiClient";


const getData = async (warehouseId: number, productId: number, date: Date): Promise<StockDetailsResponse> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.stock + '/details'
        const response = await apiClient.get(url, {
            params: {
                warehouseId,
                productId,
                date: date.toISOString().split('T')[0],
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getStockDetails = async (warehouseId: number, productId: number, date: Date): Promise<StockDetailsResponse> => {
    return await getData(warehouseId, productId, date);
}