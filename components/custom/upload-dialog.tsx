"use client"

import { useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { UserNav } from "@/components/custom/user-nav"
import { Search } from "@/components/custom/search"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function UploadDialog() {

    const [platformPopup, setPlatformPopup] = useState(false)
    const [bookPopup, setBookPopup] = useState(false)
    const [platform, setPlatform] = useState("")
    const [book, setBook] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [bookList, setBookList] = useState<Array<any> | null>(null)

    const platforms = [
        {
            value: "hubyoung",
            label: "Hub Young",
        }
    ]

    return (
        <div className="ml-auto flex items-center space-x-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Upload</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Upload book</DialogTitle>
                        <DialogDescription>
                            Login to a platform and select the book you want to upload
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Popover open={platformPopup} onOpenChange={setPlatformPopup}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                    >
                                        {platform
                                            ? platforms.find((platforms) => platforms.value === platform)?.label
                                            : "Select framework..."}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search framework..." />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {platforms.map((el) => (
                                                    <CommandItem
                                                        key={el.value}
                                                        value={el.value}
                                                        onSelect={(currentValue) => {
                                                            setPlatform(currentValue === platform ? "" : currentValue)
                                                            setPlatformPopup(false)
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
                            {
                                platform ?
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    : <></>
                            }
                            {
                                bookList ?
                                    <Popover open={bookPopup} onOpenChange={setBookPopup}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[200px] justify-between truncate"
                                            >
                                                {
                                                    book ?
                                                        bookList.find((bookList) => bookList.value === book)?.name
                                                        : "Select book..."
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Select book..." />
                                                <CommandList>
                                                    <CommandEmpty>No book found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {bookList.map((el: any) => (
                                                            <CommandItem
                                                                key={el.value}
                                                                value={el.value}
                                                                onSelect={(currentValue) => {
                                                                    setBook(currentValue === book ? "" : currentValue)
                                                                    setBookPopup(false)
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
                                    : <></>
                            }
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start md:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setPlatform("")}>
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="button" disabled={bookList ? ( book ? false : true) : false} onClick={async () => {
                            if (!bookList) {
                                const res = await fetch("/api/hubyoung", { method: "POST", body: JSON.stringify({ "username": username, "password": password, "login": false }) });
                                let temp = await res.json();
                                setBookList(temp);
                            } else {
                                const res = await fetch("/api/hubyoung", { method: "POST", body: JSON.stringify({ username, password, login: true, bookId: book }) });
                                let temp = await res.json();
                                console.log(temp);
                            }
                            // console.log(JSON.stringify(temp));
                        }}>
                            { bookList ? "Download book" : "Retrieve books" }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Search />
            <UserNav />
        </div>
    )
}