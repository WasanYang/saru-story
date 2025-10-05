import type { Product } from './types';

const products: Product[] = [
  {
    id: 'saru-shirt-olive',
    name: 'The Essential Muslin Shirt',
    price: 68.0,
    images: ['product-shirt-1', 'product-shirt-2'],
    description:
      'Experience everyday luxury with our Essential Muslin Shirt. Crafted from double-gauze organic muslin, it offers a soft, breathable fit that gets softer with every wash. Its timeless design and a relaxed silhouette make it a versatile staple for any conscious wardrobe.',
    tags: ['Clothing', 'Best Sellers', 'New Arrivals'],
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
    tags: ['Clothing', 'Best Sellers'],
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
    tags: ['Clothing', 'Best Sellers'],
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
    tags: ['Accessories'],
    colors: [
      { name: 'Natural', class: 'bg-stone-200' },
      { name: 'Sienna', class: 'bg-accent' },
    ],
    sizes: ['One Size'],
  },
  {
    id: 'saru-kids-romper-blue',
    name: 'Muslin Baby Romper',
    price: 45.0,
    images: ['product-romper-1', 'product-romper-2'],
    description: 'Gentle on delicate skin, our muslin baby romper is perfect for playtime and naps. The breathable fabric ensures comfort all day long, while snap closures make for easy changes.',
    tags: ['Kids', 'New Arrivals'],
    colors: [{ name: 'Sky Blue', class: 'bg-sky-200' }, { name: 'Beige', class: 'bg-amber-100' }],
    sizes: ['0-3M', '3-6M', '6-12M'],
  },
  {
    id: 'saru-bedding-charcoal',
    name: 'Muslin Duvet Cover Set',
    price: 180.0,
    images: ['product-bedding-1', 'product-bedding-2'],
    description: 'Transform your bedroom into a sanctuary of comfort with our muslin duvet cover set. Impossibly soft and breathable, it promotes a restful night\'s sleep in any season.',
    tags: ['Home', 'Best Sellers'],
    colors: [{ name: 'Charcoal', class: 'bg-slate-700' }, { name: 'White', class: 'bg-white' }],
    sizes: ['Twin', 'Queen', 'King'],
  },
  {
    id: 'saru-tunic-blush',
    name: 'The Breezy Tunic',
    price: 72.0,
    images: ['product-tunic-1', 'product-tunic-2'],
    description: 'A versatile piece that can be worn as a short dress or a long top. The Breezy Tunic features a relaxed fit and delicate detailing, perfect for a casual yet sophisticated look.',
    tags: ['Clothing', 'New Arrivals'],
    colors: [{ name: 'Blush Pink', class: 'bg-rose-200' }, { name: 'Ivory', class: 'bg-stone-100' }],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'saru-lounge-shorts-gray',
    name: 'The Weekend Lounge Shorts',
    price: 55.0,
    images: ['product-shorts-1', 'product-shorts-2'],
    description: 'Embrace leisurely days with our Weekend Lounge Shorts. With a comfortable drawstring waist and deep pockets, these are your go-to for ultimate relaxation without sacrificing style.',
    tags: ['Clothing'],
    colors: [{ name: 'Light Gray', class: 'bg-gray-300' }, { name: 'Olive', class: 'bg-primary' }],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'saru-maxi-dress-black',
    name: 'The Ethereal Maxi Dress',
    price: 110.0,
    images: ['product-maxi-dress-1', 'product-maxi-dress-2'],
    description: 'Make a statement in subtlety with our Ethereal Maxi Dress. The flowing tiers of soft muslin create a romantic silhouette that moves with you. Perfect for special occasions or simply when you want to feel beautiful.',
    tags: ['Clothing', 'New Arrivals'],
    colors: [{ name: 'Black', class: 'bg-black' }, { name: 'Sienna', class: 'bg-accent' }],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'saru-baby-blanket-sage',
    name: 'Dreamy Baby Blanket',
    price: 50.0,
    images: ['product-baby-blanket-1', 'product-baby-blanket-2'],
    description: 'Swaddle your little one in pure softness. Our multi-layered muslin baby blanket is incredibly gentle, breathable, and perfect for cuddling, tummy time, or as a stroller cover.',
    tags: ['Kids', 'Home', 'Accessories'],
    colors: [{ name: 'Sage Green', class: 'bg-green-200' }, { name: 'Light Pink', class: 'bg-pink-100' }],
    sizes: ['One Size'],
  },
  {
    id: 'saru-bath-towel-sand',
    name: 'Plush Muslin Bath Towel',
    price: 40.0,
    images: ['product-towel-1', 'product-towel-2'],
    description: 'Elevate your bathing ritual with our plush muslin bath towels. The unique waffle weave is highly absorbent and dries quickly, while the fabric remains exceptionally soft against your skin.',
    tags: ['Home'],
    colors: [{ name: 'Sand', class: 'bg-amber-200' }, { name: 'White', class: 'bg-white' }],
    sizes: ['Bath Sheet', 'Hand Towel'],
  },
  {
    id: 'saru-button-down-natural',
    name: 'The Classic Button-Down',
    price: 78.0,
    images: ['product-button-down-1', 'product-button-down-2'],
    description: 'A timeless classic redefined in muslin. Our button-down shirt offers a structured yet comfortable fit, making it perfect for both work and leisure. A true wardrobe essential.',
    tags: ['Clothing'],
    colors: [{ name: 'Natural', class: 'bg-stone-200' }, { name: 'Sky Blue', class: 'bg-sky-200' }],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'saru-jumpsuit-charcoal',
    name: 'The Effortless Jumpsuit',
    price: 120.0,
    images: ['product-jumpsuit-1', 'product-jumpsuit-2'],
    description: 'One-and-done styling at its finest. Our muslin jumpsuit features a relaxed fit, adjustable waist tie, and a chic silhouette that takes you from day to night with ease.',
    tags: ['Clothing'],
    colors: [{ name: 'Charcoal', class: 'bg-slate-700' }, { name: 'Olive', class: 'bg-primary' }],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'saru-throw-blanket-rust',
    name: 'Cozy Muslin Throw Blanket',
    price: 85.0,
    images: ['product-throw-1', 'product-throw-2'],
    description: 'Drape it over your sofa or curl up with it on a chilly evening. Our cozy muslin throw is lightweight yet warm, with a beautiful crinkled texture that adds a touch of rustic charm to any room.',
    tags: ['Home', 'Best Sellers'],
    colors: [{ name: 'Rust', class: 'bg-orange-700' }, { name: 'Natural', class: 'bg-stone-200' }],
    sizes: ['One Size'],
  },
  {
    id: 'saru-toddler-pjs-stars',
    name: 'Starry Night Toddler Pajamas',
    price: 58.0,
    images: ['product-toddler-pjs-1', 'product-toddler-pjs-2'],
    description: 'Send them off to dreamland in our softest muslin pajamas. The two-piece set is breathable and gentle, perfect for a comfortable night\'s sleep. Features a whimsical starry print.',
    tags: ['Kids'],
    colors: [{ name: 'Navy Print', class: 'bg-slate-800' }],
    sizes: ['2T', '3T', '4T', '5T'],
  },
  {
    id: 'saru-kimono-robe-ivory',
    name: 'The Spa Kimono Robe',
    price: 105.0,
    images: ['product-kimono-1', 'product-kimono-2'],
    description: 'Wrap yourself in pure luxury with our spa-inspired kimono robe. Made from layers of our signature muslin, it\'s lightweight, absorbent, and unbelievably soft. The perfect post-bath indulgence.',
    tags: ['Home', 'Accessories'],
    colors: [{ name: 'Ivory', class: 'bg-stone-100' }, { name: 'Light Gray', class: 'bg-gray-300' }],
    sizes: ['One Size Fits Most'],
  },
  {
    id: 'saru-wrap-skirt-sienna',
    name: 'The Versatile Wrap Skirt',
    price: 82.0,
    images: ['product-wrap-skirt-1', 'product-wrap-skirt-2'],
    description: 'A skirt for all seasons. Our muslin wrap skirt offers a customizable fit and a flowing silhouette. Pair it with a simple top for an effortlessly chic look.',
    tags: ['Clothing'],
    colors: [{ name: 'Sienna', class: 'bg-accent' }, { name: 'Black', class: 'bg-black' }],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'saru-blouse-white',
    name: 'The Poet Sleeve Blouse',
    price: 65.0,
    images: ['product-blouse-1', 'product-blouse-2'],
    description: 'Romantic and comfortable, our Poet Sleeve Blouse features gentle gathers and voluminous sleeves. Crafted from lightweight muslin, it adds a touch of bohemian elegance to your wardrobe.',
    tags: ['Clothing', 'Best Sellers', 'New Arrivals'],
    colors: [{ name: 'White', class: 'bg-white' }, { name: 'Blush Pink', class: 'bg-rose-200' }],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'saru-cushion-cover-olive',
    name: 'Textured Muslin Cushion Cover',
    price: 30.0,
    images: ['product-cushion-1', 'product-cushion-2'],
    description: 'Instantly update your living space with our textured muslin cushion covers. The rich texture and earthy tones add warmth and a relaxed feel to any sofa or armchair.',
    tags: ['Home', 'Accessories'],
    colors: [{ name: 'Olive', class: 'bg-primary' }, { name: 'Sand', class: 'bg-amber-200' }],
    sizes: ['18x18"', '20x20"'],
  },
  {
    id: 'saru-kids-dress-yellow',
    name: 'Sunny Day Kids Dress',
    price: 60.0,
    images: ['product-kids-dress-1', 'product-kids-dress-2'],
    description: 'A dress made for twirling! This sunny yellow muslin dress is light, airy, and perfect for playful adventures. The soft fabric ensures your little one stays comfortable all day long.',
    tags: ['Kids', 'New Arrivals'],
    colors: [{ name: 'Mustard', class: 'bg-yellow-500' }, { name: 'Sky Blue', class: 'bg-sky-200' }],
    sizes: ['2T', '3T', '4T', '5T'],
  }
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

export async function getProductsByTag(tag: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (tag === 'All') {
    return products.slice(0,4);
  }
  return products.filter(p => p.tags.includes(tag));
}
