import React from "react";

const VehicleTable = ({
  currentVehicles,
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  openModal,
}) => {
  return (
    <div className="my-6 rounded-lg border">
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
              <th className="px-5 py-3">BRAND</th>
              <th className="px-5 py-3">MODEL</th>
              <th className="px-5 py-3">YEAR</th>
              <th className="px-5 py-3">VERSION</th>
              <th className="px-5 py-3">PRICE</th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {currentVehicles.length > 0 ? (
              currentVehicles.map((vehicle, index) => (
                <tr key={index} onClick={() => openModal(vehicle)}>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-xs">
                    <p className="whitespace-no-wrap">{vehicle.make}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-xs">
                    <div className="ml-3">
                      <p className="whitespace-no-wrap">{vehicle.model}</p>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-xs">
                    <p className="whitespace-no-wrap">{vehicle.year}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-xs">
                    <p className="whitespace-no-wrap">{vehicle.name}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-xs">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold text-gray-900">
                      £ {vehicle.price}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-xs text-center"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col items-center border-t bg-white px-5 py-2 sm:flex-row sm:justify-between">
        <span className="text-xs text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="mt-2 inline-flex sm:mt-0">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="mr-2 h-12 w-12 rounded-full border text-xs font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="h-12 w-12 rounded-full border text-xs font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleTable;
