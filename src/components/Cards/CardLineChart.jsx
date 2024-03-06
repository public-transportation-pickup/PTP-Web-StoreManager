import React from 'react';
import { Line } from 'react-chartjs-2';


function CardLineChart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        yAxisID: 'y-axis-1',
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        yAxisID: 'y-axis-2',
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
}
export default CardLineChart;
