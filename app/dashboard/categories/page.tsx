import {FC} from "react";
import CategoryTable from "@/app/dashboard/categories/components/CategoryTable";
import CategoryDrawerDialog from "@/app/dashboard/categories/components/CategoryDrawerDialog";
import {Button} from "@/components/ui/button";
import * as React from "react";


const CategoriesPage: FC = () => {
    return (
        <main className={"p-8"}>
            <div className={"flex justify-between mb-4"}>
                <h1 className={"text-3xl font-semibold"}>Categories</h1>
                <CategoryDrawerDialog mode={'create'}>
                    <Button variant="outline">New Category</Button>
                </CategoryDrawerDialog>
            </div>
            <CategoryTable />
        </main>
    )
}

export default CategoriesPage