export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  colors: { name: string; class: string }[];
  sizes: string[];
};

export type CartItem = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};
