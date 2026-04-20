'use client';

import { motion } from 'framer-motion';
import { ABOUT_PAGE } from '../_constants/about';

export default function About() {
  const { header, story, mission, vision, values } = ABOUT_PAGE;

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header - alinhado à esquerda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
          <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
            {header.badge}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="font-extralight">{header.titlePrefix}</span>{' '}
          <span className="font-extrabold text-orange-500">{header.titleHighlight}</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          {header.description}
        </p>
      </motion.div>

      {/* História - lado esquerdo */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-24 max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <story.icon className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
            {story.badge}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          <span className="font-extralight">{story.titlePrefix}</span>{' '}
          <span className="font-extrabold text-gray-800">{story.titleHighlight}</span>
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          {story.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </motion.div>

      {/* Missão e Visão - lado a lado */}
      <div className="grid md:grid-cols-2 gap-12 mb-24">
        {/* Missão - lado esquerdo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <mission.icon className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
              {mission.titlePrefix}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            <span className="font-extrabold text-gray-800">{mission.titleHighlight}</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {mission.description}
          </p>
        </motion.div>

        {/* Visão - lado direito */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <vision.icon className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
              {vision.titlePrefix}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            <span className="font-extrabold text-gray-800">{vision.titleHighlight}</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {vision.description}
          </p>
        </motion.div>
      </div>

      {/* Valores - grid 3 colunas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="font-extralight">{values.titlePrefix}</span>{' '}
            <span className="font-extrabold text-orange-500">{values.titleHighlight}</span>
          </h2>
          <p className="text-gray-500">{values.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {values.items.map((item, index) => (
            <div key={index}>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}