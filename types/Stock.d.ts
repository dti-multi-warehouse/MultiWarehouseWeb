interface StockDto {
    page: number;
    totalPage: number;
    stocks: Stock[];
}

export interface Stock {
    id: number;
    name: string;
    stock: number;
    thumbnail: string;
    incoming: number;
    outgoing: number;
    deletedAt: Date;
}

interface WarehouseAndStockAvailabilityDto {
    warehouseId: number;
    warehouseName: string;
    stock: number;
}