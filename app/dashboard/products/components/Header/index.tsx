import { FC } from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import * as React from "react";

interface HeaderProps {
    query: string,
    setQuery: (query: string) => void
}

const Header: FC<HeaderProps> = ({query, setQuery}) => {
    return (
        <div className={"flex flex-col lg:flex-row gap-4 justify-between px-8 pt-4 pb-2 border-b"}>
            <h1 className={"text-3xl font-semibold"}>Products</h1>
            <div className={"flex flex-col justify-end gap-2"}>
                <Button onClick={() => console.log(query)}>Add product</Button>
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={"Search for products..."}
                    className={"focus-visible:border-white"}
                />
            </div>
        </div>
    )
}

export default Header