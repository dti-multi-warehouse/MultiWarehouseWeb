import {config} from "@/constants/url";
import {StockDto} from "@/types/Stock";
import apiClient from "@/lib/apiClient";


const getData = async (warehouseId: number, date: Date, query: string, page: number, perPage: number): Promise<StockDto> => {
    try {
        const url  = config.BASE_URL + config.API_VER + config.endpoints.stock
        const response = await apiClient.get(url, {
                    params: {
                        warehouseId: warehouseId,
                        date: date.toISOString().split('T')[0],
                        query,
                        page,
                        perPage
                    }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getAllStocks = async (warehouseId: number, date: Date, query: string, page: number, perPage: number): Promise<StockDto> => {
    return await getData(warehouseId, date, query, page, perPage);
}