import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
const NormalDistributionGraph = ({ mean, stdDev, range, myMarks, myRank }) => {
  const data = {
    labels: range,
    datasets: [
      {
        label: 'Percentage of Students',
        data: range.map(x => (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)))) * 100),
        fill: false,
        borderColor: 'rgb(79 70 229)',
        tension: 0.1,
      },
      {
        label: 'Your Score',
        data: [{ x: myMarks, y: (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-(Math.pow(myMarks - mean, 2) / (2 * Math.pow(stdDev, 2)))) * 100 }],
        backgroundColor: '#d16d2c',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Marks',
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Percentage of Students',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Marks: ${context.raw.x}, Percentage: ${context.raw.y.toFixed(2)}%`;
          }
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default NormalDistributionGraph;
