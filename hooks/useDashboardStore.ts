import { create } from 'zustand'
import {DashboardStore, ProductStockDetails} from "@/types/datatypes";
import {WarehouseList} from "@/types/warehouse";

const useDashboardStore = create<DashboardStore>((set) => ({
    product: {
        id: 0,
        name: '',
        stock: 0
    },
    warehouse: {
        id: 0,
        name: 'Gudang'
    },
    date: new Date(),
    isStockDrawerOpen: false,
    setProduct: (product: ProductStockDetails) => set((state) => ({ product })),
    setWarehouse: (warehouse: WarehouseList) => set((state) => ({ warehouse: warehouse })),
    setDate: (date: Date) => set((state) => ({ date })),
    setIsStockDrawerOpen: (isStockDrawerOpen: boolean) => {
        set((state) => ({isStockDrawerOpen}))
    }
}))

export default useDashboardStore