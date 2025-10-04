import type { Product } from './types';

const products: Product[] = [
  {
    id: 'saru-shirt-olive',
    name: 'The Essential Muslin Shirt',
    price: 68.0,
    images: ['product-shirt-1', 'product-shirt-2'],
    description:
      'Experience everyday luxury with our Essential Muslin Shirt. Crafted from double-gauze organic muslin, it offers a soft, breathable fit that gets softer with every wash. Its timeless design and relaxed silhouette make it a versatile staple for any conscious wardrobe.',
    category: 'Shirts',
    colors: [
      { name: 'Olive', class: 'bg-primary' },
      { name: 'Natural', class: 'bg-stone-200' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'saru-dress-sienna',
    name: 'The Flowy Muslin Dress',
    price: 95.0,
    images: ['product-dress-1', 'product-dress-2'],
    description:
      'Effortlessly elegant, the Flowy Muslin Dress drapes beautifully for a flattering, comfortable fit. Perfect for sunny days or layering on cooler evenings, its breathable muslin fabric keeps you cool and stylish. A true testament to minimalist charm and natural comfort.',
    category: 'Dresses',
    colors: [
      { name: 'Sienna', class: 'bg-accent' },
      { name: 'Black', class: 'bg-black' },
    ],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'saru-pants-white',
    name: 'The Relaxed Muslin Pants',
    price: 75.0,
    images: ['product-pants-1', 'product-pants-2'],
    description:
      'Discover ultimate relaxation with our Muslin Pants. Featuring a comfortable elastic waist and a wide-leg cut, they offer freedom of movement and a chic, laid-back look. The lightweight, airy fabric is ideal for lounging at home or exploring on a warm day.',
    category: 'Pants',
    colors: [
      { name: 'Off-White', class: 'bg-white' },
      { name: 'Gray', class: 'bg-gray-400' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
    {
    id: 'saru-scarf-natural',
    name: 'The Soft Muslin Scarf',
    price: 35.0,
    images: ['product-scarf-1', 'product-scarf-2'],
    description:
      'Add a touch of softness to any outfit with our Muslin Scarf. Wonderfully light and endlessly versatile, it can be styled in numerous ways to suit your look. The delicate, crinkled texture of the muslin fabric adds a subtle, organic elegance.',
    category: 'Accessories',
    colors: [
        { name: 'Natural', class: 'bg-stone-200' },
        { name: 'Sienna', class: 'bg-accent' },
    ],
    sizes: ['One Size'],
  },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return products.find(p => p.id === id);
}
