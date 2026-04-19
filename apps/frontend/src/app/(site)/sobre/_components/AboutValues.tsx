'use client';

import { ABOUT_VALUES } from '../_constants/about';

export default function AboutValues() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">Nossos valores</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {ABOUT_VALUES.map((value, index) => (
          <div key={index} className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <value.icon className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{value.title}</h3>
            <p className="text-gray-500 text-sm">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}