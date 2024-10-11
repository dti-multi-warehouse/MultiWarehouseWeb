'use client'
import {FC, useState} from "react";
import ProductTable from "@/app/dashboard/products/components/ProductTable";
import Header from "@/app/dashboard/products/components/Header";

const ProductsDashboardPage: FC = () => {
    const [query, setQuery] = useState("")
    return (
        <main className={"gap-2 pb-8"}>
            <Header query={query} setQuery={setQuery}/>
            <ProductTable query={query}/>
        </main>
    )
}

export default ProductsDashboardPage;