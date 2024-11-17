"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MainNav } from "@/components/custom/main-nav";

async function getBooks(setBooks: any) {
  const res = await fetch("/api/books");
  let temp = await res.json();
  setBooks(temp.books);
}

export default function YourBooksPage() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks(setBooks);
  }, []);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <MainNav className="mx-6" />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Your Books</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {
              books ?
                books.map((book: {name: string, thumbnail: string, url: string}) => {
                  return (
                    <Card className="w-fit">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-fit">
                        <CardTitle className="text-sm font-medium w-[250px]">
                          {book.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          style={{ borderRadius: '13px', overflow: 'hidden', width: '250px', marginTop: '20px' }}
                          id="div_pdfs"
                        >
                          <Link href={`/pdf-viewer?book=${book.name}&url=${encodeURIComponent(book.url)}`} className="z-20">
                            <div className="flex justify-center">
                              <Image
                                src={book.thumbnail}
                                width={250}
                                height={300}
                                alt="Book thumbnail"
                              />
                            </div>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
                : null
            }
          </div>
        </div>
      </div>
    </>
  )
}
