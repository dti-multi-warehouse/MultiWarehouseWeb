'use client'
import {FC} from "react";
import CTA from "@/app/(root)/product/[id]/components/CTA";
import ProductImage from "@/app/(root)/product/[id]/components/ProductImage";
import ProductDetails from "@/app/(root)/product/[id]/components/ProductDetails";
import useProductDetails from "@/hooks/useProductDetails";

interface Props {
    params: {
        id: number;
    }
}

const ProductPage: FC<Props> = ({ params }) => {
    const { data, isLoading, error } = useProductDetails(params.id)
    console.log(data)

    return <div className={"grid grid-cols-4 gap-5 mx-16 my-12"}>
        <ProductImage />
        <ProductDetails name={data?.name} price={data?.price} description={data?.description} />
        <CTA />
    </div>
}

export default ProductPage