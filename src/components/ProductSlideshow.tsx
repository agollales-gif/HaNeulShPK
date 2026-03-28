import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductSlideshowProps {
  images: string[];
  productName: string;
}

const ProductSlideshow: React.FC<ProductSlideshowProps> = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-lg opacity-60"></div>
      <div className="absolute inset-0 border-2 border-red-600/20 rounded-lg"></div>
      <div className="absolute inset-0 border border-red-600/10 rounded-md m-1"></div>

      <div className="absolute top-0 left-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-t-2 border-l-2 border-red-600 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-t-2 border-r-2 border-red-600 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-b-2 border-l-2 border-red-600 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 border-b-2 border-r-2 border-red-600 rounded-br-lg"></div>

      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-80"></div>
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-80"></div>
      <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-80"></div>
      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-80"></div>

      <div className="absolute inset-1 sm:inset-2 rounded-lg overflow-hidden shadow-[0_20px_40px_rgba(26,43,75,0.15)] border border-red-600/10 bg-white/50 z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full object-cover ${
              images[0]?.includes('shin_crackers') ? 'origin-top scale-[1.12]' : ''
            }`}
            width={1080}
            height={1350}
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-red-600/90 hover:bg-red-600 text-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20 border border-red-700"
          aria-label="Previous image"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-red-600/90 hover:bg-red-600 text-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20 border border-red-700"
          aria-label="Next image"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 bg-white/80 px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-md z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-red-600 w-3 sm:w-4 md:w-6 lg:w-8 shadow-sm'
                : 'bg-red-200 hover:bg-red-400'
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSlideshow;
