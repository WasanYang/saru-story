import Link from "next/link";
import { Leaf, ShoppingBag, User } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User Account</span>
                </Link>
            </Button>
            <CartSheet />
          </nav>
        </div>
      </div>
    </header>
  );
}
