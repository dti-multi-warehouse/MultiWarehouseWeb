export interface Sales {
    saleDate: Date;
    revenue: number;
}

export interface TotalSalesResponse {
    totalRevenue: number;
    sales: Sales[]
}

export interface ProductCategorySalesResponse {
    name: string;
    revenue: number;
    fill: string
}