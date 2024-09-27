import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


const PriceInput = () => {
    return (
        <div>
            <p className={"text-lg font-semibold"}>Price Range</p>
            <div className={"flex gap-4"}>
                <div className={"flex-1"}>
                    <Label htmlFor={"minPrice"} className={"text-sm font-medium"}>
                        Minimum Price
                    </Label>
                    <Input
                        id={"minPrice"}
                        type={"number"}
                        placeholder={"Minimum Price"}
                        value={0}
                        onChange={(e) => {
                        }}
                        min={0}
                        step={500}
                        className={"border-2 focus-visible:border-none"}
                    />
                </div>
                <div className={"flex-1"}>
                    <Label htmlFor={"maxPrice"} className={"text-sm font-medium"}>
                        Maximum Price
                    </Label>
                    <Input
                        id={"maxPrice"}
                        type={"number"}
                        placeholder={"Maximum Price"}
                        value={0}
                        onChange={(e) => {
                        }}
                        min={0}
                        step={500}
                        className={"border-2 focus-visible:border-none"}
                    />
                </div>
            </div>
        </div>
    )
}

export default PriceInput;