import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from './ui/badge';
import { getImage } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = getImage(product.images[0]);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-square relative">
            {primaryImage && (
                <Image
                    src={primaryImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={primaryImage.imageHint}
                />
            )}
        </Link>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg mb-2 !font-body font-bold">
                <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
                    {product.name}
                </Link>
            </CardTitle>
            <p className="text-muted-foreground text-sm">{product.category}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            <Button asChild size="sm" variant="outline">
                <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
        </CardFooter>
    </Card>
  );
}
