import { IonButton, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../../theme/variables.css'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Toast } from '../../utilities/Utils'; 
import { registerUser } from '../../firebaseConfig';
import logoImg from '../../img/EconoMe-Logo.png';

const Register: React.FC = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState(''); // Novo estado para CPF
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    const [cSenha, setCPassword] = useState('');
    const GerenciarToast = Toast(); 
    const history = useHistory();
    const [busy, setBusy] = useState<boolean>(false);

    async function register() {
        if (senha !== cSenha) {
            return GerenciarToast('As senhas não coincidem', "Error");
        }

        if (email.trim() === '' || senha.trim() === '') {
            return GerenciarToast('Email e senha não pode ser vazio', "Error");
        }
        
        setBusy(true);
        const { success, message } = await registerUser(email ?? '', senha ?? '', nome ?? '', cpf ?? '');
        if (success) {
            GerenciarToast(message, "Success");
            setTimeout(() => {
                history.replace('/Login');
            }, 3000); 
        } else {
            GerenciarToast(message, "Error"); 
        }
        setBusy(false);
    }

    return (
        <IonPage>                                    
            <IonContent className="ion-padding custom-ion-content">

                <div className="ion-text-center" style={{ backgroundColor: "#F3F3F3", padding: '5px 0' }}>
                    <Link to="/Bemvindo">
                        <IonImg src={logoImg} style={{ width: 'auto', height: '90px' }} />
                    </Link>            

                    <IonCardSubtitle className="ion-text-center ion-margin-bottom" color="primary">Criar conta</IonCardSubtitle>    
                    
                </div>                
                <IonCard className="ion-margin-auto rounded-card-content">
                    <IonLoading message="Processando dados ..." duration={0} isOpen={busy} />
                    <IonCardContent>
                        <div className='border-div ion-margin-bottom'>
                            <IonInput label="Nome Completo" 
                                className='custom-input'                     
                                labelPlacement="floating" 
                                fill="outline" 
                                placeholder="Nome Completo"
                                onIonChange={(e) => setNome(e.detail.value!)} 
                            ></IonInput>
                        </div>
                        <div className='border-div ion-margin-bottom'>
                            <IonInput label="Email"   
                                className='custom-input'                       
                                labelPlacement="floating" 
                                fill="outline"
                                placeholder="E-mail"
                                onIonChange={(e) => setEmail(e.detail.value!)} 
                            ></IonInput>
                        </div>      
                        <div className='border-div ion-margin-bottom'>
                            <IonInput label="CPF" 
                                className='custom-input'                     
                                labelPlacement="floating" 
                                fill="outline" 
                                placeholder="CPF"
                                onIonChange={(e) => setCpf(e.detail.value!)} // Usar estado separado para CPF
                            ></IonInput>
                        </div>              
                        <div className='border-div ion-margin-bottom'>
                            <IonInput label="Senha"    
                                type='password'
                                className='custom-input'                      
                                labelPlacement="floating" 
                                fill="outline" 
                                placeholder="Senha"
                                onIonChange={(e) => setPassword(e.detail.value!)} 
                            ></IonInput>
                        </div>
                        <div className='border-div ion-margin-bottom'>
                            <IonInput label="Confirmar Senha"   
                                type='password'
                                className='custom-input'                       
                                labelPlacement="floating" 
                                fill="outline" 
                                placeholder="Confirme sua senha"
                                onIonChange={(e) => setCPassword(e.detail.value!)} 
                            ></IonInput>
                        </div>
                    </IonCardContent>
                </IonCard>  
                <div className='ion-margin'>
                    <IonButton expand='block' onClick={register} className="btn">Registrar</IonButton>
                </div>     
                              
            </IonContent>
            
            <IonFooter className="ion-text-center ion-padding">
                <div className='ion-margin' style={{textAlign: "center"}}>
                    <p>
                        Já tem uma conta? <Link to="/Login">Entrar</Link>
                    </p>
                </div>   
            </IonFooter>           
            
        </IonPage>      
    );
};

export default Register;