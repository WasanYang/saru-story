'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { getImage } from '@/lib/placeholder-images';
import { useLanguage } from '@/providers/language-provider';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = getImage(product.images[0]);
  const { dictionary } = useLanguage();

  if (!dictionary?.productCard) {
    return null;
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-2xl rounded-none">
      <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-square relative group">
        <CardHeader className="p-0">
            {primaryImage && (
                <Image
                    src={primaryImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={primaryImage.imageHint}
                />
            )}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg mb-2 !font-body font-bold hover:text-primary transition-colors">
                {product.name}
            </CardTitle>
            <p className="text-muted-foreground text-sm">{product.tags.join(', ')}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
