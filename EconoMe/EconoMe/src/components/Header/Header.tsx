import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { getContasDetalhadas } from '../../services/apiServices';
import '../../theme/app.css'; // Importando o arquivo CSS

interface HeaderProps {
  month: string;
}

const Header: React.FC<HeaderProps> = ({ month }) => {
  const [totalBalance, setTotalBalance] = useState<string>('R$ 0,00');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContasDetalhadas();
        const saldoTotal = response.data.saldoTotal;
        setTotalBalance(`R$ ${saldoTotal.toFixed(2)}`);
      } catch (error) {
        console.error('Erro ao buscar contas detalhadas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonCard className='header-card'>
      <IonCardHeader>
        <div className='header-content'>
          <IonIcon icon={chevronBackOutline} className='header-icon' />
          <IonCardSubtitle className='header-month'>{month}</IonCardSubtitle>
          <IonIcon icon={chevronForwardOutline} className='header-icon' />
        </div>
        <IonCardTitle className='header-balance' style={{fontSize: '1.8rem'}}>{totalBalance}</IonCardTitle>
        <IonCardSubtitle className='header-subtitle'>Saldo total em contas</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default Header;