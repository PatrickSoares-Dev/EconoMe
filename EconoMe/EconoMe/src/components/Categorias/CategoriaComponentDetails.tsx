import React, { useEffect, useState } from 'react';
import categoriaCores from './categoriaCores';
import { IonGrid, IonRow, IonCol } from '@ionic/react'; // Importando o componente

interface Props {
    gastos: any[]; // Defina o tipo de gastos como array de any
    gastoTotal: number; // Defina o tipo de gastoTotal como number
}

const CategoriaComponentDetails: React.FC<Props> = ({ gastos, gastoTotal }) => {
    const [gastosPorCategoria, setGastosPorCategoria] = useState<any[]>([]);

    useEffect(() => {
        setGastosPorCategoria(gastos);
    }, [gastos]);

    return (
        <div className="categoria-lista">
            <IonGrid style={{ borderRadius: '12px', boxShadow: '0 2px 6px 0 rgb(0, 0, 0, 0.25)' }} className='ion-margin-top'>
                <IonRow className="ion-align-items-center">
                    <IonCol size="6">
                        <h4 style={{ margin: '0', fontWeight: 'normal' }}>Gasto Total</h4>
                    </IonCol>
                    <IonCol size="6" className="ion-text-end">
                        <h4 style={{ margin: '0', fontWeight: 'bold', fontSize: '1.1rem' }}>R$ {gastoTotal.toFixed(2)}</h4>
                    </IonCol>
                </IonRow>
            </IonGrid>
            {gastosPorCategoria.map((gasto) => (
                <div key={gasto.categoria} className="categoria-item">                    
                    <div className="categoria-nome" style={{ backgroundColor: `${categoriaCores[gasto.categoria] || '#000'}` }}>
                        <strong style={{ fontSize: '0.8rem' }}>{gasto.categoria}</strong>
                    </div>
                    <div className="categoria-valor">
                        {gasto.totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoriaComponentDetails;
