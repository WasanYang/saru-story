'use client';
import Link from "next/link";
import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { dictionary } = useLanguage();

  if (!dictionary?.nav) {
    return (
        <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="inline-block font-bold font-headline text-lg">Saru Story</span>
        </Link>
      </nav>
    )
  }

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="inline-block font-bold font-headline text-lg">Saru Story</span>
      </Link>
      <Link
        href="/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {dictionary.nav.products}
      </Link>
      <Link
        href="/story"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {dictionary.nav.ourStory}
      </Link>
      <Link
        href="/why-saru"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {dictionary.nav.whySaru}
      </Link>
    </nav>
  );
}
