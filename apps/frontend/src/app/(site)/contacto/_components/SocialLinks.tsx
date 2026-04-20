'use client';

import { SOCIAL_LINKS } from '../_constants/contact';

export default function SocialLinks() {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="font-semibold text-gray-800 mb-2">Redes sociais</h3>
      <p className="text-sm text-gray-500 mb-4">Acompanhe novidades e promoções</p>
      <div className="flex gap-4">
        {SOCIAL_LINKS.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:scale-110 hover:-translate-y-1"
            aria-label={social.name}
          >
            <social.icon className="h-6 w-6 text-orange-500 hover:text-orange-600 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}