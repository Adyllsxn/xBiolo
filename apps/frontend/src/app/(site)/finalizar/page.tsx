'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiCreditCard, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils/imageUrl';
import { getStore, type Store } from '@/lib/modules/store';

export default function FinalizarPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    pagamento: 'dinheiro',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    getStore()
      .then((data) => setStore(data))
      .catch((error) => console.error('Erro ao carregar loja:', error));
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/produtos');
    }
  }, [mounted, items, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.endereco) {
      alert('Por favor, preencha nome e endereço');
      return;
    }

    if (!store) {
      alert('Carregando informações da loja...');
      return;
    }

    setIsSubmitting(true);

    const mensagem = `
🛍️ *NOVO PEDIDO - ${store.name}*

👤 *Cliente:* ${formData.nome}
📍 *Endereço:* ${formData.endereco}
📞 *Telefone:* ${formData.telefone || 'Não informado'}
💳 *Pagamento:* ${formData.pagamento === 'cartao' ? 'Cartão de crédito' : 'Dinheiro na entrega'}

📦 *ITENS DO PEDIDO:*
${items.map(item => `• ${item.name} (${item.variation}) - ${item.quantity}x - ${(item.price * item.quantity).toLocaleString('pt-AO')} Kz`).join('\n')}

💰 *TOTAL:* ${totalPrice.toLocaleString('pt-AO')} Kz

🔗 Pedido gerado pelo ${store.name}
    `;

    const numeroWhatsApp = store.whatsapp;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    clearCart();
    window.open(url, '_blank');
    
    setTimeout(() => {
      router.push('/pedido-confirmado');
    }, 500);
  };

  if (!mounted || !store) {
    return <div className="container mx-auto px-4 py-16 text-center">Carregando...</div>;
  }

  if (items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Link href="/sacolinha" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-4">
          <FiArrowLeft className="w-4 h-4" />
          Voltar para sacolinha
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
          <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
            Finalizar
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="font-extralight">Finalizar</span>{' '}
          <span className="font-extrabold text-gray-800">pedido</span>
        </h1>
        <p className="text-gray-500 mt-2">Preencha seus dados para completar a compra</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Dados de entrega</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Endereço de entrega *</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="Rua, número, bairro, Luanda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone (opcional)</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="923 456 789"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Forma de pagamento</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="pagamento"
                    value="cartao"
                    checked={formData.pagamento === 'cartao'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                  />
                  <FiCreditCard className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Cartão de crédito</p>
                    <p className="text-xs text-gray-500">Parcelamos em até 3x sem juros</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="pagamento"
                    value="dinheiro"
                    checked={formData.pagamento === 'dinheiro'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                  />
                  <FiDollarSign className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Dinheiro na entrega</p>
                    <p className="text-xs text-gray-500">Pague quando receber o produto</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition disabled:bg-gray-300"
            >
              <FaWhatsapp className="w-5 h-5" />
              {isSubmitting ? 'Enviando...' : 'Finalizar pedido via WhatsApp'}
            </button>
          </form>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Resumo del pedido</h2>
          <div className="space-y-3 max-h-80 overflow-auto mb-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variation}`} className="flex gap-3 text-sm">
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={getImageUrl(item.imageUrl)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.variation} x {item.quantity}</p>
                </div>
                <p className="font-medium">{(item.price * item.quantity).toLocaleString('pt-AO')} Kz</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-500">{totalPrice.toLocaleString('pt-AO')} Kz</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Em até 3x sem juros no cartão</p>
          </div>
        </div>
      </div>
    </div>
  );
}