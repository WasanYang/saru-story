'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/data';
import { PlaceHolderImages, getImage } from '@/lib/placeholder-images';
import { Leaf, Waves, Thermometer, Droplets } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/providers/language-provider';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';

const features = [
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    titleKey: "featureSoftnessTitle",
    descriptionKey: "featureSoftnessDescription"
  },
  {
    icon: <Waves className="h-8 w-8 text-primary" />,
    titleKey: "featureBreathableTitle",
    descriptionKey: "featureBreathableDescription"
  },
  {
    icon: <Thermometer className="h-8 w-8 text-primary" />,
    titleKey: "featureRegulatingTitle",
    descriptionKey: "featureRegulatingDescription"
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    titleKey: "featureEcoFriendlyTitle",
    descriptionKey: "featureEcoFriendlyDescription"
  }
];


export default function Home() {
  const { dictionary } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const prods = await getProducts();
      setProducts(prods);
    };
    fetchProducts();
  }, []);

  if (!dictionary || Object.keys(dictionary).length === 0) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  const featuredProducts = products.slice(0, 3);
  const heroImage = getImage('hero-1');
  const storyImage = getImage('story-1');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold !font-headline mb-4 tracking-wider">
            {dictionary.home.heroTitle}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-body mb-8">
            {dictionary.home.heroSubtitle}
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">{dictionary.home.shopCollection}</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{dictionary.home.featuredProductsTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {dictionary.home.featuredProductsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">{dictionary.home.viewAllProducts}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{dictionary.home.magicOfMuslinTitle}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    {dictionary.home.magicOfMuslinSubtitle}
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.titleKey} className="text-center border-0 bg-transparent shadow-none">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="!font-headline text-xl">{dictionary.home[feature.titleKey]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{dictionary.home[feature.descriptionKey]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{dictionary.home.fabricOfOurLivesTitle}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {dictionary.home.fabricOfOurLivesSubtitle}
            </p>
            <Button asChild size="lg" variant="default">
              <Link href="/story">{dictionary.home.ourStory}</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
             {storyImage && (
              <Image
                src={storyImage.imageUrl}
                alt={storyImage.description}
                fill
                className="object-cover"
                data-ai-hint={storyImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
