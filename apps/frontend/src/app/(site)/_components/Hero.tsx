'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HERO_SLIDES } from '../_constants/hero';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  // Divide o título em duas partes para o efeito de fonte
  const titleParts = slide.title.split(',');

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 z-10 bg-gradient-to-r ${slide.bgColor} opacity-80`} />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl text-white">
          {/* Título com efeito de fonte (extralight + extrabold) */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <span className="font-extralight">{titleParts[0]},</span>
            <br />
            <span className="font-extrabold">{titleParts[1] || titleParts[0]}</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 text-white/90">
            {slide.description}
          </p>
          <Link href={slide.buttonLink}>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white border-none">
              {slide.buttonText}
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition"
        aria-label="Anterior"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition"
        aria-label="Próximo"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-6 bg-orange-500' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}