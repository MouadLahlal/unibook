"use client"
import { useState, useEffect } from "react"
import { Metadata } from "next"
import Image from "next/image"
import { Document, Page, Thumbnail } from 'react-pdf'
import Link from "next/link"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MainNav } from "@/components/custom/main-nav"
import { UserNav } from "@/components/custom/user-nav"
import { Search } from "@/components/custom/search"
import { IconPlusSquare } from "@/icons/icon-plus-square"

import { pdfjs } from 'react-pdf';

/*
import { CalendarDateRangePicker } from "@/app/(app)/examples/dashboard/components/date-range-picker"
import { Overview } from "@/app/(app)/examples/dashboard/components/overview"
import { RecentSales } from "@/app/(app)/examples/dashboard/components/recent-sales"
import TeamSwitcher from "@/app/(app)/examples/dashboard/components/team-switcher"
*/

async function getBooks(setBooks: any) {
  const res = await fetch("/api/books");
  let temp = await res.json()
  setBooks(temp.books);
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

export default function YourBooksPage() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);

  const router = useRouter();

  function onPageLoadSuccess() {
    setLoading(false);
    setPageWidth(document.getElementById("div_pdfs")?.getBoundingClientRect().width || 100);
  }

  useEffect(() => {
    getBooks(setBooks);
  }, []);

  console.log(books);


  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h2 className="text-2xl ml-4 font-bold tracking-tight font-mono">unibook</h2>
            <MainNav className="mx-6" />
            {/*            <TeamSwitcher />*/}
            <div className="ml-auto flex items-center space-x-4">
              <Button>
                <IconPlusSquare />
              </Button>
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Your Books</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {
              books ?
                books.map((book) => {
                  return (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {book}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          style={{ borderRadius: '13px', overflow: 'hidden', width: '250px', marginTop: '20px' }}
                          id="div_pdfs"
                        >
                          <Link href={`/pdf-viewer?book=${book}`} className="z-20">
                            <div className="flex justify-center">
                              <Document
                                file={`./${book}`}
                                options={options}
                                className="max-w-full max-h-full z-10"
                              >
                                <Thumbnail
                                  width={pageWidth*2}
                                  key={1}
                                  pageNumber={1}
                                  onLoadSuccess={onPageLoadSuccess}
                                  onRenderError={() => setLoading(false)}
								  scale={0.5}
								  onItemClick={() => router.push(`/pdf-viewer?book=${book}`)}
                                />
                              </Document>
                            </div>
                            {/* <Image
                              src="https://thebanco.it/public/uploads/books/9788808663856.jpg"
                              objectFit="cover"
                              width="384"
                              height="519"
                              alt="Dashboard"
                              className="block"
                            /> */}
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
