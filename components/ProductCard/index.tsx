import {FC} from "react";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Buttons from "@/components/Buttons";
import Image from "next/image";
import {ProductSummary} from "@/types/product";

interface ProductCardProps {
    product: ProductSummary;
}


const ProductCard: FC<ProductCardProps> = ({product}) => {

    const handleBuy = () => {
        console.log("Buy")
    }

    return <Card className={"w-[175px] lg:w-[200px] border-0 flex flex-col justify-between"}>
        <CardContent>
            <Image src={"/product.png"} alt={"Product image"} width={200} height={200}/>
            <div className={'flex flex-col gap-2.5 mt-6'}>
                <p>{product.name}</p>
                <p>Rp{product.price.toLocaleString()}</p>
            </div>
        </CardContent>
        <CardFooter className={"self-center"}>
            <Buttons className={"bg-red-500 px-14 py-2 rounded-2xl text-white"}>
                Buy
            </Buttons>
        </CardFooter>
    </Card>
}

export default ProductCard;