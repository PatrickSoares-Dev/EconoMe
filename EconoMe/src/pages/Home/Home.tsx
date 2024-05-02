import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../firebaseConfig';
import { useHistory } from 'react-router';
import { useState } from 'react';


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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Página Inicial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Página Inicial</IonTitle>            
          </IonToolbar>          
        </IonHeader>        
            <p>Olá {email} </p>
            
          <IonButton routerLink='/Login'>Login</IonButton>
          <IonButton routerLink='/Registro' color="secondary">Registro</IonButton>
          <IonButton onClick={logout} color='danger'>Deslogar</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;
