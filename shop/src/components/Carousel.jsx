import React, { useState, useEffect } from 'react';
const TOTAL_SLIDES = 5; 
const slides = [
  "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
  "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
  "https://images.pexels.com/photos/8230026/pexels-photo-8230026.jpeg",
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0); 

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % TOTAL_SLIDES);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); 
    return () => clearInterval(interval); 
  }, [activeIndex]);


  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {slides.map((src, index) => (
          <div 
            key={index} 
            className={`duration-700 ease-in-out ${index === activeIndex ? 'block' : 'hidden'}`} 
            data-carousel-item
          >
            <img 
              src={src} 
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
            <button 
                key={index}
                type="button" 
                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'}`} 
                aria-current={index === activeIndex} 
                aria-label={`Slide ${index + 1}`} 
                data-carousel-slide-to={index}
                onClick={() => setActiveIndex(index)} 
            ></button>
        ))}
      </div>
      <button 
        type="button" 
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button 
        type="button" 
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}