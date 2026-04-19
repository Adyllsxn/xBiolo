'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl: string;
    category: string;
  };
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [formattedPrice, setFormattedPrice] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormattedPrice(product.price.toLocaleString('pt-AO'));
  }, [product.price]);

  if (viewMode === 'list') {
    return (
      <div className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition bg-white">
        <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            }}
          />
        </div>
        <div className="flex-1">
          <Link href={`/produtos/${product.slug}`}>
            <h3 className="font-semibold hover:text-orange-500 transition">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-500">{product.category}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-orange-500">
              {formattedPrice || product.price.toLocaleString('pt-AO')} Kz
            </span>
            <button className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition">
              <FiShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group border rounded-lg overflow-hidden hover:shadow-md transition bg-white">
      <Link href={`/produtos/${product.slug}`}>
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            }}
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1 hover:text-orange-500 transition">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-orange-500">
              {formattedPrice || product.price.toLocaleString('pt-AO')} Kz
            </span>
            <button className="p-1.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition">
              <FiShoppingBag className="w-3 h-3" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}