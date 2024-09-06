// src/PatrimoineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function PatrimoineChart({ dates, valeurs }) {
    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Valeur du Patrimoine',
                data: valeurs,
                borderColor: 'rgba(75,192,192,50)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
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
                text: 'Évolution de la Valeur du Patrimoine',
            },
        },
    };

    return <Line data={data} options={options} />;
}
