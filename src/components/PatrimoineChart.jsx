import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const PatrimoineChart = ({ dates, valeurs }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Valeur du Patrimoine',
        data: valeurs,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default PatrimoineChart;
