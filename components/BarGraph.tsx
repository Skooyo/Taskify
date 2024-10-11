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

  let hoursInfo: number[] = [];

  function getHoursInfo(){
    for(let i= 7; i>=1; i--){
      const hours = user.hoursLogged.reduce((a, b, index) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - i); // Adjust the date by 'i' days
        yesterday.setHours(0, 0, 0, 0);
        
        const workDate = new Date(user.dateOfWork[index]);
        workDate.setHours(0, 0, 0, 0);
        
        if (workDate.getTime() === yesterday.getTime()) {
          return a + b;
        }
        return a;
      }, 0);
      hoursInfo.push(hours); // Move this line inside the loop
    }
  } 

  getHoursInfo();

  const data = {
    labels: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-GB'); // 'en-GB' locale for DD/MM/YY format
    }),
    datasets: [
      {
        label: 'Hours Worked',
        data: hoursInfo,
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
