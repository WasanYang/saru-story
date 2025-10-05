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

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-2xl rounded-none group">
      <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-square relative">
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
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="icon" onClick={handleAddToCart}>
                    <Plus className="h-5 w-5"/>
                    <span className="sr-only">{dictionary.productCard.addToCart}</span>
                </Button>
            </div>
        </CardHeader>
        <div className="p-4">
            <CardTitle className="text-lg mb-2 !font-body font-bold group-hover:text-primary transition-colors">
                {product.name}
            </CardTitle>
            <p className="text-muted-foreground text-sm">{product.tags.join(', ')}</p>
        </div>
        </Link>
        <CardFooter className="p-4 pt-0 mt-auto">
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </CardFooter>
    </Card>
  );
}
