import {FC} from "react";
import useCategories from "@/hooks/useCategories";
import CategoryCheckbox from "@/app/(root)/product/components/ProductFilter/CategoryFilter/CategoryCheckbox";

const CategoryFilters: FC = () => {
    const {data, isLoading, error} = useCategories()

    return (
        <div className={"space-y-2"}>
            <p className={"text-lg font-semibold"}>Categories</p>
            {data?.map( category => (
                <CategoryCheckbox key={category.id} {...category} />
            ))}
        </div>
    )
}

export default CategoryFilters;