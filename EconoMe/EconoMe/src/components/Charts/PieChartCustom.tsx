import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import categoriaCores from '../Categorias/categoriaCores';

interface Props {
    gastos: any[]; // Defina o tipo de gastos como array de any
    gastoTotal: number; // Defina o tipo de gastoTotal como number
}

const PieChartCustom: React.FC<Props> = ({ gastos, gastoTotal }) => {
    const pieData = {
        labels: gastos.map(gasto => gasto.categoria),
        datasets: [
            {
                data: gastos.map(gasto => gasto.totalGasto),
                backgroundColor: gastos.map(gasto => categoriaCores[gasto.categoria] || '#000'),
                hoverBackgroundColor: gastos.map(gasto => categoriaCores[gasto.categoria] || '#000')
            }
        ]
    };

    const pieOptions: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                enabled: true
            },
            datalabels: {
                anchor: 'center',
                align: 'center',
                formatter: (value: number) => {
                    const percentage = (value / gastoTotal) * 100;
                    return `${percentage.toFixed(2)}%`;
                },
                color: 'white',
                font: {
                    weight: 'bold',
                },
            },
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Pie data={pieData} options={pieOptions} />
        </div>
    );
};

export default PieChartCustom;
