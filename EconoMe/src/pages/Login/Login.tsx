// Dentro do seu componente Login
import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { loginUser } from '../../firebaseConfig';
import { Toast } from '../../utilities/Utils'; 
import { Link, useHistory } from 'react-router-dom';
import { setUserState } from '../../redux/action';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory();
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    const GerenciarToast = Toast(); 
    

    async function login() {
      setBusy(true);
      try {
        const { success, message, data } = await loginUser(email ?? '', senha ?? '');
        if (success && data) {          
          const userEmail = data.user?.email;                       
            dispatch(setUserState(userEmail));
            history.replace('/')            
          
        } else {

          GerenciarToast(message);

        }
      } catch (error) {
        GerenciarToast("Erro ao fazer login: " + error);        
      }

      setBusy(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="Processando dados ..." duration={0} isOpen={busy} />

            <IonContent fullscreen className='ion-padding'>
                <IonInput type='email' placeholder='Email' onIonChange={(e) => setEmail(e.detail.value!)} />
                <IonInput type='password' placeholder='Senha' onIonChange={(e) => setPassword(e.detail.value!)} />
                <IonButton expand='full' onClick={login}>Continuar</IonButton>

                <p>
                  Não tem uma conta? <Link to="/Registro">Criar</Link>
                </p>

            </IonContent>
        </IonPage>
    );
};

export default Login;