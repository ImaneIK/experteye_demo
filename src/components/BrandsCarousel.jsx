import React, { useState } from 'react';
import CarouselButtons from './CarouselButtons';  // Import the CarouselButtons component

const BrandsCarousel = ({ stats }) => {
  const [activeCarousel2, setActiveCarousel2] = useState(1);

  return (
    <div className="relative">
      {/* Carousel Buttons */}
      <CarouselButtons 
        activeCarousel={activeCarousel2} 
        setActiveCarousel={setActiveCarousel2} 
        totalItems={stats.length} 
      />

      {/* Carousel body */}
      {stats.map((makeStats, index) => (
        <div
          key={index}
          className={`relative bg-white rounded-lg shadow-lg transition-all duration-300 ${
            activeCarousel2 === index + 1 ? "block" : "hidden z-0"
          }`}
        >
          {/* carousel body: for each brand */}
        {stats.map((makeStats, index) => (
          <div
            key={index}
            className={`relative  bg-white rounded-lg shadow-lg transition-all duration-300 ${
              activeCarousel2 === index + 1 ? "block" : "hidden z-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  rounded-xl">
              {/* first column */}
              <div className="flex flex-col px-4 py-6 rounded-xl bg-gradient-to-t from-indigo-500 to-blue-500">
                <div className=" flex ">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-400 sm:mr-3 sm:mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div className="px-4">
                    <p className="mb-1 text-xl font-black text-white">
                      {makeStats.make}
                    </p>
                    <p className="font-medium text-indigo-100">
                      {" "}
                      {makeStats.numberOfModels} vehicles
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 ">
                  <div className="flex flex-col items-center px-4 py-1">
                    <p className="text-lg font-medium text-white">
                      {makeStats.numberOfModels}
                    </p>
                    <p className="text-xs font-medium text-indigo-100">
                      {" "}
                      models
                    </p>
                  </div>
                  <div className="mb-1 flex flex-col items-center px-4 py-1">
                    <p className="text-lg font-medium text-white">
                      {" "}
                      {makeStats.numberOfVersions}
                    </p>
                    <p className="text-xs font-medium text-indigo-100">
                      versions
                    </p>
                  </div>
                  <div className="mb-1 flex flex-col items-center rounded-2xl bg-white px-4 py-1">
                    <p className="text-lg font-medium text-indigo-500">
                      {makeStats.avgPriceByModel}
                    </p>
                    <p className="text-xs font-medium text-indigo-500">
                      Average price{" "}
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4 py-1">
                    <p className="text-lg font-medium text-white">
                      {makeStats.medianPrice}
                    </p>
                    <p className="text-xs font-medium text-indigo-100">
                      Median{" "}
                    </p>
                  </div>
                </div>
              </div>

              {/* second column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                <div>
                  <p className="text-md font-bold">
                    {makeStats.mostExpensiveVersion.name}
                  </p>
                  <p className="text-slate-400 text-sm mb-2 font-medium">
                    £ {makeStats.mostExpensiveVersion.price}
                  </p>
                  <span className="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">
                    Most expensive
                  </span>
                </div>
                <div>
                  <p className="text-md font-bold">
                    {makeStats.cheapestVersion.name}
                  </p>
                  <p className="text-slate-400 text-sm mb-2 font-medium">
                    £ {makeStats.cheapestVersion.price}
                  </p>
                  <span className="rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-600">
                    Cheapest version
                  </span>
                </div>
                <div>
                  <p className="text-md font-bold"> {makeStats.stdDevPrice}</p>
                  {/* <p className="text-slate-400 text-sm mb-2 font-medium"> {makeStats.stdDevPrice}</p> */}
                  <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-700">
                    Standard deviation
                  </span>
                </div>
                <div>
                  <p className="text-md font-bold"> {makeStats.spreadPrice}</p>
                  {/* <p className="text-slate-400 text-sm mb-2 font-medium"> {makeStats.spreadPrice}</p> */}
                  <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-600">
                    Spread price
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      ))}
    </div>
  );
};

export default BrandsCarousel;
