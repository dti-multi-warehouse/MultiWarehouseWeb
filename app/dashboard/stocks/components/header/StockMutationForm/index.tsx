import * as Yup from "yup";
import {Dispatch, FC, SetStateAction, useState} from "react";
import {Button} from "@/components/ui/button";
import {Form, Formik} from "formik";
import ProductInput from "@/app/dashboard/stocks/components/header/StockMutationForm/ProductInput";
import WarehouseInput from "@/app/dashboard/stocks/components/header/StockMutationForm/WarehouseInput";
import QuantityInput from "@/app/dashboard/stocks/components/header/StockMutationForm/QuantityInput";
import axios from "axios";
import {config} from "@/constants/url";


const StockMutationSchema = Yup.object().shape({
    productId: Yup.number().required().min(1),
    warehouseToId: Yup.number().required(),
    warehouseFromId: Yup.number(),
    quantity: Yup.number().required().min(1),
    maxQuantity: Yup.number(),
})

interface StockMutationFormProps {
    setOpen: (open: boolean) => Dispatch<SetStateAction<boolean>>;
}

const StockMutationForm: FC<StockMutationFormProps> = ({setOpen}) => {
    const [type, setType] = useState<'restock' | 'mutation'>('restock')

    const handleSubmit = (values: { productId: number; warehouseToId: number; warehouseFromId: number; quantity: number; maxQuantity: number; }) => {
        const url = config.BASE_URL + config.API_VER + config.endpoints.stock + `/${type}`
        axios.post(url, values)
            .then(() => {
                setOpen(false)
            })
    }

    return (
        <div>
            <div className={"flex justify-center gap-2"}>
                <Button
                    className={"w-24"}
                    onClick={() => setType("restock")}
                >
                    Restock
                </Button>
                <Button
                    className={"w-24"}
                    onClick={() => setType("mutation")}
                >
                    Mutate
                </Button>
            </div>
            <Formik
                initialValues={{
                    productId: 0,
                    warehouseToId: 2,
                    warehouseFromId: 0,
                    quantity: 1,
                    maxQuantity: 999
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={StockMutationSchema}
            >
                <Form className={"flex flex-col gap-2 w-full"}>
                    <ProductInput />
                    {type === 'mutation' && <WarehouseInput />}
                    <QuantityInput />
                    <Button type={"submit"}>Submit</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default StockMutationForm