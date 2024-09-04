import {FC, ReactNode} from "react";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Image from "next/image";

interface DashboardCardProps {
    image: string,
    imageAlt: string,
    children: ReactNode,
}

const DashboardCard: FC<DashboardCardProps> = ({image, imageAlt, children}) => {
    return (
        <Card className={"w-96 h-[420px] rounded-xl"}>
            <CardContent className={"p-0"}>
                <Image src={image} alt={imageAlt} width={384} height={400} className={"rounded-t-xl"} />
            </CardContent>
            <CardFooter>
                {children}
            </CardFooter>
        </Card>

    )
}

export default DashboardCard