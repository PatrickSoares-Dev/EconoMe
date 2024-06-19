// src/components/Charts/BarChart.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

interface BarChartProps {
  entradas: number[];
  saidas: number[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ entradas, saidas, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Entradas',
        data: entradas,
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Saídas',
        data: saidas,
        backgroundColor: '#F44336',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false, // Remover o título
      },
      datalabels: {
        anchor: 'end' as const,
        align: 'end' as const,
        formatter: (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), // Formatar como moeda
        color: 'black',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return <Bar data={data}  />;
};

export default BarChart;