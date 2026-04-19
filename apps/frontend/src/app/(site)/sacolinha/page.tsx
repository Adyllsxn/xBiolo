// app/(site)/sacolinha/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';

export default function SacolinhaPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="container mx-auto px-4 py-16 text-center">Carregando...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <FiShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Sua sacolinha está vazia</h1>
          <p className="text-gray-500 mb-6">Adicione produtos para continuar comprando</p>
          <Link
            href="/produtos"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  const total = totalPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Minha sacolinha</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Lista de produtos */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.variation}`} className="flex gap-4 p-4 border rounded-lg bg-white">
              <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              
              <div className="flex-1">
                <Link href={`/produtos/${item.slug}`}>
                  <h3 className="font-semibold hover:text-orange-500 transition">{item.name}</h3>
                </Link>
                <p className="text-sm text-gray-500">Tamanho: {item.variation}</p>
                <p className="text-sm font-bold text-orange-500 mt-1">
                  {item.price.toLocaleString('pt-AO')} Kz
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.variation, item.quantity - 1)}
                    className="w-7 h-7 rounded-full border flex items-center justify-center hover:border-orange-500"
                  >
                    <FiMinus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.variation, item.quantity + 1)}
                    className="w-7 h-7 rounded-full border flex items-center justify-center hover:border-orange-500"
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id, item.variation)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            Limpar sacolinha
          </button>
        </div>

        {/* Resumo do pedido */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({totalItems} itens)</span>
              <span className="font-medium">{total.toLocaleString('pt-AO')} Kz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frete</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-500">{total.toLocaleString('pt-AO')} Kz</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Em até 3x sem juros no cartão</p>
            </div>
          </div>

          <Link
            href="/finalizar"
            className="block w-full py-3 bg-orange-500 text-white text-center rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Finalizar pedido
          </Link>
        </div>
      </div>
    </div>
  );
}