import {FC} from "react";
import Image from "next/image";

interface ProductImageProps {
    imageUrls: string[]
}

const ProductImage: FC<ProductImageProps> = ({imageUrls}) => {
    return <div className={"col-span-1"}>
        <Image src={imageUrls[0]} alt={"Product image"} width={400} height={400} />
    </div>
}

export default ProductImage