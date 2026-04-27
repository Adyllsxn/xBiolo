'use client';

import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl: string;
    description: string;
    variations: string[];
    stock: number;
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const images = [product.imageUrl, product.imageUrl, product.imageUrl];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <ProductImages images={images} name={product.name} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}