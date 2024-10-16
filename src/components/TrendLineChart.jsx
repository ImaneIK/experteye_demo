import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const getChartData = (car) => {
  return {
    labels: car.versions.map((version) => version.name),
    datasets: [
      {
        label: `${car.make} ${car.model} ${car.year}`,
        data: car.versions.map((version) => version.price),
        borderColor: 'rgba(54, 162, 235, 1)', 
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
        fill: true,
      },
    ],
  };
};

export const VehiclePriceChart = ({ car }) => {
  return <Line data={getChartData(car)} />;
};
