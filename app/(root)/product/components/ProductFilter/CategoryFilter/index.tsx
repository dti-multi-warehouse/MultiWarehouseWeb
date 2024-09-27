import {FC} from "react";
import useCategories from "@/hooks/useCategories";
import CategoryCheckbox from "@/app/(root)/product/components/ProductFilter/CategoryFilter/CategoryCheckbox";
import {Skeleton} from "@/components/ui/skeleton";

interface ProductFilterInputProps {
    onChange: (value: any[]) => void;
}


const CategoryFilters: FC<ProductFilterInputProps> = ({onChange}) => {
    const {data, isLoading, error} = useCategories()
    const skeletonArray = Array.from({ length: 2 }, (_, i) => i)
    return (
        <div className={"space-y-2"}>
            <p className={"text-lg font-semibold"}>Categories</p>
            {isLoading || !data ?
                skeletonArray.map( i => <Skeleton key={i} className={"h-4 w-64"}/> )
                : data.map( category => (
                    <CategoryCheckbox key={category.id} {...category} updateValue={onChange} />
                ))
            }
            {}
        </div>
    )
}

export default CategoryFilters;