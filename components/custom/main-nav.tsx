"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'

import { cn } from "@/lib/utils"

function getPathName() {
	return usePathname();
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={`text-sm font-medium transition-colors hover:text-primary ${usePathname() == "/" ? "" : "text-muted-foreground"}`}
      >
        Home
      </Link>
      <Link
        href="/your-books"
        className={`text-sm font-medium transition-colors hover:text-primary ${usePathname() == "/your-books" ? "" : "text-muted-foreground"}`}
      >
        Your Books
      </Link>
      <Link
        href="/examples/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${usePathname() == "/saved-books" ? "" : "text-muted-foreground"}`}
      >
        Saved Books
      </Link>
    </nav>
  )
}
