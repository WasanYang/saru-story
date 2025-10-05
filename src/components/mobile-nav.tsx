'use client';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

interface MobileNavProps {
  onLinkClick?: () => void;
}

export function MobileNav({ onLinkClick }: MobileNavProps) {
  const { dictionary } = useLanguage();

  if (!dictionary?.nav) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Link href="/" className="flex items-center space-x-2 mb-4" onClick={handleLinkClick}>
        <Leaf className="h-6 w-6 text-primary" />
        <span className="font-bold font-headline text-lg">Saru Story</span>
      </Link>
      <nav className="flex flex-col space-y-3">
        <Link href="/products" className="text-lg text-muted-foreground hover:text-primary" onClick={handleLinkClick}>
          {dictionary.nav.products}
        </Link>
        <Link href="/story" className="text-lg text-muted-foreground hover:text-primary" onClick={handleLinkClick}>
          {dictionary.nav.ourStory}
        </Link>
        <Link href="/why-saru" className="text-lg text-muted-foreground hover:text-primary" onClick={handleLinkClick}>
          {dictionary.nav.whySaru}
        </Link>
      </nav>
    </div>
  );
}
