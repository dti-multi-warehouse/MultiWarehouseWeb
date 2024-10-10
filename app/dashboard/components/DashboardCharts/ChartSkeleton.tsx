import {FC} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"



const ChartSkeleton: FC<{className: string}> = ({className}) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-48 h-6" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="w-32 h-4" />
                </CardDescription>
            </CardHeader>
            <CardContent className={"h-96"}>
                <Skeleton className={"w-full h-full"} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <Skeleton className="w-64 h-4" />
            </CardFooter>
        </Card>
    )
}

export default ChartSkeleton