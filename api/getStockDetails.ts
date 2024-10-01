import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {StockDetailsResponse} from "@/types/datatypes";


const getData = async (warehouseId: number, productId: number): Promise<StockDetailsResponse> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stock + '/details',
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    warehouseId,
                    productId
                }
            }
        )
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getStockDetails = async (warehouseId: number, productId: number): Promise<StockDetailsResponse> => {
    return await getData(warehouseId, productId);
}