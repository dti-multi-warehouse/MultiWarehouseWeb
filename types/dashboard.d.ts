export interface Sales {
    saleDate: Date;
    revenue: number;
}

export interface TotalSalesResponse {
    totalRevenue: number;
    sales: Sales[]
}

export interface CategorySalesResponse {
    name: string;
    revenue: number;
    fill: string
}

export interface ProductSalesResponse {
    name: string;
    revenue: number;
}

export interface SalesReport {
    totalSales: TotalSalesResponse;
    categorySales: CategorySalesResponse[];
    productSales: ProductSalesResponse[];
}