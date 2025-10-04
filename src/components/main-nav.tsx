import Link from "next/link";
import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="flex items-center space-x-2">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="inline-block font-bold font-headline text-lg">Saru Story</span>
      </Link>
      <Link
        href="/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/story"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Our Story
      </Link>
      <Link
        href="/why-saru"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Why Saru?
      </Link>
    </nav>
  );
}
