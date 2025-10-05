'use client';
import Link from "next/link";
import { User, Menu } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/providers/language-provider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { MobileNav } from "./mobile-nav";
import { useState } from "react";

export function SiteHeader() {
  const { dictionary } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!dictionary?.header) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav className="hidden md:flex" />
        
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <MobileNav onLinkClick={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                    <User className="h-5 w-5" />
                    <span className="sr-only">{dictionary.header.userAccount}</span>
                </Link>
            </Button>
            <CartSheet />
          </nav>
        </div>
      </div>
    </header>
  );
}
