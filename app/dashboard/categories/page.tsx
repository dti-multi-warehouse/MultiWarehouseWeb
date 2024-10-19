import {FC} from "react";
import CategoryTable from "@/app/dashboard/categories/components/CategoryTable";
import CategoryHeader from "@/app/dashboard/categories/components/Header/CategoryHeader";


const CategoriesPage: FC = () => {

    return (
        <main className={"p-8"}>
            <CategoryHeader />
            <CategoryTable />
        </main>
    )
}

export default CategoriesPage