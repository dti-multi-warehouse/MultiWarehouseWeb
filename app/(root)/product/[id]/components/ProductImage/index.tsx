import {FC, useEffect, useRef} from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import useMediaQuery from "@/hooks/useMediaQuery";


interface ProductImageProps {
    imageUrls: string[]
}

const ProductImage: FC<ProductImageProps> = ({imageUrls}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <Carousel className={"col-span-1 w-48 h-48 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px]"}>
            <CarouselContent>
                {
                    imageUrls.map( (image, index) => (
                        <CarouselItem
                            key={index}
                        >
                            <Image
                                src={image}
                                alt={"Product image"}
                                width={400}
                                height={400}
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