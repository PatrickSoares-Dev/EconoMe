import React from 'react';
import { IonContent, IonList, IonItem, IonLabel, IonButton, IonCard, IonIcon, IonFooter, IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { logoutUser } from '../../firebaseConfig';
import { home, barChart, wallet, trendingUp, trendingDown, list, addCircle, statsChart } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import logoImg from '../../img/EconoMe-Logo.png';

const MenuComponent: React.FC = () => {
  const history = useHistory();
  const userName = localStorage.getItem('userName') || 'Usuário'; // Supondo que o nome do usuário está armazenado no localStorage

  const handleLogout = async () => {
    await logoutUser();
    history.replace('/login');
  };

  return (
    <>
      <IonContent>
        <div className="ion-text-center" style={{ backgroundColor: "#F3F3F3", padding: '5px 0' }}>
            <Link to="/home">
                <IonImg src={logoImg} style={{ width: 'auto', height: '90px' }} />
            </Link>                                    
        </div>     

        <IonCard style={{borderRadius: '12px'}}>            
          <IonList>
            <IonItem button onClick={() => history.push('/home')}>
              <IonIcon slot="start" icon={home} />
              Home
            </IonItem>
            <IonItem button onClick={() => history.push('/gastos-por-categoria')}>
              <IonIcon slot="start" icon={barChart} />
              Gastos por Categoria
            </IonItem>
            <IonItem button onClick={() => history.push('/transacoes-conta-all')}>
              <IonIcon slot="start" icon={statsChart} />
              Transações
            </IonItem>
            <IonItem button onClick={() => history.push('/gerenciar-contas')}>
              <IonIcon slot="start" icon={wallet} />
              Gerenciar Contas
            </IonItem>
            <IonItem button onClick={() => history.push('/cadastrar-entradas')}>
              <IonIcon slot="start" icon={trendingUp} />
              Cadastrar Entradas
            </IonItem>
            <IonItem button onClick={() => history.push('/cadastrar-despesas')}>
              <IonIcon slot="start" icon={trendingDown} />
              Cadastrar Despesas
            </IonItem>
            <IonItem button onClick={() => history.push('/cadastrar-contas')}>
              <IonIcon slot="start" icon={addCircle} />
              Cadastrar Contas
            </IonItem>
          </IonList>
        </IonCard>  
      </IonContent>

      <IonFooter>
        <IonButton expand="block" color="danger" onClick={handleLogout} style={{ margin: '20px' }}>
          Deslogar
        </IonButton>
      </IonFooter>
    </>
  );
};

export default MenuComponent;