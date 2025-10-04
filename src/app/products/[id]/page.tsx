'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { useCart } from '@/providers/cart-provider';
import { cn } from '@/lib/utils';
import { getImage } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from '@/components/ui/skeleton';


export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProductById(params.id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setSelectedSize(fetchedProduct.sizes[0]);
        setSelectedColor(fetchedProduct.colors[0].name);
      } else {
        // If you want to show a 404 page for products not found
        // notFound(); 
      }
      setIsLoading(false);
    }
    fetchProduct();
  }, [params.id]);


  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <div className="space-y-6">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-1/4" />
                        <div className="flex gap-2">
                           <Skeleton className="h-8 w-12" />
                           <Skeleton className="h-8 w-12" />
                           <Skeleton className="h-8 w-12" />
                        </div>
                    </div>
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    )
  }

  if (!product) {
    notFound();
  }
  
  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart(product, 1, selectedSize, selectedColor);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((imgId, index) => {
              const img = getImage(imgId);
              return (
                <CarouselItem key={index}>
                  <div className="aspect-square relative bg-secondary rounded-lg overflow-hidden">
                    {img && (
                      <Image
                        src={img.imageUrl}
                        alt={`${product.name} - view ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint={img.imageHint}
                      />
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2"/>
        </Carousel>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl text-muted-foreground font-semibold">${product.price.toFixed(2)}</p>
          </div>
          
          <p className="text-foreground/80 font-body leading-relaxed">{product.description}</p>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Color: <span className="font-normal text-muted-foreground">{selectedColor}</span></h3>
            <RadioGroup
              value={selectedColor}
              onValueChange={setSelectedColor}
              className="flex gap-2"
            >
              {product.colors.map((color) => (
                <Label key={color.name} htmlFor={`color-${color.name}`}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 flex items-center justify-center cursor-pointer",
                    selectedColor === color.name ? "border-primary" : "border-transparent"
                  )}>
                  <RadioGroupItem value={color.name} id={`color-${color.name}`} className="sr-only" />
                  <span className={cn("h-6 w-6 rounded-full", color.class)}></span>
                  <span className="sr-only">{color.name}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="flex gap-2"
            >
              {product.sizes.map((size) => (
                <Label
                  key={size}
                  htmlFor={`size-${size}`}
                  className={cn(
                    "h-10 w-12 flex items-center justify-center rounded-md border text-sm cursor-pointer transition-colors",
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-secondary"
                  )}
                >
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  {size}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
