'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getImage } from '@/lib/placeholder-images';
import { useLanguage } from '@/providers/language-provider';
import { Button } from './ui/button';
import { useCart } from '@/providers/cart-provider';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = getImage(product.images[0]);
  const { dictionary } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes[0], product.colors[0].name);
  };

  if (!dictionary?.productCard) {
    return null;
  }

  const isNewArrival = product.tags.includes('New Arrivals');
  const isBestSeller = product.tags.includes('Best Sellers');

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-2xl rounded-none group">
      <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
        <CardHeader className="p-0 relative aspect-square w-full">
            {primaryImage && (
                <Image
                    src={primaryImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={primaryImage.imageHint}
                />
            )}
            <div className="absolute top-2 left-2 flex flex-col space-y-2">
                {isNewArrival && <Badge variant="secondary" className="rounded-sm">New</Badge>}
                {isBestSeller && <Badge variant="secondary" className="rounded-sm">Best Seller</Badge>}
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="icon" onClick={handleAddToCart}>
                    <Plus className="h-5 w-5"/>
                    <span className="sr-only">{dictionary.productCard.addToCart}</span>
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
            <p className="text-muted-foreground text-sm">{product.tags.filter(t => t !== 'New Arrivals' && t !== 'Best Sellers').join(', ')}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-baseline">
            <CardTitle className="text-lg !font-body font-bold group-hover:text-primary transition-colors">
                {product.name}
            </CardTitle>
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </CardFooter>
        </Link>
    </Card>
  );
}
