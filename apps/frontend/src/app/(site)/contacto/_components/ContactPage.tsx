'use client';

import { CONTACT_PAGE } from '../_constants/contact';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import FaqPreview from './FaqPreview';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{CONTACT_PAGE.title}</h1>
        <p className="text-gray-500">{CONTACT_PAGE.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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