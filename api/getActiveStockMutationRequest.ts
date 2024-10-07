import {StockMutation} from "@/types/datatypes";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (warehouseId: number): Promise<StockMutation[]> => {
    console.log(warehouseId)
    try {
        const res: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stockMutation + `/${warehouseId}`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )
        return res.data.data;
    } catch (error) {
        throw error;
    }
}

export const getActiveStockMutationRequest = async (warehouseId: number): Promise<StockMutation[]> => {
    return await getData(warehouseId);
}