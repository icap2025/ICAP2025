"use client";
import React, { useState, useEffect } from 'react';

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
    <div className="relative w-full max-w-6xl mx-auto py-4 md:py-8 lg:py-10 px-4 sm:px-6">
        {/* Carousel container */}
        <div className="relative flex items-center justify-center overflow-hidden h-64 sm:h-72 md:h-80 lg:h-96">
            {visibleIndexes.map((slideIndex, i) => {
                const isCurrent = i === 1;
                const isPrevOrNext = i === 0 || i === 2;
                
                // Animation classes based on slide position
                let positionClass = '';
                if (isCurrent) positionClass = 'z-20 scale-100 opacity-100';
                else if (i === 0) positionClass = 'z-10 -translate-x-1/2 scale-90 opacity-70';
                else positionClass = 'z-10 translate-x-1/2 scale-90 opacity-70';
                
                return (
                    <div 
                        key={slideIndex}
                        className={`absolute top-0 transform ${positionClass} 
                            transition-all duration-700 ease-out
                            ${isCurrent ? 'w-full sm:w-4/5 md:w-3/4 lg:w-3/5' : 'hidden sm:block sm:w-1/3 md:w-1/4 lg:w-1/5'}
                            h-full`}
                    >
                        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                            <img 
                                src={slides[slideIndex].imageUrl} 
                                alt={slides[slideIndex].title} 
                                className={`w-full h-full object-cover transition-transform duration-1000 ${isCurrent ? 'scale-105 hover:scale-110' : 'scale-100'}`}
                            />
                            
                            <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isCurrent ? 'opacity-0' : 'opacity-30'}`} />
                            
                            {isCurrent && (
                                <>
                                    {/* Title and location with gradient */}
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent text-left p-4 md:p-5 pt-10 transform transition-transform duration-700">
                                        <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-white">{slides[slideIndex].title}</h2>
                                        <p className="text-xs md:text-sm text-gray-200">{slides[slideIndex].location}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-5 md:mt-6">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 mx-1.5 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentIndex 
                            ? 'bg-black w-6 md:w-7' 
                            : index === visibleIndexes[0] || index === visibleIndexes[2]
                                ? 'bg-gray-500'
                                : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

        {/* Navigation arrows */}
        <button 
            onClick={() => goToSlide((currentIndex - 1 + slides.length) % slides.length)}
            className="absolute left-2 sm:left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 text-gray-800 shadow-lg transition-all duration-300"
            aria-label="Previous slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </button>
        <button 
            onClick={() => goToSlide((currentIndex + 1) % slides.length)}
            className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 text-gray-800 shadow-lg transition-all duration-300"
            aria-label="Next slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
  );
};

export default ImageCarousel;