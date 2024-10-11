"use client";

import { IUser } from "@/lib/database/models/user.model";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({user}: {user: IUser}) => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Hours Worked',
        data: [5, 8, 7, 6, 9, 4, 3],
        backgroundColor: 'rgba(164, 24, 24, 0.7)', 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'black' 
        }
      },
      title: {
        display: true,
        text: 'Hours Worked Over the Week',
        color: 'black' 
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black', 
        },
      },
      y: {
        ticks: {
          color: 'black', 
        },
      }
    }
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
