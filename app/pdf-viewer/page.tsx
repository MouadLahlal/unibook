import { Suspense } from "react";
import { PDFViewer } from "./viewer";

export default function Page() {
    return (
        <Suspense>
            <PDFViewer />
        </Suspense>
    )
}