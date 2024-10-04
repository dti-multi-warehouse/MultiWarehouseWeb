import {WarehouseList} from "@/types/warehouse";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (): Promise<WarehouseList[]> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.warehouse + "/list",
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )
        return response.data.data;
    } catch (error) {
        throw error
    }
}

export const getWarehouseList = async (): Promise<WarehouseList[]> => {
    return await getData();
}