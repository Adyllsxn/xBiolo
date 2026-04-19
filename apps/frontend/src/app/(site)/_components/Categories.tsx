'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { CATEGORIES_DATA } from '../_constants/categories';

export default function Categories() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho alinhado à direita */}
        <div className="mb-16 text-right">
          <div className="flex items-center justify-end gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider text-orange-500 font-semibold">
              {CATEGORIES_DATA.title}
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-orange-500 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="font-extralight">{CATEGORIES_DATA.subtitle}</span>
            <br />
            <span className="font-extrabold text-gray-800">temos o que você procura</span>
          </h2>
          <p className="text-gray-500 max-w-2xl ml-auto leading-relaxed">
            {CATEGORIES_DATA.description}
          </p>
        </div>

        {/* Grid de categorias com estilo alternado */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {CATEGORIES_DATA.categories.map((cat, index) => {
              const isRightAligned = cat.align === 'right';
              const Icon = cat.icon;
              
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: isRightAligned ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex ${isRightAligned ? 'justify-end' : 'justify-start'}`}
                >
                  <Link
                    href={cat.href}
                    className={`group w-full md:w-[85%] ${cat.borderStyle} bg-white hover:shadow-xl transition-all duration-500 p-6 backdrop-blur-sm`}
                  >
                    <div className={`flex items-center justify-between ${isRightAligned ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex items-center gap-5 ${isRightAligned ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Ícone com efeito de brilho */}
                        <div className="relative">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                            style={{ backgroundColor: `${cat.color}15`, boxShadow: `0 0 20px ${cat.color}20` }}
                          >
                            <Icon size={28} style={{ color: cat.color }} />
                          </div>
                        </div>
                        <div className={`${isRightAligned ? 'text-right' : 'text-left'}`}>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {cat.name}
                          </h3>
                          <p className="text-sm text-gray-500 max-w-md">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                      {/* Seta */}
                      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${isRightAligned ? 'ml-4' : 'mr-4'} group-hover:bg-orange-500 transition-colors duration-300`}>
                        <FiArrowRight size={18} className={`text-gray-400 group-hover:text-white transition-colors duration-300 ${isRightAligned ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}