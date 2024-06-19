import React from 'react';
import { IonCol, IonLabel, IonRow } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import bankLogos from './bankLogos'; // Importar o objeto de mapeamento
import './Contas.css'; // Importar o arquivo de estilos

interface ContasProps {
  conta: {
    contaID: number;
    nomeConta: string;
    nomeInstituicaoBancaria: string;
    saldo: number;
    dataCriacao: string; // Adicionar data de criação
  };
}

const Contas: React.FC<ContasProps> = ({ conta }) => {
  const history = useHistory();
  const logoUrl = bankLogos[conta.nomeInstituicaoBancaria]?.logo || '/img/Bank/default-logo.png';

  // Determinar a classe de estilo para o saldo baseado no valor
  const saldoClasse = conta.saldo < 0 ? 'saldo-negativo' : '';

  const handleClick = () => {
    history.push(`/transacoes-conta/${conta.contaID}`, { conta });
  };

  return (
    <div className={`border-div ion-padding-top ${saldoClasse}`} onClick={handleClick}>
      <IonRow className="ion-align-items-center">
        <IonCol size="auto" className="ion-text-center">
          <div>
            <img
              alt={conta.nomeInstituicaoBancaria}
              className='rounded-image'
              style={{ width: 'auto', height: '40px' }}
              src={logoUrl}
            />
          </div>
        </IonCol>
        <IonCol>
          <IonLabel className='label-full-width'>
            <span className='nome-instituicao'>{conta.nomeInstituicaoBancaria}</span>
            <span className='divisor'> | </span>
            <span className={saldoClasse}>R$ {conta.saldo.toFixed(2)}</span>
          </IonLabel>
        </IonCol>
      </IonRow>
    </div>
  );
}

export default Contas;