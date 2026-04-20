'use client';

import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { FAQ_PREVIEW } from '../_constants/contact';

export default function FaqPreview() {
  return (
    <div className="bg-orange-50 rounded-xl p-6">
      <h3 className="font-semibold text-gray-800 mb-2">Dúvidas frequentes</h3>
      <p className="text-sm text-gray-600 mb-4">Respostas rápidas para as perguntas mais comuns</p>
      <ul className="space-y-3">
        {FAQ_PREVIEW.map((item, index) => (
          <li key={index}>
            <Link href={item.link} className="flex items-center justify-between text-gray-600 hover:text-orange-500 transition group">
              <span className="text-sm">{item.question}</span>
              <FiChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/faq" className="inline-block mt-4 text-sm text-orange-500 hover:underline">
        Ver todas as perguntas →
      </Link>
    </div>
  );
}