// src/components/Charts/PieChartComponent.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  data: any;
  options: ChartOptions<'pie'>;
}

const PieChartComponent: React.FC<PieChartProps> = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default PieChartComponent;