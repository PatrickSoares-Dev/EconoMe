import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCardSubtitle
} from '@ionic/react';
import { getEntradasSaidas, getContas } from '../../services/apiServices';
import Contas from '../../components/Contas/Contas'; // Importar o componente Contas
import bankLogos from '../../components/Contas/bankLogos'; // Importar o objeto de mapeamento
import { useHistory } from 'react-router';

const GerenciarContas: React.FC = () => {
  const [totalEntradas, setTotalEntradas] = useState<number>(0);
  const [totalSaidas, setTotalSaidas] = useState<number>(0);
  const [contas, setContas] = useState<any[]>([]); // Definir o tipo das contas como array de any
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar as entradas e saídas
        const entradasSaidasResponse = await getEntradasSaidas();
        if (entradasSaidasResponse.status === 200) {
          const { totalEntradas, totalSaidas } = entradasSaidasResponse.data;
          setTotalEntradas(totalEntradas);
          setTotalSaidas(totalSaidas);
        } else {
          console.error('Erro ao buscar entradas e saídas:', entradasSaidasResponse.message);
        }

        // Buscar as contas
        const contasResponse = await getContas();
        if (contasResponse.status === 200) {
          const contasData = contasResponse.data.$values; // Definir o tipo de contasData como array de any
          setContas(contasData);
        } else {
          console.error('Erro ao buscar contas:', contasResponse.message);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <IonPage>
    <IonHeader className='bg-green' style={{ padding: '20px', textAlign: 'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
        <IonCardSubtitle style={{ color: 'white', margin: '0', fontWeight: 'medium', fontSize: '1rem' }}>Saldo atual</IonCardSubtitle>
                                   
        <div className='ion-padding'>
            <h2 style={{ color: 'white', margin: '0', textAlign: 'center', fontWeight: 'bold', fontSize: '1.9rem' }}>R$ {calcularSaldoTotal(contas).toFixed(2)}</h2>            
        </div>
        
                    
    </IonHeader>
      
      <IonContent fullscreen>
        <IonCard className="ion-padding rounded-card-content">
          <IonCardContent onClick={() => history.push('/transacoes-conta-all')}>            
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'green', margin: '0', textAlign: 'center', fontWeight: 'normal', fontSize: '1rem' }}>Entradas</h3>
                    <p style={{ color: 'black', marginTop: '5px', textAlign: 'center', fontWeight: 'normal', fontSize: '1.3rem' }} >R$ {totalEntradas.toFixed(2)}</p>
                  </div>
                </IonCol>
                <IonCol>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'red', margin: '0', textAlign: 'center', fontWeight: 'normal', fontSize: '1rem' }}>Saídas</h3>
                    <p style={{ color: 'black', marginTop: '5px', textAlign: 'center', fontWeight: 'normal', fontSize: '1.3rem' }} >R$ {totalSaidas.toFixed(2)}</p>                    
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard className="ion-padding rounded-card-content">
          
            <IonText color="medium">
              <h6>Lista de Contas</h6>
            </IonText>
            {contas.map((conta: any) => (
              <Contas key={conta.contaID} conta={conta} />
            ))}
          
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

// Função para calcular o saldo total somando os saldos de todas as contas
const calcularSaldoTotal = (contas: any[]) => {
  return contas.reduce((acc, curr) => acc + curr.saldo, 0);
};

export default GerenciarContas;
