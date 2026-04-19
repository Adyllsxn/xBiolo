'use client';

import { CONTACT_INFO } from '../_constants/contact';

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      {CONTACT_INFO.map((item, index) => (
        <div key={index} className="flex items-start gap-5 p-5 bg-white border rounded-xl hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <item.icon className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{item.label}</h3>
            {item.href ? (
              <a href={item.href} className="text-gray-600 hover:text-orange-500 transition block">
                {item.value}
              </a>
            ) : (
              <p className="text-gray-600">{item.value}</p>
            )}
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}