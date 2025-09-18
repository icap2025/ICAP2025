"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SlideItem {
  imageUrl: string;
  title: string;
  location: string;
}

interface ImageCarouselProps {
  slides: SlideItem[];
  autoPlayInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  slides, 
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [autoPlayInterval, slides.length]);

  // Get indexes for visible slides
  const getVisibleIndexes = () => {
    const indexes = [];
    // Get previous 1 image
    if (currentIndex === 0) {
      indexes.push(slides.length - 1);
    } else {
      indexes.push(currentIndex - 1);
    }
    
    // Current image
    indexes.push(currentIndex);
    
    // Get next 1 image
    if (currentIndex === slides.length - 1) {
      indexes.push(0);
    } else {
      indexes.push(currentIndex + 1);
    }
    
    return indexes;
  };

  // Navigate to a specific slide
  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };
  
  // Get visible slides
  const visibleIndexes = getVisibleIndexes();

  return (
    <div className="relative w-full max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        {/* Carousel container */}
        <div className="flex items-center justify-center h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 overflow-hidden">
            {visibleIndexes.map((slideIndex, i) => (
                <div 
                    key={slideIndex}
                    className={`relative mx-1 sm:mx-2 rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ease-out ${
                        i === 1 
                            ? 'w-3/4 sm:w-2/3 md:w-3/5 scale-100 z-10' 
                            : 'w-1/4 sm:w-1/5 opacity-60 scale-95'
                    }`}
                    style={{
                        transform: i === 1 ? 'translateZ(0)' : i === 0 ? 'translateX(5%)' : 'translateX(-5%)'
                    }}
                >
          <Image
            src={slides[slideIndex].imageUrl}
            alt={slides[slideIndex].title}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full rounded-lg transition-transform duration-700 ease-out hover:scale-105"
            sizes="(max-width: 640px) 100vw, 25vw"
            priority={i === 1}
          />
                    
                    {i === 1 && (
                        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 text-left 
                                                    bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-white">
                                {slides[slideIndex].title}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-200">
                                {slides[slideIndex].location}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-4 md:mt-6">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 sm:mx-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                            ? 'bg-black w-4 sm:w-5' 
                            : index === visibleIndexes[0] || index === visibleIndexes[2]
                                ? 'bg-gray-500'
                                : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    </div>
  );
};

export default ImageCarousel;
