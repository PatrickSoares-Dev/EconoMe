import React, { useState } from 'react';
import {
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonText
} from '@ionic/react';
import bankLogos from '../../components/Contas/bankLogos';
import { createConta } from '../../services/apiServices';
import { ToastComIcone } from '../../utilities/Utils'; // Corrigido o caminho para o arquivo correto

const CadastrarContas: React.FC = () => {
    const [nomeConta, setNomeConta] = useState('');
    const [saldo, setSaldo] = useState('0');
    const [instituicaoBancariaID, setInstituicaoBancariaID] = useState('');
    const [tipoConta, setTipoConta] = useState('');
    const [nomeContaValido, setNomeContaValido] = useState(true); // Estado de validação do nome da conta
    const [instituicaoBancariaIDValido, setInstituicaoBancariaIDValido] = useState(true); // Estado de validação do banco
    const [tipoContaValido, setTipoContaValido] = useState(true); // Estado de validação do tipo de conta

    const GerenciarToastComIcone = ToastComIcone();

    const handleSubmit = async () => {
        // Verificar todos os campos obrigatórios antes de enviar
        const isNomeContaValido = nomeConta.length >= 4;
        const isInstituicaoBancariaIDValido = !!instituicaoBancariaID;
        const isTipoContaValido = !!tipoConta;

        setNomeContaValido(isNomeContaValido);
        setInstituicaoBancariaIDValido(isInstituicaoBancariaIDValido);
        setTipoContaValido(isTipoContaValido);

        if (!isNomeContaValido || !isInstituicaoBancariaIDValido || !isTipoContaValido) {
            GerenciarToastComIcone('Por favor, preencha todos os campos obrigatórios.', 'Alert');
            return;
        }

        const novaConta = {
            nomeConta,
            saldo: parseFloat(saldo),
            InstituicaoBancariaID: parseInt(instituicaoBancariaID),
            tipoConta
        };

        try {
            const response = await createConta(novaConta);
            if (response.status === 201) {
                GerenciarToastComIcone('Conta criada com sucesso!', 'Success');
                // Limpar os campos após a criação
                setNomeConta('');
                setSaldo('0');
                setInstituicaoBancariaID('');
                setTipoConta('');
                // Resetar estados de validação
                setNomeContaValido(true);
                setInstituicaoBancariaIDValido(true);
                setTipoContaValido(true);

                // Atualizar a página após 3 segundos
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                GerenciarToastComIcone('Erro ao criar conta. Tente novamente mais tarde.', 'Error');
            }
        } catch (error) {
            console.error('Erro ao criar conta:', error);
            GerenciarToastComIcone('Erro ao criar conta. Verifique sua conexão e tente novamente.', 'Error');
        }
    };

    const handleNomeContaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeConta(e.target.value);
        setNomeContaValido(e.target.value.length >= 4); // Verificar se o nome da conta tem pelo menos 4 caracteres
    };

    const handleInstituicaoBancariaChange = (e: CustomEvent) => {
        const value = e.detail.value;
        setInstituicaoBancariaID(value);
        setInstituicaoBancariaIDValido(!!value); // Verificar se a instituição bancária foi selecionada
    };

    const handleTipoContaChange = (e: CustomEvent) => {
        const value = e.detail.value;
        setTipoConta(value);
        setTipoContaValido(!!value); // Verificar se o tipo de conta foi selecionado
    };

    return (
        <IonPage>
            <IonCard className='header-card' style={{marginBottom: '-35px'}}>
                <IonCardHeader>
                    <div className='header-content'>            
                        <IonCardSubtitle className='header-month'>Cadastrar</IonCardSubtitle>            
                    </div>
                    <IonCardTitle className='header-balance' style={{fontSize: '1.3rem' }}>Nova Conta</IonCardTitle>          
                </IonCardHeader>
            </IonCard>
            
            <IonCard className='sm ion-padding rounded-card-content' style={{ marginTop: '-25px' }}>
                <IonCardContent>
                    <div style={{ marginBottom: '10px' }}>
                        <IonLabel style={{ fontSize: '1rem', marginBottom: '8px' }}>Banco</IonLabel>
                        <IonSelect
                            value={instituicaoBancariaID}
                            onIonChange={handleInstituicaoBancariaChange}
                            interface="action-sheet"
                            placeholder="Selecione um banco"
                            style={{
                                borderRadius: '8px',
                                minWidth: '200px',
                                padding: '8px',
                                border: instituicaoBancariaIDValido ? '1px solid #e7e7e7' : '1px solid red'
                            }}
                        >
                            <IonSelectOption value="">Selecione um banco</IonSelectOption>
                            {Object.keys(bankLogos).map((key, index) => (
                                <IonSelectOption key={index} value={(index + 1).toString()}>
                                    {key}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                        {!instituicaoBancariaIDValido && (
                            <IonText color="danger">
                                <p>Por favor, selecione um banco.</p>
                            </IonText>
                        )}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <IonLabel style={{ fontSize: '1rem', marginBottom: '8px' }}>Tipo de Conta</IonLabel>
                        <IonSelect
                            value={tipoConta}
                            onIonChange={handleTipoContaChange}
                            interface="action-sheet"
                            placeholder="Selecione um tipo de conta"
                            style={{
                                borderRadius: '8px',
                                minWidth: '200px',
                                padding: '8px',
                                border: tipoContaValido ? '1px solid #e7e7e7' : '1px solid red'
                            }}
                        >
                            <IonSelectOption value="">Selecione um tipo de conta</IonSelectOption>
                            <IonSelectOption value="Conta Corrente">Conta Corrente</IonSelectOption>
                            <IonSelectOption value="Conta Poupança">Conta Poupança</IonSelectOption>
                            <IonSelectOption value="Conta Salário">Conta Salário</IonSelectOption>
                        </IonSelect>
                        {!tipoContaValido && (
                            <IonText color="danger">
                                <p>Por favor, selecione um tipo de conta.</p>
                            </IonText>
                        )}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <IonLabel style={{ fontSize: '1rem', marginBottom: '10px' }}>Nome da Conta</IonLabel>
                        <input
                            type="text"
                            value={nomeConta}
                            onChange={handleNomeContaChange}
                            style={{
                                borderRadius: '8px',
                                border: nomeContaValido ? '1px solid #e7e7e7' : '1px solid red',
                                padding: '15px',
                                width: '100%'
                            }}
                        />
                        {!nomeContaValido && (
                            <IonText color="danger">
                                <p>O nome da conta deve ter pelo menos 4 caracteres.</p>
                            </IonText>
                        )}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <IonLabel style={{ fontSize: '1rem', marginBottom: '8px', marginRight: '10px' }}>Saldo</IonLabel>
                        <input
                            type="number"
                            value={saldo}
                            onChange={(e) => setSaldo(e.target.value)}
                            style={{ borderRadius: '8px', border: '1px solid #e7e7e7', padding: '15px', width: '100%' }}
                        />
                    </div>
                    <div style={{paddingTop: '10px', paddingBottom: '15px'}}>
                        <IonButton expand="block" onClick={handleSubmit} disabled={!nomeContaValido || !instituicaoBancariaIDValido || !tipoContaValido}>Criar conta</IonButton>
                    </div> 
                </IonCardContent>
            </IonCard>   
        </IonPage>
    );
};

export default CadastrarContas;