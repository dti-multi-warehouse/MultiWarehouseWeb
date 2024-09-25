import {FC} from "react";
import { Input } from "@/components/ui/input"
import {useFormikContext} from "formik";

interface QuantityFormValue {
    maxQuantity: number
    quantity: number
}

const QuantityInput: FC = () => {
    const { values, setFieldValue } = useFormikContext<QuantityFormValue>()
    return (
        <Input
            type={"number"}
            min={1}
            max={values.maxQuantity}
            className={"focus-visible:border-none"}
            placeholder={"Quantity"}
            // disabled={true}
            onChange={ e => setFieldValue("quantity", e.target.value)}
        />
    )
}

export default QuantityInput