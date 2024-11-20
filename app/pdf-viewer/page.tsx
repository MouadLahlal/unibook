"use client";

import { pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/custom/main-nav";
import { useSearchParams } from "next/navigation";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
};

const ControlButton = ({ onClick, disabled, children, className }: any) => (
    <Button onClick={onClick} disabled={disabled} className={className}>
        {children}
    </Button>
);

export default function PDFViewer() {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageWidth, setPageWidth] = useState(500);
    const [file, setFile] = useState({ url: "" });
    const searchParams = useSearchParams();

    useEffect(() => {
        setFile({ url: decodeURIComponent(searchParams.get("url") || "") });
    }, []);

    function onDocumentLoadSuccess({ numPages: nextNumPages, }: { numPages: number; }) {
        setNumPages(nextNumPages);
    }

    return (
        <>
            <MainNav className="mx-6" />

            {file && (
                <>
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
                                renderAnnotationLayer={false}
                                renderTextLayer={true}
                                width={pageWidth}
                            />
                        </Document>
                    </div>

                    <div className="fixed bottom-0 inset-x-0 max-w-max mx-auto z-30 rounded-t-lg bg-slate-800 px-6 py-4">
                        <ControlButton
                            onClick={() => setPageNumber(pageNumber - 1)}
                            disabled={pageNumber <= 1}
                            className={"px-2 mr-6"}
                        >
                            &lt;
                        </ControlButton>
                        <ControlButton
                            onClick={() => setPageWidth(pageWidth - 100)}
                            disabled={pageWidth <= 200}
                            className={"px-2 mr-4"}
                        >
                            Zoom -
                        </ControlButton>

                        <a href={file.url} download>
                            <Button>Download</Button>
                        </a>
                        
                        <ControlButton
                            onClick={() => setPageWidth(pageWidth + 100)}
                            disabled={pageWidth + 200 >= window.innerWidth}
                            className={"px-2 ml-4"}
                        >
                            Zoom +
                        </ControlButton>
                        <ControlButton
                            onClick={() => setPageNumber(pageNumber + 1)}
                            disabled={pageNumber >= numPages}
                            className={"px-2 ml-6"}
                        >
                            &gt;
                        </ControlButton>
                    </div>
                </>
            )}
        </>
    );
}
