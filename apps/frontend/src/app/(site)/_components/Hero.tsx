'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HERO_CONTENT } from '../_constants/hero';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {HERO_CONTENT.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {HERO_CONTENT.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={HERO_CONTENT.ctaLink}>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                {HERO_CONTENT.ctaText}
              </Button>
            </Link>
            <Link href={HERO_CONTENT.secondaryCtaLink}>
              <Button size="lg" variant="outline">
                {HERO_CONTENT.secondaryCtaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}