'use client';

import { PAYMENT_PAGE } from '../_constants/payment';
import PaymentMethods from './PaymentMethods';

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{PAYMENT_PAGE.title}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">{PAYMENT_PAGE.description}</p>
      </div>

      {/* Payment Methods */}
      <PaymentMethods />

      {/* Currency note */}
      <p className="text-center text-sm text-gray-400 mt-8">
        Todos os valores estão em Kwanza (Kz)
      </p>
    </div>
  );
}