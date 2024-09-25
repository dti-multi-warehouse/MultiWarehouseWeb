'use client'
import {FC} from "react";
import CTA from "@/app/(root)/product/[id]/components/CTA";
import ProductImage from "@/app/(root)/product/[id]/components/ProductImage";
import ProductDetails from "@/app/(root)/product/[id]/components/ProductDetails";
import useProductDetails from "@/hooks/useProductDetails";
import {Loader} from "lucide-react";

interface Props {
    params: {
        id: number;
    }
}

const ProductDetailsPage: FC<Props> = ({ params }) => {
    const { data, isLoading, error } = useProductDetails(params.id)

    if (isLoading || !data || !data.imageUrls) {
        return <Loader />
    }

    return <div className={"flex flex-col items-center xl:grid xl:grid-cols-4 gap-4 xl:gap-24 m-4 lg:mx-16 lg:my-12"}>
        <ProductImage imageUrls={data.imageUrls} />
        <ProductDetails name={data.name} price={data?.price} description={data?.description} />
        <CTA />
    </div>
}

export default ProductDetailsPage