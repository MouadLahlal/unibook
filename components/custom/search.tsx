import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { Spinner } from "@/components/ui/spinner";

export function Search() {
	const [loading, setLoading] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>("");
	const setBooks = useStore((state) => state.setBooks);
    const search = async () => {
		setLoading(true);
        const res = await fetch(`/api/books/search?query=${searchString}`);
        const data = await res.json();
		setBooks(data.books);
		setLoading(false);
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
            	{
					loading
						? <Spinner className="text-black" />
						: <Image src={"/icons/search.svg"} alt="search icon" height={32} width={32} /> 
				}
                
            </Button>
        </div>
    );
}
