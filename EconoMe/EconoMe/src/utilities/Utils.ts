import { useIonToast, IonicSafeString  } from '@ionic/react';

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

export const ToastComIcone = () => {
  const [present] = useIonToast();

  const GerenciarToastComIcone = (mensagem: string, tipo: 'Success' | 'Error' | 'Alert', duracao: number = 2000) => {
    let cssClass = 'toast-custom';
    let icone = '';

    switch (tipo) {
      case 'Success':
        icone = '✓';
        break;
      case 'Error':
        icone = '✗';
        break;
      case 'Alert':
        icone = '⚠️';
        break;
      default:
        icone = ''; 
    }

    const mensagemComIcone = `${icone} ${mensagem}`
   

    present({
      message: mensagemComIcone,
      duration: duracao,
      position: 'top',
      cssClass: cssClass,
      translucent: true,
    });
  };

  return GerenciarToastComIcone;
};
