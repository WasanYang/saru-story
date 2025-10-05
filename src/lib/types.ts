export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  tags: string[];
  colors: { name: string; class: string }[];
  sizes: string[];
};

export type CartItem = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};
