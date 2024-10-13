import {config} from "@/constants/url";
import {WarehouseAndStockAvailabilityDto} from "@/types/Stock";
import apiClient from "@/lib/apiClient";


const getData = async (warehouseId: number, productId: number): Promise<WarehouseAndStockAvailabilityDto[]> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.stock + `/warehouse`
        const response = await apiClient.get(url, {
            params: {
                warehouseId: warehouseId,
                productId: productId
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getWarehouseAndStockAvailability = async (warehouseId: number, productId: number) => {
    return await getData(warehouseId, productId);
}