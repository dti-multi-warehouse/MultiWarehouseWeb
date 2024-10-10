export const config = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL, //api
    API_VER: '/api/v1/',
    endpoints: {
        product: 'product',
        category: 'category',
        stock: 'stock',
        stockMutation: 'stock/mutation',
        warehouse: 'warehouse',
        dashboard: 'dashboard',
        order: 'order'
    },
}