'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/modules/product/services/getAllProducts.service';
import type { Product } from '@/lib/modules/product/types/product.types';
import { FEATURED_DATA } from '../_constants/featured';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts(1, 100)
      .then((response) => {
        const featured = response.data.filter(p => p.featured).slice(0, 4);
        setFeaturedProducts(featured);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos em destaque:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-500">Carregando produtos em destaque...</p>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Cabeçalho alinhado à esquerda */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
            <span className="text-xs uppercase tracking-wider text-orange-500 font-semibold">
              {FEATURED_DATA.title}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="font-extralight">Os mais amados</span>
            <br />
            <span className="font-extrabold text-gray-800">pelos nossos clientes</span>
          </h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Peças selecionadas com carinho para você
          </p>
        </div>

        {/* Grid estilo Pinterest */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => {
            const isEven = index % 2 === 0;
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const imageUrl = product.imageUrl ? `${API_URL}${product.imageUrl}` : '/images/placeholder.jpg';

            return (
              <div key={product.id} className={`md:col-span-1 ${!isEven ? 'md:mt-8' : ''}`}>
                <Link href={`/produtos/${product.slug}`} className="group block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-80 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                          Destaque
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-orange-500 transition line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-orange-500 font-bold text-base mt-1">
                        {product.price.toLocaleString('pt-AO')} Kz
                      </p>
                      <button className="mt-3 w-full py-2 border border-orange-500 text-orange-500 text-sm rounded-lg hover:bg-orange-500 hover:text-white transition duration-300">
                        Ver detalhes
                      </button>
                    </div>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Botão ver mais */}
        <div className="text-center mt-12">
          <Link
            href={FEATURED_DATA.buttonLink}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            {FEATURED_DATA.buttonText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}