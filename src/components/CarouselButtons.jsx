import React from 'react';

const CarouselButtons = ({ activeCarousel, setActiveCarousel, totalItems }) => {
  return (
    <div className="absolute top-1 left-60 flex z-20">
      <label
        onClick={() =>
          setActiveCarousel((prev) =>
            prev === 1 ? totalItems : prev - 1
          )
        }
        className="inline-block text-indigo-600 cursor-pointer -translate-x-3 bg-white rounded-full shadow-md active:translate-y-0.5"
      >
        {/* Previous button */}
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
        onClick={() =>
          setActiveCarousel((prev) =>
            prev === totalItems ? 1 : prev + 1
          )
        }
        className="inline-block text-indigo-600 cursor-pointer translate-x-1 bg-white rounded-full shadow-md active:translate-y-0.5"
      >
        {/* Next button */}
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
  );
};

export default CarouselButtons;
