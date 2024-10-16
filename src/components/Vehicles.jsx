import { useState } from "react";
import { VehiclePriceChart } from "./TrendLineChart";
import VehicleTable from "./VehicleTable";
import FilterComponent from "./FilterComponent";
import Modal from "./Modal";

function Vehicles({ vehicles }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (vehicle) => {
    setSelectedCar(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  // Setting the number of rows per page
  const rowsPerPage = 4; 
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  // Toggle visibility function
  const toggleVisibility = () => {
    setIsVisible((prevVisible) => !prevVisible);
  };

  // Initial filter state
  const initialFilters = {
    make: "",
    model: "",
    year: "",
    version: "",
    minPrice: "",
    maxPrice: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  // Handle filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredvehicles = vehicles.filter((v) => {
    const matchesBrand = v.make
      .toLowerCase()
      .includes(filters.make.toLowerCase());
    const matchesModel = v.model
      .toLowerCase()
      .includes(filters.model.toLowerCase());
    const matchesYear = filters.year ? v.year === Number(filters.year) : true;

    // Flatten the data for version and price filtering
    const versionsMatching = v.versions.some((version) => {
      // Filter by version name if provided
      const matchesVersion = filters.version
        ? version.name.toLowerCase().includes(filters.version.toLowerCase())
        : true;

      // Filter by price range 
      const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
      const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;

      const matchesMinPrice =
        minPrice !== null ? version.price >= minPrice : true;
      const matchesMaxPrice =
        maxPrice !== null ? version.price <= maxPrice : true;

      return matchesVersion && matchesMinPrice && matchesMaxPrice;
    });

    // Ensuring that the vehicle satisfies all the conditions (brand, model, year, version, and price range)
    return matchesBrand && matchesModel && matchesYear && versionsMatching;
  });

  // Flatten the data to include each version as its own row
  const flattenedData = filteredvehicles.reduce((acc, vehicle) => {
    return [
      ...acc,
      ...vehicle.versions.map((version) => ({
        ...vehicle,
        name: version.name,
        price: version.price,
      })),
    ];
  }, []);

  // Calculate indices for the rows to display based on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentVehicles = flattenedData.slice(indexOfFirstRow, indexOfLastRow);
  console.log(currentVehicles);
  // Calculate total pages
  const totalPages = Math.ceil(flattenedData.length / rowsPerPage);

  // Handlers for pagination buttons
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters(initialFilters); // Reset filters to initial state
    setCurrentPage(1); // Optionally reset to the first page
  };

  return (
    <div className="bg-gray-50 w-[70vw] ">
      <div className="mx-auto  px-4 pt-2 w-screen md:w-full">
        {/* HEADER */}
        <div className="flex items-center justify-between ">
          <div>
            <h2 className="font-semibold text-gray-700">Browse Data</h2>
            <span className="text-xs text-gray-500">
              View data of registered vehicles
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="ml-10  lg:ml-40">
              <button
                onClick={toggleVisibility}
                className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
              >
                <svg
                  className="w-[2vh] h-[2vh] fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                </svg>
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <FilterComponent filters={filters} 
        handleFilterChange={handleFilterChange} 
        handleResetFilters={handleResetFilters}
        isVisible={isVisible} 
        />
        {/* TABLE */}
        
        <VehicleTable currentPage={currentPage} 
        currentVehicles={currentVehicles}
        nextPage={nextPage} prevPage={prevPage} 
        openModal={openModal}
        totalPages={totalPages} 
        ></VehicleTable>
      </div>

      {/* Modal for displaying the chart */}
      <Modal  isOpen={isModalOpen} onClose={closeModal}>
        <h2>
          Price Trends for {selectedCar?.make} {selectedCar?.model} {selectedCar?.year}
        </h2>
        {selectedCar && (
          <VehiclePriceChart car={selectedCar} />
        )}
      </Modal>


      {selectedCar && (
        <div className="hidden">
          <h2>
            Price Trends for {selectedCar.make} {selectedCar.model}{" "}
            {selectedCar.year}
          </h2>
          <VehiclePriceChart
            car={vehicles.find((v) => v.model === selectedCar.model)}
          />
        </div>
      )}
    </div>
  );
}

export default Vehicles;
