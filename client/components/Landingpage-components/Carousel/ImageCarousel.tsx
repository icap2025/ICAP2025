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

  // Function to get the index of the previous slide
  const getPrevIndex = (index: number): number => {
    return index === 0 ? slides.length - 1 : index - 1;
  };

  // Function to get the index of the next slide
  const getNextIndex = (index: number): number => {
    return (index + 1) % slides.length;
  };

  // Navigate to a specific slide
  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };
  
  // Get the 3 slides to show (previous, current, next)
  const prevSlide = slides[getPrevIndex(currentIndex)];
  const currentSlide = slides[currentIndex];
  const nextSlide = slides[getNextIndex(currentIndex)];

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden py-8 px-4">
      {/* Carousel container with transitions */}
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {/* Previous slide (left side) */}
        <div className="hidden sm:block w-1/6 h-32 md:h-48 lg:h-56 relative overflow-hidden rounded-lg shadow-md opacity-50 hover:opacity-70 transition-opacity duration-300">
          <Image
            src={prevSlide.imageUrl}
            alt={prevSlide.title}
            fill
            style={{ objectFit: 'cover', transform: 'scale(1.05)' }}
            className="w-full h-full rounded-lg transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 16vw"
            priority={false}
          />
        </div>
        
        {/* Current/active slide (center) */}
        <div className="w-full sm:w-2/3 h-56 md:h-64 lg:h-80 relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 ease-in-out">
          <Image
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-full rounded-lg transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 66vw"
            priority={true}
          />
          
          {/* Title and location with gradient background */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-12 pb-4 px-4 text-left">
            <h2 className="text-lg md:text-xl font-semibold text-white">{currentSlide.title}</h2>
            <p className="text-xs md:text-sm text-gray-200">{currentSlide.location}</p>
          </div>
        </div>
        
        {/* Next slide (right side) */}
        <div className="hidden sm:block w-1/6 h-32 md:h-48 lg:h-56 relative overflow-hidden rounded-lg shadow-md opacity-50 hover:opacity-70 transition-opacity duration-300">
          <Image
            src={nextSlide.imageUrl}
            alt={nextSlide.title}
            fill
            style={{ objectFit: 'cover', transform: 'scale(1.05)' }}
            className="w-full h-full rounded-lg transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 16vw"
            priority={false}
          />
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 mx-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
