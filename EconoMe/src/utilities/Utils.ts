import { useIonToast } from '@ionic/react';

export const Toast = () => {
  const [present] = useIonToast();

  const GerenciarToast = (mensagem: string, tipo: 'Success' | 'Error' | 'Alert', duracao: number = 8000) => {
    let cssClass = '';
    switch (tipo) {
      case 'Success':
        cssClass = 'toast-success';
        break;
      case 'Error':
        cssClass = 'toast-danger';
        break;
      case 'Alert':
        cssClass = 'toast-alert';
        break;
      default:
        cssClass = ''; 
    }

    present({
      message: mensagem,
      duration: duracao,
      position: 'top',
      cssClass: cssClass, 
    });
  };

  return GerenciarToast;
};