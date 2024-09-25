import {FC} from "react";
import {Product} from "@/types/product";


const ProductDetails: FC<Product> = ({name, price, description}) => {
    return <div className={"col-span-2 order-3 xl:order-2"}>
        <div className={"flex flex-col gap-5"}>
            <h2 className={"font-bold text-3xl"}>{name}</h2>
            <p className={"font-bold text-xl text-red-500"}>Rp.{price?.toLocaleString()}</p>
        </div>
        <div className={"border-t-2 border-dotted my-4"}/>
        <div className={"flex flex-col gap-5"}>
            <p className={"font-bold"}>Description</p>
            <p>{description}</p>
        </div>
    </div>
}

export default ProductDetails;