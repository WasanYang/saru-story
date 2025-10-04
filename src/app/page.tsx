import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/data';
import { PlaceHolderImages, getImage } from '@/lib/placeholder-images';

export default async function Home() {
  const products = await getProducts();
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
            Embrace Softness, Naturally.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-body mb-8">
            Discover the unparalleled comfort of Saru, our collection crafted from the finest muslin fabric for a gentle touch and breathable feel.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Shop The Collection</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Handpicked for you, these pieces represent the best of Saru Story's comfort and style.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Fabric of Our Lives</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Every thread tells a story of tradition, nature, and passion. Learn about our journey and the sustainable practices behind every garment.
            </p>
            <Button asChild size="lg" variant="default">
              <Link href="/story">Our Story</Link>
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
