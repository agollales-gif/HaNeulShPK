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
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3">
      {/* Korean-inspired pattern background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-red-50/30 rounded-lg"></div>
      
      {/* Main frame with Korean aesthetic */}
      <div className="absolute inset-0 border-3 border-red-600/30 rounded-lg"></div>
      <div className="absolute inset-0 border-2 border-red-600/20 rounded-lg m-1"></div>
      <div className="absolute inset-0 border border-red-600/10 rounded-md m-2"></div>

      {/* Korean corner decorations - inspired by traditional patterns */}
      <div className="absolute top-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-t-3 border-l-3 border-red-600 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-t-3 border-r-3 border-red-600 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-b-3 border-l-3 border-red-600 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-b-3 border-r-3 border-red-600 rounded-br-lg"></div>

      {/* Inner corner accents - Korean style */}
      <div className="absolute top-1 left-1 w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 border-t border-l border-red-600/60 rounded-tl-sm"></div>
      <div className="absolute top-1 right-1 w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 border-t border-r border-red-600/60 rounded-tr-sm"></div>
      <div className="absolute bottom-1 left-1 w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 border-b border-l border-red-600/60 rounded-bl-sm"></div>
      <div className="absolute bottom-1 right-1 w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 border-b border-r border-red-600/60 rounded-br-sm"></div>

      {/* Korean-inspired decorative dots */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-90"></div>
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-90"></div>
      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-90"></div>
      <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full opacity-90"></div>

      {/* Additional Korean-style accent dots */}
      <div className="absolute top-1/2 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600/70 rounded-full -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600/70 rounded-full -translate-y-1/2"></div>
      <div className="absolute left-1/2 top-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600/70 rounded-full -translate-x-1/2"></div>
      <div className="absolute left-1/2 bottom-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600/70 rounded-full -translate-x-1/2"></div>

      {/* Center image container */}
      <div className="absolute inset-2 sm:inset-3 rounded-lg overflow-hidden z-10 text-center shadow-inner">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full object-cover rounded-lg ${
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
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-red-600/90 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20 border-2 border-red-700"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-red-600/90 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20 border-2 border-red-700"
          aria-label="Next image"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20 border border-red-800/30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-white w-6 sm:w-8 shadow-sm scale-110'
                : 'bg-white/60 hover:bg-white/80'
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
