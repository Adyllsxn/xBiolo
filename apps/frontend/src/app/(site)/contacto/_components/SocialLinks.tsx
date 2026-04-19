'use client';

import { SOCIAL_LINKS } from '../_constants/contact';

export default function SocialLinks() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-center">
      <h3 className="font-semibold text-gray-800 mb-4">Redes sociais</h3>
      <p className="text-sm text-gray-500 mb-5">Acompanhe novidades e promoções</p>
      <div className="flex gap-4 justify-center">
        {SOCIAL_LINKS.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
            style={{ backgroundColor: social.color }}
            aria-label={social.name}
          >
            <social.icon className="h-5 w-5 text-white" />
          </a>
        ))}
      </div>
    </div>
  );
}