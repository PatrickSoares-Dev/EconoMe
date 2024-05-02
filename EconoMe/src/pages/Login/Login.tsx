// Dentro do seu componente Login
import React, { useState } from 'react';
import '../../theme/variables.css'
import { IonButton, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { loginUser } from '../../firebaseConfig';
import { Toast } from '../../utilities/Utils'; 
import { Link, useHistory } from 'react-router-dom';
import { setUserState } from '../../redux/action';
import { useDispatch } from 'react-redux';
import  logoImg from '../../img/EconoMe-Logo.png'

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

          GerenciarToast(message, "Error");

        }
      } catch (error) {
        GerenciarToast("Erro ao fazer login: " + error, "Error");        
      }

      setBusy(false);
    }

    return (
    <div>
      <IonPage>
      <IonHeader>
            <div className="ion-text-center" style={{ backgroundColor: "#F3F3F3", padding: '4px 0' }}>
                <Link to="/Bemvindo">
                  <IonImg src={logoImg} style={{ width: 'auto', height: '90px' }} />
                </Link>                
            </div>
        </IonHeader>
        <IonContent className="ion-padding custom-ion-content  ion-margin-top">
            <IonCardSubtitle className="ion-text-center ion-margin-bottom" color="primary">Bem-vindo novamente</IonCardSubtitle>
            <IonCardSubtitle className="ion-text-center ion-margin-top ion-padding-bottom">Acesse sua conta para começar a controlar a sua grana</IonCardSubtitle>
            
            <IonCard className="ion-margin-auto ion-padding-top">
                <IonLoading message="Processando dados ..." duration={0} isOpen={busy} />
                <IonCardContent>

                  <div className='ion-margin-bottom'>
                    <IonInput label="Email" 
                          className='custom-ion-input'  
                          labelPlacement="floating" 
                          fill="outline" 
                          placeholder="Insira o e-mail"
                          onIonChange={(e) => setEmail(e.detail.value!)} 
                      ></IonInput>
                  </div>

                  <div className='ion-margin-bottom'>
                      <IonInput label="Senha" 
                          type='password'
                          className='custom-ion-input'  
                          labelPlacement="floating" 
                          fill="outline" 
                          placeholder="Insira a senha"
                          onIonChange={(e) => setPassword(e.detail.value!)} 
                      ></IonInput>                        
                  </div>    

                  <div className='ion-margin-bottom'>
                    <p>
                        <Link to="/Esqueci">Esqueci minha senha </Link>
                    </p>
                  </div>

                  <div className='ion-margin ion-padding-top'>
                    <IonButton expand='block' onClick={login} className="btn">Continuar</IonButton>
                  </div>                 
                  
                </IonCardContent>
            </IonCard>          
            
        </IonContent>
        <IonFooter className="ion-text-center ion-padding">
            <p>
                Não tem uma conta? <Link to="/Registro">Criar</Link>
            </p>
        </IonFooter>
    </IonPage>   
    </div>                    
    );
};

export default Login;