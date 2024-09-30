import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {StockDetails} from "@/types/datatypes";


const getData = async (warehouseId: number, productId: number): Promise<StockDetails[]> => {
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

export const getStockDetails = async (warehouseId: number, productId: number): Promise<StockDetails[]> => {
    return await getData(warehouseId, productId);
}