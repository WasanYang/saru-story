import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/data';
import { ProductClientContent } from './product-client-content';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductClientContent product={product} />;
}
