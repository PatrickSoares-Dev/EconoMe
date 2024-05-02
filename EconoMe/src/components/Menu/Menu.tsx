import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { menuController } from '@ionic/core';
import { menuOutline } from 'ionicons/icons';

import './Menu.css';

function Menu() {

  return (
    <>
      <IonMenu contentId="main-content" id="main-menu">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
    </>
  );
}
export default Menu;