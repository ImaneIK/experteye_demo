import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const LineChart = ({ vehicles }) => {
  const { labels, datasets } = transformDataForLineChart(vehicles);

  const chartData = {
    labels, // x-axis labels (version names)
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Price Trends by Model',
      },
      tooltip: {
        enabled: true, 
      },

     
    },
   
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;

const transformDataForLineChart = (vehicles) => {
  const labels = []; // This will hold the names of the models
  const datasets = []; // This will hold the data for each model

  vehicles.forEach((vehicle) => {
    const { make, model, versions } = vehicle;


    const versionPrices = versions.map((version) => version.price);
    const versionNames = versions.map((version) => version.name);

    // Check if the labels array is empty, if so, set the version names
    if (labels.length === 0) {
      versionNames.forEach((name) => {
        labels.push(name); // Push version names into labels for x-axis
      });
    }

    datasets.push({
      label: `${make} ${model}`,
      data: versionPrices,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`, // Random color for each model
      fill: false,
      tension: 0.1,
    });
  });

  return { labels, datasets };
};
