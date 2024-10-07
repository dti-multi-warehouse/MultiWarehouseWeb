import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {StockDto} from "@/types/Stock";


const getData = async (warehouseId: number, date: Date, query: string, page: number, perPage: number): Promise<StockDto> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stock,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    warehouseId: warehouseId,
                    date: date.toISOString().split('T')[0],
                    query,
                    page,
                    perPage
                }
            }
        )
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getAllStocks = async (warehouseId: number, date: Date, query: string, page: number, perPage: number): Promise<StockDto> => {
    return await getData(warehouseId, date, query, page, perPage);
}