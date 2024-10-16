import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const transformDataForPieChart = (vehicles) => {
  const vehicleCountByMake = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.make] = (acc[vehicle.make] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(vehicleCountByMake);
  const data = Object.values(vehicleCountByMake);

  const backgroundColors = labels.map(() => {
    const red = Math.floor(Math.random() * 150); 
    const green = Math.floor(Math.random() * 100); 
    const blue = Math.floor(Math.random() * 155) + 150; 
  
    return `rgba(${red}, ${green}, ${blue}, 0.5)`; 
  });


  return {
    labels,
    
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
      },
    ],
  };
};

const PieChart = ({ vehicles }) => {
  const chartData = transformDataForPieChart(vehicles);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true, 
      },
      title: {
        display: true,
        text: 'Distribution of Vehicles by brand',
      },
    },
  };
  return (
    <div >
      <Pie className=' w-[40vh]' data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
