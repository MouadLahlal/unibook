"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/custom/main-nav";
import { useStore } from "@/lib/store";
import { Book } from "@/types/store";

async function getBooks(setBooks: (books: Book[]) => void) {
    const res = await fetch("/api/books", { cache: 'no-store' });
    const temp = await res.json();
    setBooks(temp.books);
}

export default function YourBooksPage() {
	const books = useStore((state) => state.books);
	const setBooks = useStore((state) => state.setBooks);

    useEffect(() => {
        getBooks(setBooks);
    }, [setBooks]);

    return (
        <>
            <div className="flex flex-col">
                <MainNav className="mx-6" />
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Your Books
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5">
                        {books &&
                            books.map(
                                (book: {
                                    name: string;
                                    thumbnail: string;
                                    url: string;
                                }, index: number) => {
                                    return (
                                        <Card className="w-fit" key={index}>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-fit">
                                                <CardTitle className="text-sm font-medium w-[250px]">
                                                    {book.name}
                                                </CardTitle>
                                            </CardHeader>
                                            
                                            <CardContent>
                                                <div
                                                    className="relative rounded-xl overflow-hidden w-[250px] mt-[20px]"
                                                    id="div_pdfs"
                                                >
                                                    <Link
                                                        href={`/pdf-viewer?book=${book.name}&url=${encodeURIComponent(book.url)}`}
                                                        className="z-20"
                                                    >
                                                        <div className="flex justify-center">
                                                            <Image
                                                                src={book.thumbnail}
                                                                width={250}
                                                                height={300}
                                                                alt="Book thumbnail"
                                                                className=""
                                                            />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                }
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}
