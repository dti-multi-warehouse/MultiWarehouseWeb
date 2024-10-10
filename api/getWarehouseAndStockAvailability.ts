import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {WarehouseAndStockAvailabilityDto} from "@/types/Stock";


const getData = async (warehouseId: number, productId: number): Promise<WarehouseAndStockAvailabilityDto[]> => {
    console.log(warehouseId)
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stock + `/warehouse`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    warehouseId: warehouseId,
                    productId: productId
                }
            }
        )
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getWarehouseAndStockAvailability = async (warehouseId: number, productId: number) => {
    return await getData(warehouseId, productId);
}