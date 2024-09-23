import {StockMutation} from "@/types/datatypes";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (): Promise<StockMutation[]> => {
    try {
        const res: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stockMutation,
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

export const getActiveStockMutationRequest = async (): Promise<StockMutation[]> => {
    return await getData();
}