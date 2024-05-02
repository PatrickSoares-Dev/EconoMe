import { useIonToast } from '@ionic/react';

export const Toast = () => {
  const [present] = useIonToast();

  const GerenciarToast = (mensagem: string, duracao: number = 5000) => {
    present({
      message: mensagem,
      duration: duracao,
      position: 'top',
    });
  };

  return GerenciarToast;
};