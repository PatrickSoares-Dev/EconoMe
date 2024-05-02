import React from 'react';
import { IonAvatar, IonChip, IonCol, IonLabel, IonRow } from '@ionic/react';
import './Contas.css'; 
import '../../theme/variables.css'; 

function Contas() {
  return (
    <>
      <div className='border-div ion-padding-top'>
        <IonRow className="ion-align-items-center">
          <IonCol size="auto" className="ion-text-center">
              <div>
                <img alt=""
                className='rounded-image'
                style={{ width: 'auto', height: '40px' }} 
                src="https://seeklogo.com/images/I/Itau-logo-0BE09A6D22-seeklogo.com.png" />
              </div>
          </IonCol>
          <IonCol>
              <IonLabel className='label-full-width'>Itaú Unibanco /<span className='text-blue'>R$ 1.500,00</span></IonLabel>
          </IonCol>
        </IonRow>    
      </div>            
    </>
  );
}
export default Contas;