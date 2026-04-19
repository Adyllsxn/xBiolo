'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiMessageCircle } from 'react-icons/fi';
import { faqData } from '../_constants/faq';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getAlignment = (index: number) => {
    return index % 2 === 0 ? 'justify-start' : 'justify-end';
  };

  const getBorderStyle = (index: number) => {
    if (index % 2 === 0) {
      return 'border-l-4 border-l-orange-500 border-r-0 rounded-r-2xl rounded-l-none';
    } else {
      return 'border-r-4 border-r-orange-500 border-l-0 rounded-l-2xl rounded-r-none';
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
          {faqData.subtitle}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          {faqData.titlePrefix}{' '}
          <span className="text-orange-500">{faqData.titleHighlight}</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {faqData.description}
        </p>
      </div>

      {/* FAQ Accordion - Estilo alternado */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          {faqData.faqs.map((faq, index) => {
            const alignment = getAlignment(index);
            const borderStyle = getBorderStyle(index);
            const isRightAligned = alignment === 'justify-end';
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRightAligned ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex ${alignment}`}
              >
                <div
                  className={`w-full md:w-[85%] ${borderStyle} bg-white border border-gray-200 rounded-xl transition-all duration-300 ${
                    isOpen ? 'shadow-md' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full p-5 text-left cursor-pointer"
                  >
                    <div
                      className={`flex items-center justify-between ${
                        isRightAligned ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-4 ${
                          isRightAligned ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <FiHelpCircle className="h-5 w-5 text-orange-500" />
                        </div>
                        <span
                          className={`font-medium text-gray-800 ${
                            isRightAligned ? 'text-right' : 'text-left'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${
                          isRightAligned ? 'ml-4' : 'mr-4'
                        }`}
                      >
                        <FiChevronDown className="h-4 w-4 text-gray-500" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`relative p-5 pb-6 ${
                            isRightAligned ? 'pr-12' : 'pl-12'
                          } border-t border-gray-100`}
                        >
                          <div
                            className={`absolute top-4 ${
                              isRightAligned ? 'right-4' : 'left-4'
                            } w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center`}
                          >
                            <FiMessageCircle className="h-3 w-3 text-orange-500" />
                          </div>
                          <p
                            className={`text-gray-600 leading-relaxed ${
                              isRightAligned ? 'text-right' : 'text-left'
                            }`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          Ainda tem dúvidas?{' '}
          <a href="/contacto" className="text-orange-500 hover:underline">
            Entre em contacto connosco
          </a>
        </p>
      </div>
    </div>
  );
}