'use client';

import { PAYMENT_METHODS } from '../_constants/payment';

export default function PaymentMethods() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {PAYMENT_METHODS.map((method, index) => (
        <div key={index} className="bg-white border rounded-xl p-6 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <method.icon className="h-6 w-6 text-orange-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{method.title}</h2>
          <p className="text-gray-500 text-sm mb-4">{method.description}</p>
          <ul className="space-y-2">
            {method.details.map((detail, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}