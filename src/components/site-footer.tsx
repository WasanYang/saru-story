'use client';
import { Leaf, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useLanguage } from '@/providers/language-provider';

export function SiteFooter() {
  const { dictionary } = useLanguage();

  if (!dictionary?.footer) {
    return null;
  }

  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">Saru Story</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {dictionary.footer.tagline}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">{dictionary.footer.shop}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                  {dictionary.footer.allProducts}
                </Link>
              </li>
              <li>
                <Link href="/products?category=shirts" className="text-sm text-muted-foreground hover:text-primary">
                  {dictionary.footer.shirts}
                </Link>
              </li>
              <li>
                <Link href="/products?category=dresses" className="text-sm text-muted-foreground hover:text-primary">
                  {dictionary.footer.dresses}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">{dictionary.footer.about}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/story" className="text-sm text-muted-foreground hover:text-primary">
                  {dictionary.footer.ourStory}
                </Link>
              </li>
              <li>
                <Link href="/why-saru" className="text-sm text-muted-foreground hover:text-primary">
                  {dictionary.footer.whySaru}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">{dictionary.footer.followUs}</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Saru Story. {dictionary.footer.rightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}