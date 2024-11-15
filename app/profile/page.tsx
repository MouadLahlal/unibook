"use client"
import { useState, useEffect } from "react"
import { Metadata } from "next"
import Image from "next/image"
import { Document, Page, Thumbnail } from 'react-pdf'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { MainNav } from "@/components/custom/main-nav"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

async function getBooks(setBooks: any) {
    const res = await fetch("/api/books");
    let temp = await res.json()
    setBooks(temp.books);
}

export default function YourBooksPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    return (
        <>
            <div className="hidden flex-col md:flex">
                <MainNav className="mx-6" />
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex flex-col items-center justify-between space-y-2">
                        <div className="rounded-full border-4 border-white">
                            <Image
                                src={"https://img.redbull.com/images/c_crop,x_1415,y_0,h_4313,w_3235/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2023/10/26/hatws0pulmah0avzeqba/bello-figo-red-bull-posse"}
                                alt="bello figo gu"
                                width={300}
                                height={300}
                                className="rounded-full w-[200px] h-[200px] object-cover"
                            />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">llmad</h2>
                    </div>
                    {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */}
                    <div className="grid grid-cols-1 place-items-center">
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold mb-4">Ebook's platform login</h1>
                            <Tabs defaultValue="account" className="w-[400px]">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="account">HubYoung</TabsTrigger>
                                    <TabsTrigger value="password">Pearson (coming soon...)</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">
                                    <Card className="p-4">
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="email">E-mail</Label>
                                                <Input id="email" placeholder="Insert your email..." onChange={(e) => setEmail(e.target.value)}/>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="password">Password</Label>
                                                <Input id="password" placeholder="Insert your password..."  onChange={(e) => setPassword(e.target.value)}/>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button onClick={async () => {
                                                await fetch("/api/hubyoung", { method: 'POST', body: JSON.stringify({ email, password }) });
                                                toast({
                                                    description: "Login saved",
                                                });
                                            }}>Save changes</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="password">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Password</CardTitle>
                                            <CardDescription>
                                                Change your password here. After saving, you'll be logged out.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="current">Current password</Label>
                                                <Input id="current" type="password" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="new">New password</Label>
                                                <Input id="new" type="password" />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button>Save password</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
