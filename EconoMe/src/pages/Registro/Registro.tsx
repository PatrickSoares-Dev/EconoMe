import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toast } from '../../utilities/Utils'; 
import { registerUser }  from '../../firebaseConfig';


const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [senha, setPassword] = useState('')
    const [cSenha, setCPassword] = useState('')
    const GerenciarToast = Toast(); 
    const [busy, setBusy] = useState<boolean>(false)

    async function register(){

        if(senha !== cSenha){
          return GerenciarToast('As senhas não coincidem')
        }

        if (email.trim() === '' || senha.trim() === ''){
          return GerenciarToast('Email e senha não pode ser vazio')
        }
        
        setBusy(true)
        const { success, message } = await registerUser(email ?? '', senha ?? '');
        if (success) {
          GerenciarToast(message);               
        } else {
          GerenciarToast(message); 
        }
        setBusy(false)
        
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

        <IonHeader collapse="condense">

          <IonToolbar>
            <IonTitle size="small">Registro</IonTitle>            
          </IonToolbar>
          
        </IonHeader>
        
        <IonInput 
          type='email'
          placeholder='Email' 
          onIonChange={ (e: any) => setEmail(e.target.value)} 
        />

        <IonInput 
          type='password'
          placeholder='Senha' 
          onIonChange={ (e: any) => setPassword(e.target.value)}
        />

        <IonInput 
          type='password'
          placeholder='Confirmar Senha' 
          onIonChange={ (e: any) => setCPassword(e.target.value)}
        />

        <IonButton expand='full' onClick={register}>Registrar</IonButton>

        <p>
          Já tem uma conta? <Link to="/Login">Entrar</Link>
        </p>

      </IonContent>
    </IonPage>
  );
};

export default Login;
