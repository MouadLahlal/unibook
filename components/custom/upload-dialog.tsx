"use client";

import { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Spinner } from "@/components/ui/spinner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Book = {
	original_filename: string,
	s3_filename: string,
	thumbnail: string,
    value: string,
    name: string
}

export function UploadDialog() {
    const [open, setOpen] = useState(false);
    const [platformPopup, setPlatformPopup] = useState(false);
    const [bookPopup, setBookPopup] = useState(false);
    const [platform, setPlatform] = useState("");
    const [book, setBook] = useState("");
    const [bookList, setBookList] = useState<Array<Book> | null>(null);
    const [loadingBooks, setLoadingBooks] = useState(false);

    const platforms = [
        {
            value: "hubyoung",
            label: "Hub Young",
        },
    ];

    const resetForm = () => {
        setPlatform("");
        setBook("");
        setBookList(null);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Upload</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload book</DialogTitle>
                    <DialogDescription>
                        Login to a platform and select the book you want to
                        upload
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Popover
                            open={platformPopup}
                            onOpenChange={setPlatformPopup}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between"
                                >
                                    {platform
                                        ? platforms.find((platforms) => platforms.value === platform)?.label
                                        : "Select platform..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search platform..." />
                                    <CommandList>
                                        <CommandEmpty>
                                            No platform found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {platforms.map((el) => (
                                                <CommandItem
                                                    key={el.value}
                                                    value={el.value}
                                                    onSelect={( currentValue ) => {
                                                        setPlatform(currentValue === platform ? "" : currentValue);
                                                        setPlatformPopup(false);
                                                    }}
                                                >
                                                    {el.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {bookList && (
                            <Popover
                                open={bookPopup}
                                onOpenChange={setBookPopup}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between truncate"
                                    >
                                        {book
                                            ? bookList.find((bookList) => bookList.value === book)?.name
                                            : "Select book..."}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Select book..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                No book found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {bookList.map((el: Book) => (
                                                    <CommandItem
                                                        key={el.value}
                                                        value={el.value}
                                                        onSelect={(currentValue) => {
                                                            setBook(currentValue === book ? "" : currentValue);
                                                            setBookPopup(false);
                                                        }}
                                                    >
                                                        {el.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                <DialogFooter className="sm:justify-start md:justify-between">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setPlatform("")}
                        >
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        disabled={
                            loadingBooks
                                ? true
                                : bookList
                                    ? book
                                        ? false
                                        : true
                                    : false
                        }
                        onClick={async () => {
                            setLoadingBooks(true);
                            if (!bookList) {
                                const res = await fetch("/api/hubyoung/book");
                                if (res.status == 200) {
                                    const temp = await res.json();
                                    setBookList(temp.books);
                                } else {
                                    alert("Credenziali errate");
                                }
                            } else {
                                const res = await fetch("/api/hubyoung/book", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        bookId: book,
                                        bookName: bookList.find((bookList) => bookList.value === book)?.name,
                                        thumbnail: bookList.find((bookList) => bookList.value === book)?.thumbnail,
                                    }),
                                });
                                if (res.status == 200) {
                                    resetForm();
                                }
                            }
                            setLoadingBooks(false);
                        }}
                    >
                        {loadingBooks && <Spinner className="text-black" />}
                        {bookList ? "Download book" : "Retrieve books"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
