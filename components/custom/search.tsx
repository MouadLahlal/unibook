import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";

export function Search() {

    const [searchString, setSearchString] = useState<string>("");

    const search = async () => {
        const res = await fetch(`/api/books/search?query=${searchString}`);
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="flex flex-row gap-2">
            <Input
                type="search"
                placeholder="Search... (non funsiona casso...)"
                className="md:w-[100px] lg:w-[300px]"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
            />
            <Button
                type="submit"
                onClick={() => search()}
                className="p-2"
            >
                <Image src={"/icons/search.svg"} alt="search icon" height={32} width={32} />
            </Button>
        </div>
    );
}
