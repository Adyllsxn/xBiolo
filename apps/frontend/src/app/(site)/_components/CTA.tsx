'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { CTA_DATA } from '../_constants/cta';

export default function CTA() {
  return (
    <section className="py-20 bg-orange-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Lado esquerdo - Texto */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-white/50" />
              <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                {CTA_DATA.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="font-extralight">{CTA_DATA.titlePrefix}</span>
              <br />
              <span className="font-extrabold">{CTA_DATA.titleHighlight}</span>
            </h2>
            <p className="text-white/80 text-lg max-w-md">
              {CTA_DATA.description}
            </p>
          </div>

          {/* Lado direito - Botão */}
          <div>
            <Link
              href={CTA_DATA.buttonLink}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-500 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {CTA_DATA.buttonText}
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}