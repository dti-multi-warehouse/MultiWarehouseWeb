'use client'

import {FC} from "react";
import useDashboardStore from "@/stores/useDashboardStore";
import CategoryDrawerDialog from "@/app/dashboard/categories/components/CategoryDrawerDialog";
import {Button} from "@/components/ui/button";
import * as React from "react";


const CategoryHeader: FC = () => {
    const isAdmin = useDashboardStore(state => state.isAdmin)
    return (
        <div className={"flex justify-between mb-4"}>
            <h1 className={"text-3xl font-semibold"}>Categories</h1>
            {isAdmin && (
                <CategoryDrawerDialog mode={'create'}>
                    <Button variant="outline">New Category</Button>
                </CategoryDrawerDialog>
            )}
        </div>
    )
}

export default CategoryHeader