import {FC} from "react";
import Image from "next/image";

const ProductImage: FC = () => {
    return <div className={"col-span-1"}>
        <Image src={"/product.png"} alt={"Product image"} width={400} height={400} />
    </div>
}

export default ProductImage