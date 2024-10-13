import {Stock} from "@/types/datatypes";

interface StockDto {
    page: number;
    totalPage: number;
    stocks: Stock[];
}

interface WarehouseAndStockAvailabilityDto {
    warehouseId: number;
    warehouseName: string;
    stock: number;
}