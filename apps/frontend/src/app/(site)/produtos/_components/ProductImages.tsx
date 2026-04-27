'use client';

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProductImagesProps {
  images: string[];
  name: string;
}

export default function ProductImages({ images, name }: ProductImagesProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  const imageUrls = images.map(img => 
    img ? `${API_URL}${img}` : '/images/placeholder.jpg'
  );

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={imageUrls[currentImage]}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {imageUrls.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-16 h-16 relative rounded-md overflow-hidden border-2 ${
                currentImage === idx ? 'border-orange-500' : 'border-transparent'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}