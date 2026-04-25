// app/(site)/produtos/_components/ProductInfo.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiShoppingBag, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { useCart } from '@/lib/contexts/CartContext';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    variations: string[];
    stock: number;
    imageUrl: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariation, setSelectedVariation] = useState(product.variations[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState('');
  const { addItem, totalItems } = useCart();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormattedPrice(product.price.toLocaleString('pt-AO'));
  }, [product.price]);

  // Debug: verificar o totalItems
  useEffect(() => {
    console.log('Total items no carrinho:', totalItems);
  }, [totalItems]);

  const handleAddToCart = () => {
    if (!selectedVariation) {
      alert('Selecione um tamanho');
      return;
    }

    const item = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
      variation: selectedVariation,
      quantity: quantity,
    };

    console.log('Adicionando ao carrinho:', item);
    addItem(item);
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-bold text-orange-500">
          {formattedPrice || product.price.toLocaleString('pt-AO')} Kz
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Descrição</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {product.variations.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Tamanho</h3>
          <div className="flex gap-2">
            {product.variations.map((variation) => (
              <button
                key={variation}
                onClick={() => setSelectedVariation(variation)}
                className={`w-10 h-10 rounded-full border transition ${
                  selectedVariation === variation
                    ? 'border-orange-500 bg-orange-50 text-orange-500'
                    : 'border-gray-300 hover:border-orange-300'
                }`}
              >
                {variation}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2">Quantidade</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-orange-500"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-orange-500"
          >
            <FiPlus className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500">Estoque: {product.stock} unidades</span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!selectedVariation}
        className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {addedToCart ? (
          <>
            <FiCheck className="w-5 h-5" />
            Adicionado à sacolinha!
          </>
        ) : (
          <>
            <FiShoppingBag className="w-5 h-5" />
            Botar na sacolinha
          </>
        )}
      </button>
    </div>
  );
}