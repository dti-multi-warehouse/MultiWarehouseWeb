import {FC, useEffect, useRef} from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductImageProps {
    imageUrls: string[]
}

const ProductImage: FC<ProductImageProps> = ({imageUrls}) => {
    return (
        <Carousel className={"col-span-1"}>
            <CarouselContent>
                {
                    imageUrls.map( (image, index) => (
                        <CarouselItem
                            key={index}
                        >
                            <Image
                                src={image}
                                alt={"Product image"}
                                width={300}
                                height={300}
                                className={"rounded-md"}
                                priority={true}
                            />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default ProductImage