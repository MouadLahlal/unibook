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
      <MainNav className="mx-6" />

      <div className="flex justify-center mx-auto z-20 my-2 w-[90%] h-[85vh] overflow-auto bg-slate-800 rounded-lg">
        <Document
          // file={file}
          file={{
            url: 'http://api.minio.mlahlal.duckdns.org/unibook/474065119d3f67c1dcaacd1ad505c134.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20241112%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241112T232036Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=6a319304bb4fb4fbf03be5f53636e8cb213701442537a20cea4b87fca7b2571e',
          }}
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
