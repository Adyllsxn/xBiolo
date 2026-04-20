'use client';

import { CONTACT_PAGE } from '../_constants/contact';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import FaqPreview from './FaqPreview';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header alinhado à esquerda */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
          <span className="text-xs uppercase tracking-wider text-orange-500 font-semibold">
            {CONTACT_PAGE.subtitle}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="font-extralight">{CONTACT_PAGE.title}</span>
        </h1>
        <p className="text-gray-500 max-w-2xl">
          {CONTACT_PAGE.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
        {/* Left side - Contact Info */}
        <div>
          <ContactInfo />
        </div>

        {/* Right side - Social + FAQ */}
        <div className="space-y-6">
          <SocialLinks />
          <FaqPreview />
        </div>
      </div>

      {/* Support badge */}
      <div className="text-center mt-12">
        <p className="text-sm text-gray-400">
          {CONTACT_PAGE.supportText}
        </p>
      </div>
    </div>
  );
}