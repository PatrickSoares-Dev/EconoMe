// Dentro do seu componente Login
import React, { useState } from 'react';
import '../../theme/variables.css'
import { IonButton, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../img/EconoMe-Logo.png'
import PorquinhoImg from '../../img/porquinho_dinheiro.png'

const Bemvindo: React.FC = () => {    
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
        <div className="ion-text-center" style={{ backgroundColor: "#F3F3F3", padding: '4px 0' }}>
                <IonImg src={PorquinhoImg} style={{ width: 'auto', height: '240px' }} />
        </div>
        <IonContent className="ion-padding custom-ion-content">

            <IonCardTitle className="ion-text-center ion-margin-bottom" 
            color="primary">Todas as suas contas em um só lugar.</IonCardTitle>

            <div>
                <p className="ion-text-center ion-margin-top">
                    Gerencie sua vida financeira com facilidade e segurança
                </p>
            </div>
            
            <div className='ion-margin'>
                    <IonButton expand='block' href='/Login' className="btn">Entrar</IonButton>
            </div>
                                 
            
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

export default Bemvindo;