import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Function to calculate weighted average
const calculateWeightedAverage = (vehicles) => {
  return vehicles.map(vehicle => {
    const totalWeight = vehicle.versions.reduce((acc, version) => acc + version.price, 0);
    const weightedAverage = vehicle.versions.reduce((acc, version) => acc + version.price * version.price, 0) / totalWeight;

    return {
      make: vehicle.make,
      model: vehicle.model,
      weightedAverage,
    };
  });
};

// Transform data for the line chart
const transformDataForTrendsChart = (vehicles) => {
  const weightedAverages = calculateWeightedAverage(vehicles);

  const labels = weightedAverages.map(vehicle => `${vehicle.make} ${vehicle.model}`);
  const data = weightedAverages.map(vehicle => vehicle.weightedAverage);

  


  return {
    labels,
    datasets: [
      {
        label: 'Weighted Average Price',
        data,
        borderColor: 'rgba(0, 0, 255, 1)',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: false,
        borderWidth: 1,
        tension: 0.1, // Smooth line
      },
    ],
  };
};

const WeightedAverageTrendsChart = ({ vehicles }) => {
  const chartData = useMemo(() => transformDataForTrendsChart(vehicles), [vehicles]);

  

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default WeightedAverageTrendsChart;
