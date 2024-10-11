'use client'
import {FC} from "react";
import CTA from "@/app/(root)/product/[id]/components/CTA";
import ProductImage from "@/app/(root)/product/[id]/components/ProductImage";
import ProductDetails from "@/app/(root)/product/[id]/components/ProductDetails";
import useProductDetails from "@/hooks/useProductDetails";
import {AlertCircle, Loader} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

interface Props {
    params: {
        id: number;
    }
}

const ProductDetailsPage: FC<Props> = ({ params }) => {
    const { data, isLoading, error } = useProductDetails(params.id)

    if (isLoading) {
        return (
            <main className={"flex flex-col items-center xl:grid xl:grid-cols-4 gap-4 xl:gap-24 m-4 lg:mx-16 lg:my-12"}>
                <Skeleton className={"col-span-1 w-[300px] h-[300px]"} />
                <Skeleton className={"col-span-2 w-[300px] xl:w-[750px] h-[300px]"} />
                <Skeleton className={"col-span-1 w-[300px] h-[150px]"} />
            </main>
        )
    }

    if ( error || !data || !data.imageUrls) {
        return (
            <main className={"flex flex-col items-center justify-center p-4"}>
                <div className={"max-w-md w-full space-y-8"}>
                    <div className={"text-center"}>
                        <AlertCircle className={"mx-auto h-12 w-12 text-destructive"}/>
                        <h2 className={"mt-6 text-3xl font-extrabold"}>Oops! Something went wrong</h2>
                        <p className={"mt-2 text-sm"}>
                            We couldn't fetch the product details. This might be due to a network issue or the product
                            may not exist.
                        </p>
                    </div>
                    <p className={"mt-4 text-center text-sm"}>
                        If the problem persists, please contact our customer support.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className={"flex flex-col items-center xl:grid xl:grid-cols-4 gap-4 xl:gap-24 m-4 lg:mx-16 lg:my-12"}>
            <ProductImage imageUrls={data.imageUrls}/>
            <ProductDetails name={data.name} price={data?.price} description={data?.description}/>
            <CTA/>
        </main>
    )
}

export default ProductDetailsPage