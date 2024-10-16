const FilterComponent = ({ isVisible, filters, handleFilterChange, handleResetFilters }) => {
    return (
      <>
        {isVisible && (
          <div className="p-4">
            <div className="flex flex-col w-full">
              <div>
                <div className="flex flex-wrap gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* Brand Filter */}
                  <div className="flex flex-col">
                    <label htmlFor="make" className="text-xs font-medium text-stone-600">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="make"
                      placeholder="Brand"
                      value={filters.make}
                      onChange={handleFilterChange}
                      id="make"
                      className="mt-1 block w-full text-xs rounded-md border border-gray-100 bg-white px-2 py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
  
                  {/* Model Filter */}
                  <div className="flex flex-col">
                    <label htmlFor="model" className="text-xs font-medium text-stone-600">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      placeholder="Model"
                      value={filters.model}
                      onChange={handleFilterChange}
                      id="model"
                      className="mt-1 block w-full text-xs rounded-md border border-gray-100 bg-white px-2 py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
  
                  {/* Year Filter */}
                  <div className="flex flex-col">
                    <label htmlFor="year" className="text-xs font-medium text-stone-600">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      placeholder="Year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      id="year"
                      className="mt-1 block w-full text-xs rounded-md border border-gray-100 bg-white px-2 py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
  
                  {/* Version Filter */}
                  <div className="flex flex-col">
                    <label htmlFor="version" className="text-xs font-medium text-stone-600">
                      Version
                    </label>
                    <input
                      type="text"
                      name="version"
                      placeholder="Version"
                      value={filters.version}
                      onChange={handleFilterChange}
                      id="version"
                      className="mt-1 block w-full text-xs rounded-md border border-gray-100 bg-white px-2 py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
  
                  {/* Min Price Filter */}
                  <div>
                    <label htmlFor="minPrice" className="text-xs font-medium text-stone-600">
                      Min Price
                    </label>
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full text-xs rounded-md border border-gray-100 bg-white px-2 py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
  
                  {/* Max Price Filter */}
                  <div>
                    <label htmlFor="maxPrice" className="text-xs font-medium text-stone-600">
                      Max Price
                    </label>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full text-xs rounded-md border border-gray-100 bg-white px-2 py-1 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
  
                  {/* Reset Filters Button */}
                  <div>
                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-2 text-xs rounded-md bg-blue-600 text-white"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default FilterComponent;
  