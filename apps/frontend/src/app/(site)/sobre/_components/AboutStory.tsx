'use client';

import { FiHeart } from 'react-icons/fi';

export default function AboutStory() {
  return (
    <div className="bg-gray-50 rounded-xl p-8 mb-16">
      <div className="flex items-center gap-2 mb-4">
        <FiHeart className="w-5 h-5 text-orange-500" />
        <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">Nossa história</span>
      </div>
      <h2 className="text-2xl font-bold mb-4">Como tudo começou</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        O Biolo nasceu da necessidade de ajudar pequenos negócios angolanos a terem presença digital. 
        Vimos que muitos lojistas tinham dificuldade em mostrar seus produtos de forma profissional.
      </p>
      <p className="text-gray-600 leading-relaxed">
        Foi assim que criamos o Biolo: uma plataforma simples, sem complicação, 
        onde o cliente escolhe e o pedido vai direto para o WhatsApp do lojista.
      </p>
    </div>
  );
}