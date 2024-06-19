import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonHeader,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
    IonContent
} from '@ionic/react';
import { useHistory } from 'react-router';
import { getGastosPorCategoria } from '../../services/apiServices';
import PieChartCustom from '../../components/Charts/PieChartCustom'; // Novo componente de gráfico de pizza
import CategoriaComponentDetails from '../../components/Categorias/CategoriaComponentDetails'; // Componente de lista de categorias
import categoriaCores from '../../components/Categorias/categoriaCores'; // Cores das categorias

const GastosPorCategoria: React.FC = () => {
    const history = useHistory();
    const [maiorGastoCategoria, setMaiorGastoCategoria] = useState<string>('');
    const [gastosPorCategoria, setGastosPorCategoria] = useState<any[]>([]);
    const [gastoMax, setGastoMax] = useState<number>(0);
    const [gastoTotal, setGastoTotal] = useState<number>(0);

    useEffect(() => {
        async function fetchGastosPorCategoria() {
            try {
                const response = await getGastosPorCategoria();
                if (response.success) {
                    const gastos: any[] = response.data.$values; // Defina o tipo de gastos como any[]
                    setGastosPorCategoria(gastos);

                    // Encontrar a categoria com maior valor gasto
                    let maxGasto = 0;
                    let categoriaMaxGasto = '';
                    gastos.forEach((item: any) => { // Defina o tipo de item como any
                        if (item.totalGasto > maxGasto) {
                            maxGasto = item.totalGasto;
                            categoriaMaxGasto = item.categoria;
                        }
                    });
                    setMaiorGastoCategoria(categoriaMaxGasto);

                    // Calcular o gasto total
                    const total = gastos.reduce((acc: number, curr: any) => acc + curr.totalGasto, 0); // Defina o tipo de acc e curr como any
                    setGastoMax(maxGasto);
                    setGastoTotal(total);
                } else {
                    console.error('Erro ao buscar gastos por categoria:', response.message);
                }
            } catch (error) {
                console.error('Erro ao buscar gastos por categoria:', error);
            }
        }

        fetchGastosPorCategoria();
    }, []);

    return (
        <IonPage>
            {gastosPorCategoria.length > 0 && (
                <IonHeader className='bg-green' style={{ padding: '20px', textAlign: 'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                    <IonCardSubtitle style={{ color: 'white', margin: '0', fontWeight: 'bold', fontSize: '1rem' }}>Maiores gastos por categoria</IonCardSubtitle>
                    <IonCardSubtitle style={{ color: 'white', marginTop: '15px', fontWeight: 'normal', fontSize: '1rem' }}>{maiorGastoCategoria}</IonCardSubtitle>
                    <div style={{ textAlign: 'center', width: '100%' }}>                    
                        <IonGrid style={{marginTop: '10px'}}>                  
                            <IonRow>                            
                                <IonCol size="12">
                                    <h2 style={{ color: 'white', margin: '0', fontWeight: 'bold' }}>R$ {gastoMax.toFixed(2)}</h2>
                                </IonCol>
                            </IonRow>                        
                        </IonGrid>                  
                    </div>
                </IonHeader>
            )}
            <IonContent fullscreen>
                <IonCard className="ion-padding rounded-card-content">
                    <IonCardContent>
                        {gastosPorCategoria.length === 0 ? (
                            <div className='ion-padding' style={{ textAlign: 'center' }}>
                                <IonText color="medium">
                                    <h2>Oops, você não tem nenhum gasto...</h2>
                                </IonText>
                            </div>
                        ) : (
                            <>
                                <IonText color="medium">
                                    <h4>Gasto por Categoria</h4>
                                </IonText>
                                <PieChartCustom gastos={gastosPorCategoria} gastoTotal={gastoTotal} />
                                <CategoriaComponentDetails gastos={gastosPorCategoria} gastoTotal={gastoTotal} />
                            </>
                        )}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default GastosPorCategoria;