'use client';

import { FiTarget } from 'react-icons/fi';

export default function AboutMission() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <div className="bg-orange-50 rounded-xl p-8">
        <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center mb-4">
          <FiTarget className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Nossa missão</h3>
        <p className="text-gray-600">
          Democratizar o acesso ao comércio digital em Angola, oferecendo 
          uma plataforma simples, acessível e eficiente para pequenos negócios.
        </p>
      </div>
      
      <div className="bg-orange-50 rounded-xl p-8">
        <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center mb-4">
          <FiTarget className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Nossa visão</h3>
        <p className="text-gray-600">
          Ser a principal plataforma de catálogo digital para pequenos negócios em Angola, 
          conectando lojistas e clientes de forma simples e eficiente.
        </p>
      </div>
    </div>
  );
}