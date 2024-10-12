"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

interface BurndownChartProps {
  totalStoryPoints: number;
  dates: string[]; 
  actualData: number[]; 
  sprintStatus: string; 
}

const BurndownChart: React.FC<BurndownChartProps> = ({ 
  totalStoryPoints, 
  dates, 
  actualData, 
  sprintStatus 
}) => {
  const idealBurndown = totalStoryPoints / dates.length;
  const idealData = Array.from({ length: dates.length }, (_, index) =>
    totalStoryPoints - idealBurndown * index
  );

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Ideal Burndown',
        data: idealData,
        borderColor: 'rgba(18, 116, 47, 1)',
        backgroundColor: 'rgba(18, 116, 47, 1)',
        fill: false,
      },
      ...(sprintStatus === "Active" || sprintStatus === "Completed"
        ? [
            {
              label: 'Actual Burndown',
              data: actualData,
              borderColor: 'rgba(222, 16, 16, 1)',
              backgroundColor: 'rgba(222, 16, 16, 1)',
              fill: false,
            },
          ]
        : []), // actual burndown chart only for Active or Completed sprints
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM dd',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Story Points Remaining',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BurndownChart;
