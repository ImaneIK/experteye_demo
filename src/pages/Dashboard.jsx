import dataset from "../vehicle-prices.json";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import React, { useState } from "react";
import PieChart from "../components/PieChart";
import Carousel from "../components/ChartsCarousel";
import BrandsCarousel from "../components/BrandsCarousel";
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

export default function Dashboard() {
  // State for carousel
  const [activeCarousel, setActiveCarousel] = useState(1);

  // Calculations for total vehicles and total versions
  const totalVehicles = dataset.vehicles.length;
  const totalVersions = dataset.vehicles.reduce(
    (acc, vehicle) => acc + vehicle.versions.length,
    0
  );

  // Function to calculate total market value
  function calculateTotalMarketValue(data) {
    let totalMarketValue = 0;

    data.vehicles.forEach((vehicle) => {
      vehicle.versions.forEach((version) => {
        totalMarketValue += version.price;
      });
    });

    return totalMarketValue;
  }

  // Total market value
  const totalMarketValue = calculateTotalMarketValue(dataset);

  // Helper function to calculate median
  function calculateMedian(values) {
    if (values.length === 0) return 0;
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2) return values[half];
    return (values[half - 1] + values[half]) / 2.0;
  }

  // Helper function to calculate standard deviation
  function calculateStandardDeviation(values) {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map((value) => Math.pow(value - avg, 2));
    const avgSquareDiff =
      squareDiffs.reduce((sum, diff) => sum + diff, 0) / values.length;
    return Math.sqrt(avgSquareDiff);
  }

  // Function to extract stats from dataset
  function extractStats(data) {
    const groupedStats = {};

    data.vehicles.forEach((vehicle) => {
      const { make, model, versions } = vehicle;

      // Initialize the make if not already present
      if (!groupedStats[make]) {
        groupedStats[make] = {
          make,
          models: [],
          versions: [],
          prices: [],
        };
      }

      // Add model and version details
      groupedStats[make].models.push(model);
      versions.forEach((version) => {
        groupedStats[make].versions.push(version);
        groupedStats[make].prices.push(version.price);
      });
    });

    // Compute stats for each make
    const makeStats = Object.keys(groupedStats).map((makeKey) => {
      const makeData = groupedStats[makeKey];
      const prices = makeData.prices;

      return {
        make: makeData.make,
        numberOfModels: makeData.models.length,
        numberOfVersions: makeData.versions.length,
        avgPriceByModel: `£ ${(
          prices.reduce((a, b) => a + b, 0) / prices.length
        ).toFixed(2)}`,
        medianPrice: `£ ${calculateMedian(prices).toFixed(2)}`,
        mostExpensiveVersion: makeData.versions.reduce((a, b) =>
          a.price > b.price ? a : b
        ),
        cheapestVersion: makeData.versions.reduce((a, b) =>
          a.price < b.price ? a : b
        ),
        stdDevPrice: `£ ${calculateStandardDeviation(prices).toFixed(2)}`,
        spreadPrice: `£ ${(Math.max(...prices) - Math.min(...prices)).toFixed(
          2
        )}`,
      };
    });

    return makeStats;
  }

  // Extract stats from dataset
  const stats = extractStats(dataset);

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-around">
      {/* Detailed stats and charts */}

      <div className="relative w-screen md:w-[110vh] flex flex-col gap-6 py-4 ">
        <BrandsCarousel stats={stats}></BrandsCarousel>

        {/* carousel: barchart linechart and weightchart */}
        <Carousel
          activeCarousel={activeCarousel}
          setActiveCarousel={setActiveCarousel}
          dataset={dataset}
        ></Carousel>
      </div>

      {/* general stats and the pie chart */}
      <div className="">
        {/* stats */}
        <div class="  flex-col space-y-3 max-w-sm rounded-xl px-4 py-4    lg:flex">
          <div class="flex rounded-xl bg-white py-2 px-2 text-gray-700 shadow-lg shadow-pink-200">
            <div class="my-auto mr-4 p-3 text-blue-500">
            <svg className="w-[3vh] h-[3vh] fill-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
            </div>
            <div class="">
              <p class="text-2xl font-bold">{totalVehicles}</p>
              <p class="text-sm">Total Number of Vehicles</p>
            </div>
          </div>

          <div class="flex rounded-xl bg-white py-2 px-2 text-gray-700 shadow-lg shadow-pink-200">
            <div class="my-auto mr-4 p-3 text-blue-500">
            <svg className="w-[3vh] h-[3vh] fill-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/></svg>
            </div>
            <div class="">
              <p class="text-2xl font-bold">{totalVersions}</p>
              <p class="text-sm">Total Number of Versions</p>
            </div>
          </div>

          <div class="flex rounded-xl bg-white py-2 px-2 text-gray-700 shadow-lg shadow-pink-200">
            <div class="my-auto mr-4 p-3 text-blue-500">
            <svg className="w-[3vh] h-[3vh] fill-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M312 24l0 10.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3s0 0 0 0c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8l0 10.6c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-11.4c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2L264 24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z"/></svg>
            </div>
            <div class="">
              <p class="text-2xl font-bold">£ {totalMarketValue}</p>
              <p class="text-sm">Total market value</p>
            </div>
          </div>
        </div>

        {/* piechart */}

        <div className="bg-white rounded-xl shadow-lg shadow-pink-200 p-2 mx-4 w-screen md:w-full">
          <PieChart vehicles={dataset.vehicles} />{" "}
        </div>
      </div>
    </div>
  );
}
