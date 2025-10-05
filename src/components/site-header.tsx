'use client';
import Link from "next/link";
import { User, Menu, LogOut } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/providers/language-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileNav } from "./mobile-nav";
import { useState } from "react";
import { useUser } from "@/firebase/auth/use-user";
import { getAuth, signOut } from "firebase/auth";
import { useFirebaseApp } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const { dictionary } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: user } = useUser();
  const firebaseApp = useFirebaseApp();

  const handleSignOut = async () => {
    if (!firebaseApp) return;
    const auth = getAuth(firebaseApp);
    await signOut(auth);
  }

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
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
              <MobileNav onLinkClick={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <LanguageSwitcher />
            {user ? (
                 <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
                       <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                       <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                     </Avatar>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-56" align="end" forceMount>
                   <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                       <p className="text-sm font-medium leading-none">{user.displayName}</p>
                       <p className="text-xs leading-none text-muted-foreground">
                         {user.email}
                       </p>
                     </div>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link href="/profile">{dictionary.header.profile}</Link>
                   </DropdownMenuItem>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={handleSignOut}>
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>{dictionary.header.signOut}</span>
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
            ) : (
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/login">
                        <User className="h-5 w-5" />
                        <span className="sr-only">{dictionary.header.userAccount}</span>
                    </Link>
                </Button>
            )}
            <CartSheet />
          </nav>
        </div>
      </div>
    </header>
  );
}

    