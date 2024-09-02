import {FC} from "react";
import ProductForm from "@/app/dashboard/products/(crud)/ProductForm";

const EditProductPage: FC = () => {
    return <main className={"p-8"}>
        <h1 className={"text-3xl font-semibold"}>Edit product</h1>
        <ProductForm />
    </main>
}

export default EditProductPage;