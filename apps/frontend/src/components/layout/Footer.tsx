'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { SITE_CONFIG } from '@/lib/constants';
import { 
  FOOTER_SERVICES, 
  FOOTER_INSTITUTIONAL, 
  FOOTER_CONTACT, 
  FOOTER_SOCIAL, 
  FOOTER_NEWSLETTER,
  FOOTER_COPYRIGHT 
} from '@/lib/constants/footer';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email cadastrado:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {FOOTER_NEWSLETTER.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {FOOTER_NEWSLETTER.description}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder={FOOTER_NEWSLETTER.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm"
              >
                <FiSend className="h-4 w-4" />
                {FOOTER_NEWSLETTER.buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              {FOOTER_SOCIAL.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Serviços</h3>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-orange-400 transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Institucional</h3>
            <ul className="space-y-2">
              {FOOTER_INSTITUTIONAL.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-orange-400 transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contactos</h3>
            <ul className="space-y-3">
              {FOOTER_CONTACT.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-orange-400 transition"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. {FOOTER_COPYRIGHT}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}