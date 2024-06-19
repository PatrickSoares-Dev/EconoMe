import React, { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonContent, IonPage, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import Contas from '../../components/Contas/Contas';
import { getContas, getEntradasSaidas } from '../../services/apiServices';
import Header from '../../components/Header/Header';
import { logoutUser } from '../../firebaseConfig';
import '../../theme/app.css';
import BarChart from '../../components/Charts/BarChart';
import CategoriaComponent from '../../components/Categorias/CategoriaComponent';

const Home: React.FC = () => {
  const email = localStorage.getItem('userEmail');
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  const [contas, setContas] = useState<any[]>([]);
  const [entradas, setEntradas] = useState<number[]>([]);
  const [saidas, setSaidas] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>(['Entradas', 'Saídas']);

  useEffect(() => {
    async function fetchContas() {
      setBusy(true);
      try {
        const data = await getContas();
        if (data.status === 200) {
          setContas(data.data.$values);
        } else {
          console.error('Erro ao buscar contas:', data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar contas:', error);
      }
      setBusy(false);
    }

    async function fetchEntradasSaidas() {
      try {
        const data = await getEntradasSaidas();
        if (data.status === 200) {
          setEntradas([data.data.totalEntradas]);
          setSaidas([data.data.totalSaidas]);
        } else {
          console.error('Erro ao buscar entradas e saídas:', data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar entradas e saídas:', error);
      }
    }

  
    fetchContas();
    fetchEntradasSaidas();
  }, []);  

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header month="Junho" />
        
        <IonCard className='sm ion-padding rounded-card-content' style={{marginTop: '-20px'}}>
          <IonText className='ion-padding-bottom' color='medium'>
            <h5>Contas</h5>
          </IonText> 
          {contas.length === 0 ? (
            <div className='ion-padding'>
              <IonText color='medium'>Você não possui contas.</IonText>
              <div className='ion-margin'>
                <IonButton expand='block' onClick={() => history.push('/cadastrar-contas')}>Cadastrar Conta</IonButton>
              </div>
            </div>
          ) : (
            <>
              {contas.slice(0, 4).map((conta) => (
                <Contas key={conta.contaID} conta={conta} />
              ))}
              {contas.length > 1 && (
                <div className='ion-margin ion-padding-top'>
                  <IonButton expand='block' onClick={() => history.push('/gerenciar-contas')}>Gerenciar Contas</IonButton>
                </div>
              )}
            </>
          )}
        </IonCard>

        <div className='ion-margin ion-padding-top'>
          <IonText className='ion-padding-bottom' color='medium'>Entradas e Saídas</IonText> 
        </div>
        
        <IonCard className='sm ion-padding rounded-card-content' onClick={() => history.push('/transacoes-conta-all')}>
          {entradas.length === 0 && saidas.length === 0 ? (
            <IonCardContent>
              <IonText color='medium'>Você não possui entradas e saídas.</IonText>
            </IonCardContent>
          ) : (
            <IonCardContent>
              <BarChart entradas={entradas} saidas={saidas} labels={labels} />
            </IonCardContent>
          )}
        </IonCard>

        <div className='ion-margin ion-padding-top'>
          <IonText className='ion-padding-bottom' color='medium'>Despesas por categoria</IonText> 
        </div>
        
        <IonCard className='sm ion-padding rounded-card-content'>
          <CategoriaComponent />
          <div className='ion-margin'>
            <IonButton expand='block' onClick={() => history.push('/gastos-por-categoria')}>Visualizar Gastos</IonButton>
          </div>
        </IonCard>
                  
      </IonContent>      
    </IonPage>
  );
};

export default Home;