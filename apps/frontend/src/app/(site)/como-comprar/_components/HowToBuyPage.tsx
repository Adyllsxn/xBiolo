'use client';

import Link from 'next/link';
import { HOW_TO_BUY_PAGE } from '../_constants/howToBuy';
import Steps from './Steps';
import Tips from './Tips';

export default function HowToBuyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
          {HOW_TO_BUY_PAGE.subtitle}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{HOW_TO_BUY_PAGE.title}</h1>
        <p className="text-gray-500">{HOW_TO_BUY_PAGE.description}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {/* Steps - takes 2/3 */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-6">{HOW_TO_BUY_PAGE.stepsTitle}</h2>
          <Steps />
        </div>

        {/* Tips - takes 1/3 */}
        <div>
          <h2 className="text-xl font-semibold mb-6">{HOW_TO_BUY_PAGE.tipsTitle}</h2>
          <Tips />
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <Link
          href={HOW_TO_BUY_PAGE.ctaLink}
          className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          {HOW_TO_BUY_PAGE.ctaText}
        </Link>
      </div>
    </div>
  );
}