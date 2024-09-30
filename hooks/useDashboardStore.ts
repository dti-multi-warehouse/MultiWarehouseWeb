import { create } from 'zustand'
import {DashboardStore, ProductStockDetails} from "@/types/datatypes";

const useDashboardStore = create<DashboardStore>((set) => ({
    warehouseId: 3,
    product: {
        id: 0,
        name: '',
        stock: 0
    },
    setProduct: (product: ProductStockDetails) => set((state) => ({ product })),
}))

export default useDashboardStore