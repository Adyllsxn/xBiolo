'use client';

import Link from 'next/link';
import { HOW_TO_BUY_PAGE, HOW_TO_BUY_STEPS, TIPS } from './_constants/howToBuy';
import { FiInfo } from 'react-icons/fi';

export default function ComoComprarPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
          {HOW_TO_BUY_PAGE.subtitle}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{HOW_TO_BUY_PAGE.title}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">{HOW_TO_BUY_PAGE.description}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Steps - 2 colunas */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-6">{HOW_TO_BUY_PAGE.stepsTitle}</h2>
          <div className="space-y-6">
            {HOW_TO_BUY_STEPS.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips - 1 coluna */}
        <div>
          <h2 className="text-xl font-semibold mb-6">{HOW_TO_BUY_PAGE.tipsTitle}</h2>
          <div className="space-y-4">
            {TIPS.map((tip, index) => (
              <div key={index} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                <FiInfo className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">{tip.title}</h4>
                  <p className="text-gray-500 text-xs mt-1">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
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