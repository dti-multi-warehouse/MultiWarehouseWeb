import {StockMutation} from "@/types/datatypes";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (warehouseId: number): Promise<StockMutation[]> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.stockMutation + `/${warehouseId}`
        const res = await apiClient.get(url);
        return res.data.data;
    } catch (error) {
        throw error;
    }
}

export const getActiveStockMutationRequest = async (warehouseId: number): Promise<StockMutation[]> => {
    return await getData(warehouseId);
}