"use client"
import { pdfjs } from 'react-pdf';
import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Button } from '@/components/ui/button';
import { MainNav } from "@/components/custom/main-nav";
import { UserNav } from "@/components/custom/user-nav";
import { Search } from "@/components/custom/search";
import { IconPlusSquare } from "@/icons/icon-plus-square";
import { useSearchParams } from 'next/navigation';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(500);
  const [file, setFile] = useState("./demo.pdf");
  const searchParams = useSearchParams();

  useEffect(() => {
	  setFile(searchParams.get('book') || "");
  }, []);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess() {
    setLoading(false);
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-2xl ml-4 font-bold tracking-tight font-mono">unibook</h2>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Button>
              <IconPlusSquare />
            </Button>
            <Search />
            <UserNav />
          </div>
        </div>
      </div>

      <div className="flex justify-center mx-auto z-20 my-2 w-[90%] h-[85vh] overflow-auto bg-slate-800 rounded-lg">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className=""
        >
          <Page
            className="max-w-[calc(100%-3em)]"
            key={pageNumber}
            pageNumber={pageNumber}
            renderAnnotationLayer={true}
            renderTextLayer={true}
            onLoadSuccess={onPageLoadSuccess}
            onRenderError={() => setLoading(false)}
            width={pageWidth}
          />
        </Document>
      </div>
      <div className="fixed bottom-0 inset-x-0 max-w-max mx-auto z-30 rounded-t-lg bg-slate-800 px-6 py-4">
        <Button
          onClick={goToPreviousPage}
          disabled={pageNumber <= 1}
          className="px-2 mr-6"
        >
          <span className="">&lt;</span>
        </Button>
        <Button
          onClick={() => {
            if (pageWidth > 200) {
              setPageWidth(pageWidth - 100);
            }
          }}
          disabled={pageWidth < 200}
          className="px-2 mr-4"
        >
          <span className="">zoom -</span>
        </Button>
		<a href={file} download={file}>
			<Button>
				Download
			</Button>
		</a>
        <Button
          onClick={() => {
            if (pageWidth + 200 < window.innerWidth) {
              setPageWidth(pageWidth + 100);
            }
          }}
          disabled={pageWidth + 200 > window.innerWidth}
          className="px-2 ml-4"
        >
          <span className="">zoom +</span>
        </Button>
        <Button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages!}
          className="px-2 ml-6"
        >
          <span className="">&gt;</span>
        </Button>
      </div>
    </>
  );
}
