"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}