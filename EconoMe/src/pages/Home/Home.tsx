import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../firebaseConfig';
import { useHistory } from 'react-router';
import { useState } from 'react';
import Contas from '../../components/Contas/Contas';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';


const Home: React.FC = () => {

const email = useSelector((state: any) => state.user.email)
const history = useHistory()
const [busy, setBusy] = useState(false)

async function logout(){
  setBusy(false)
  logoutUser()
  setBusy(true)
  history.replace('/Login')
}

  return (    
    <IonPage>      
      <div>
        <IonHeader className='bg-green text-light ion-text-center'>

          <div className='ion-padding-top' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IonIcon icon={chevronBackOutline} style={{ marginRight: '20px', cursor: 'pointer' }} />
            <IonCardSubtitle className='text-light-medium'>Maio</IonCardSubtitle>
            <IonIcon icon={chevronForwardOutline} style={{ marginLeft: '20px', cursor: 'pointer' }} />
          </div>

          <h1 className='text-light-bold'>R$ 4.500,00</h1>
          <IonCardSubtitle 
          className='text-light-medium ion-padding-bottom'>Saldo total em contas</IonCardSubtitle>

        </IonHeader>
      </div>       
      
      <IonContent fullscreen class=''>
          <IonCard className='sm'>
            <IonCardContent>
              <h2 className='ion-padding-bottom'>Contas</h2>

              <Contas />
              <Contas />
              <Contas />

              <div className='ion-margin ion-padding-top'>
                    <IonButton expand='block' className="btn">Gerenciar Contas</IonButton>
              </div>  
            </IonCardContent>                        
          </IonCard>
          
          

          <div className='ion-padding'>
            <p>Olá {email} </p>
            
            {/* <IonButton routerLink='/Login'>Login</IonButton>
            <IonButton routerLink='/Registro' color="secondary">Registro</IonButton> */}
            <IonButton onClick={logout} color='danger'>Deslogar</IonButton>
          </div> 
         
      </IonContent>      
    </IonPage>
    
  );
};

export default Home;
