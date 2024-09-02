import {FC} from "react";
import ProductForm from "@/app/dashboard/products/(crud)/ProductForm";


const AddProductPage: FC = () => {
    return <main className={"p-8"}>
        <h1 className={"text-3xl font-semibold"}>Add product</h1>
        <ProductForm />
    </main>
}

export default AddProductPage;