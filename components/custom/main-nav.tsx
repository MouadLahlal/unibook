"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { UploadDialog } from "@/components/custom/upload-dialog"
import { cn } from "@/lib/utils"
import { Search } from "./search"
import { UserNav } from "./user-nav"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <h2 className="text-2xl ml-4 font-bold tracking-tight font-mono">unibook</h2>
        <nav
          className={cn("mx-6 flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${usePathname() == "/" ? "" : "text-muted-foreground"}`}
          >
            Home
          </Link>
          <Link
            href="/examples/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${usePathname() == "/saved-books" ? "" : "text-muted-foreground"}`}
          >
            Saved Books
          </Link>
        </nav>
        {/*            <TeamSwitcher />*/}
        <div className="ml-auto flex items-center space-x-4">
          <UploadDialog />
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  )
}
