'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/providers/language-provider';

// Since we are fetching data client-side for filtering, we need a wrapper
function ProductGrid() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dictionary } = useLanguage();

  const [colorFilter, setColorFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  
  const initialCategory = searchParams.get('category') || 'all';
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
      const colorMatch = colorFilter === 'all' || product.colors.some(c => c.name === colorFilter);
      const sizeMatch = sizeFilter === 'all' || product.sizes.includes(sizeFilter);
      return categoryMatch && colorMatch && sizeMatch;
    });
  }, [products, categoryFilter, colorFilter, sizeFilter]);

  const allCategories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], [products]);
  const allColors = useMemo(() => ['all', ...Array.from(new Set(products.flatMap(p => p.colors.map(c => c.name))))], [products]);
  const allSizes = useMemo(() => ['all', ...Array.from(new Set(products.flatMap(p => p.sizes)))], [products]);

  if (!dictionary?.products) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">{dictionary.products.title}</h1>
        <p className="text-muted-foreground mt-2">{dictionary.products.subtitle}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger><SelectValue placeholder={dictionary.products.filterCategory} /></SelectTrigger>
          <SelectContent>
            {allCategories.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? dictionary.products.allCategories : cat}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={colorFilter} onValueChange={setColorFilter}>
          <SelectTrigger><SelectValue placeholder={dictionary.products.filterColor} /></SelectTrigger>
          <SelectContent>
            {allColors.map(color => <SelectItem key={color} value={color}>{color === 'all' ? dictionary.products.allColors : color}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sizeFilter} onValueChange={setSizeFilter}>
          <SelectTrigger><SelectValue placeholder={dictionary.products.filterSize} /></SelectTrigger>
          <SelectContent>
            {allSizes.map(size => <SelectItem key={size} value={size}>{size === 'all' ? dictionary.products.allSizes : size}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
       { !isLoading && filteredProducts.length === 0 && (
          <div className="text-center col-span-full py-16">
            <p className="text-muted-foreground">{dictionary.products.noProductsFound}</p>
          </div>
        )}
    </div>
  );
}


export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductGrid />
        </Suspense>
    )
}