import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import WeightedAverageTrendsChart from './TrendsChart';

const CarouselItem = ({ isActive, setActiveCarousel, id, children }) => {
  return (
    <div className="relative">
      <input
        className="sr-only peer"
        type="radio"
        name="carousel"
        id={`carousel-${id}`}
        checked={isActive}
        onChange={() => setActiveCarousel(id)}
      />
      <div
        className={`relative bg-white rounded-lg shadow-lg transition-all duration-300 ${
          isActive ? 'block z-10' : 'hidden z-0'
        }`}
      >
        {children}
        <div className="absolute top-1 right-0 flex z-20">
          <label
            onClick={() => setActiveCarousel(id === 1 ? 3 : id - 1)}
            className="inline-block text-indigo-600 cursor-pointer -translate-x-3 bg-white rounded-full shadow-md active:translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <label
            onClick={() => setActiveCarousel(id === 3 ? 1 : id + 1)}
            className="inline-block text-indigo-600 cursor-pointer translate-x-1 bg-white rounded-full shadow-md active:translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ activeCarousel, setActiveCarousel, dataset }) => {
  return (
    <div className="w-screen md:w-full" style={{ scrollSnapType: 'x mandatory' }}>
      <CarouselItem isActive={activeCarousel === 1} setActiveCarousel={setActiveCarousel} id={1}>
        <BarChart vehicles={dataset.vehicles} />
      </CarouselItem>
      <CarouselItem isActive={activeCarousel === 2} setActiveCarousel={setActiveCarousel} id={2}>
        <WeightedAverageTrendsChart vehicles={dataset.vehicles} />
      </CarouselItem>
      <CarouselItem isActive={activeCarousel === 3} setActiveCarousel={setActiveCarousel} id={3}>
        <LineChart vehicles={dataset.vehicles} />
      </CarouselItem>
    </div>
  );
};

export default Carousel;
