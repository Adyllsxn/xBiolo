'use client';

import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

export default function PedidoConfirmadoPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-md">
      <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <FiCheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold mb-3">Pedido enviado!</h1>
      <p className="text-gray-500 mb-6">
        Seu pedido foi enviado para o lojista via WhatsApp. 
        Ele entrará em contacto em breve para confirmar a entrega.
      </p>
      <Link
        href="/produtos"
        className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Continuar comprando
      </Link>
    </div>
  );
}