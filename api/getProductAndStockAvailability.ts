import {ProductAndStockAvailablity} from "@/types/datatypes";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (warehouseId: number): Promise<ProductAndStockAvailablity[]> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stock + `/${warehouseId}`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getProductAndStockAvailability = async (warehouseId: number) => {
    return await getData(warehouseId);
}