import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ vehicles }) => {
  const { labels, data } = transformDataForBarChart(vehicles);

  const chartData = {
    labels, // x-axis labels (brand names)
    datasets: [
      {
        label: 'Average Price by Make',
        data, // y-axis data (average prices)
        backgroundColor: 'rgba(0, 0, 255, 0.5)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Price by Make',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;


export const transformDataForBarChart = (vehicles) => {
    const makes = {}; // Object to store total prices and counts for each make
  
    vehicles.forEach((vehicle) => {
      const { make, versions } = vehicle;
  
      // the sum of the prices of all versions for this vehicle
      const totalPrices = versions.reduce((sum, version) => sum + version.price, 0);
      const averagePrice = totalPrices / versions.length; // Average price for this vehicle
  
      // If the make is already in the object, update its values
      if (makes[make]) {
        makes[make].total += averagePrice;
        makes[make].count += 1;
      } else {
        // Otherwise, we initialize the total and count for this make
        makes[make] = { total: averagePrice, count: 1 };
      }
    });
  
    // Calculating the final average price for each make
    let makeData = Object.keys(makes).map((make) => ({
      make,
      averagePrice: makes[make].total / makes[make].count, // Final average price
    }));
  
    // Sorting by average price in descending order
    makeData.sort((a, b) => b.averagePrice - a.averagePrice);
  
    // Limit to top 10 brands
    makeData = makeData.slice(0, 10);
  
    // Separating labels and data for the chart
    const labels = makeData.map((item) => item.make);
    const data = makeData.map((item) => item.averagePrice);
  
    return { labels, data };
  };
  



  