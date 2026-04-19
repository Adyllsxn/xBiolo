'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiCreditCard, FiDollarSign, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function FinalizarPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    pagamento: 'dinheiro',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Se não tiver itens, redireciona
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

    setIsSubmitting(true);

    // Montar mensagem para o WhatsApp
    const mensagem = `
🛍️ *NOVO PEDIDO - Biolo*

👤 *Cliente:* ${formData.nome}
📍 *Endereço:* ${formData.endereco}
📞 *Telefone:* ${formData.telefone || 'Não informado'}
💳 *Pagamento:* ${formData.pagamento === 'cartao' ? 'Cartão de crédito' : 'Dinheiro na entrega'}

📦 *ITENS DO PEDIDO:*
${items.map(item => `• ${item.name} (${item.variation}) - ${item.quantity}x - ${(item.price * item.quantity).toLocaleString('pt-AO')} Kz`).join('\n')}

💰 *TOTAL:* ${totalPrice.toLocaleString('pt-AO')} Kz

🔗 Pedido gerado pelo Biolo
    `;

    // Número do lojista (substituir pelo número real)
    const numeroWhatsApp = '244923456789';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Limpar carrinho
    clearCart();
    
    // Abrir WhatsApp
    window.open(url, '_blank');
    
    // Redirecionar para página de sucesso
    setTimeout(() => {
      router.push('/pedido-confirmado');
    }, 500);
  };

  if (!mounted) {
    return <div className="container mx-auto px-4 py-16 text-center">Carregando...</div>;
  }

  if (items.length === 0) {
    return null; // Vai redirecionar
  }

  const total = totalPrice;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/sacolinha" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-4">
          <FiArrowLeft className="w-4 h-4" />
          Voltar para sacolinha
        </Link>
        <h1 className="text-2xl font-bold">Finalizar pedido</h1>
        <p className="text-gray-500">Preencha seus dados para completar a compra</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados pessoais */}
            <div className="bg-white border rounded-lg p-6">
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

            {/* Pagamento */}
            <div className="bg-white border rounded-lg p-6">
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

        {/* Resumo do pedido */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
          
          <div className="space-y-3 max-h-80 overflow-auto mb-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variation}`} className="flex gap-3 text-sm">
                <div className="w-12 h-12 relative bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
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
              <span className="text-orange-500">{total.toLocaleString('pt-AO')} Kz</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Em até 3x sem juros no cartão</p>
          </div>
        </div>
      </div>
    </div>
  );
}