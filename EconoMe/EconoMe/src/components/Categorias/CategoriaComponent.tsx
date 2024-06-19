import React, { useEffect, useState } from 'react';
import categoriaCores from './categoriaCores';
import { getGastosPorCategoria } from '../../services/apiServices';
import PieChartComponent from '../Charts/PieChartComponent'; // Importando o componente de gráfico de pizza
import '../../theme/app.css'; // Importando o arquivo de estilização
import { ChartOptions } from 'chart.js'; // Importando ChartOptions
import { IonText } from '@ionic/react'; // Importando IonText

const CategoriaComponent: React.FC = () => {
  const [gastosPorCategoria, setGastosPorCategoria] = useState<any[]>([]);

  useEffect(() => {
    async function fetchGastosPorCategoria() {
      try {
        const data = await getGastosPorCategoria();
        if (data.success) {
          const sortedData = data.data.$values.sort((a: any, b: any) => b.totalGasto - a.totalGasto);
          setGastosPorCategoria(sortedData.slice(0, 4)); // Pegando no máximo 4 categorias
        } else {
          console.error('Erro ao buscar gastos por categoria:', data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar gastos por categoria:', error);
      }
    }

    fetchGastosPorCategoria();
  }, []);

  const pieData = {
    labels: gastosPorCategoria.map(gasto => gasto.categoria),
    datasets: [
      {
        data: gastosPorCategoria.map(gasto => gasto.totalGasto),
        backgroundColor: gastosPorCategoria.map(gasto => categoriaCores[gasto.categoria] || '#000'),
        hoverBackgroundColor: gastosPorCategoria.map(gasto => categoriaCores[gasto.categoria] || '#000')
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
        formatter: (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        color: 'white',
        font: {
          weight: 'bold',
        },
      },
    }
  };

  return (
    <div className="categoria-container">
      {gastosPorCategoria.length === 0 ? (
        <IonText color='medium'>Você não possui gastos por categoria.</IonText>
      ) : (
        <>
          <PieChartComponent data={pieData} options={pieOptions} />
          {gastosPorCategoria.map((gasto) => (
            <div key={gasto.categoria} className="categoria-item">
              <div className="categoria-nome" style={{ backgroundColor: `${categoriaCores[gasto.categoria] || '#000'}` }}>
                <strong>{gasto.categoria}</strong>
              </div>
              <div className="categoria-valor">
                {gasto.totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoriaComponent;