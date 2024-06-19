import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonCard, IonCardSubtitle, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonModal, IonDatetime, IonDatetimeButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../theme/variables.css';
import '../../theme/Entradas/Entradas.css';
import { createTransacao, getContas, getCategorias } from '../../services/apiServices';
import { ToastComIcone } from '../../utilities/Utils'; // Importa a função de toast do utilitário

const CadastrarDespesa: React.FC = () => {
    const [valor, setValor] = useState('');
    const [data, setData] = useState<string>(new Date().toISOString().split('T')[0]);
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [descricaoTocada, setDescricaoTocada] = useState(false); // Novo estado para controlar se o campo de descrição foi tocado
    const [contas, setContas] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [showToast, setShowToast] = useState({ show: false, message: '', color: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para controlar a habilitação do botão
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para evitar múltiplas submissões

    const history = useHistory();
    const mostrarToastComIcone = ToastComIcone();

    useEffect(() => {
        async function fetchData() {
            try {
                const contasResponse = await getContas();
                setContas(contasResponse.data.$values);

                const categoriasResponse = await getCategorias();
                const categoriasDespesa = categoriasResponse.data.$values.filter((cat: any) => cat.tipo === 'Despesa');
                setCategorias(categoriasDespesa);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

        fetchData();
    }, []);

    // Função para formatar valor como moeda BRL
    const formatarValor = (valor: string) => {
        const valorNumerico = parseFloat(valor.replace(/[^0-9,-]+/g, '').replace(',', '.'));
        if (!isNaN(valorNumerico)) {
            return valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        return 'R$ 0,00';
    };

    const handleInputChange = (e: CustomEvent) => {
        const valorFormatado = formatarValor(e.detail.value as string);
        setValor(valorFormatado);
    };

    // Função para verificar se todos os campos obrigatórios estão preenchidos
    const verificarCamposObrigatorios = () => {
        if (valor && categoria && conta && descricao.length >= 4) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    // Atualiza o estado do botão sempre que os campos obrigatórios mudarem
    useEffect(() => {
        verificarCamposObrigatorios();
    }, [valor, categoria, conta, descricao]);

    // Função para salvar os dados
    const salvarDados = async () => {
        if (isSubmitting) return; // Evita múltiplas submissões
        setIsSubmitting(true);

        const valorNumerico = parseFloat(valor.replace(/[^0-9,-]+/g, '').replace(',', '.'));
        const transacaoDTO = {
            ContaID: parseInt(conta),
            CategoriaID: parseInt(categoria),
            Tipo: 'Despesa',
            Valor: valorNumerico,
            Descricao: descricao,
            DataTransacao: data
        };

        console.log('Enviando transação:', transacaoDTO);

        try {
            const response = await createTransacao(transacaoDTO);
            if (response.status === 201) {
                console.log('Transação criada com sucesso:', response.data);
                mostrarToastComIcone('Transação criada com sucesso!', 'Success');
                setTimeout(() => {
                    window.location.reload();
                    history.push('/');
                }, 3000); // Adiciona um atraso de 3 segundos antes de recarregar a página e redirecionar
            } else {
                console.error('Erro ao criar transação:', response.message);
                mostrarToastComIcone('Erro ao criar transação!', 'Error');
            }
        } catch (error) {
            console.error('Erro ao criar transação:', error);
            mostrarToastComIcone('Erro ao criar transação!', 'Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader className='bg-red' style={{ padding: '20px', textAlign: 'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                    <IonCardSubtitle style={{ color: 'white', margin: '0', fontWeight: 'bold', fontSize: '1.2rem' }}>Despesas</IonCardSubtitle>
                    <div style={{ textAlign: 'left', width: '100%', marginTop: '20px', marginBottom: '8px' }}>
                        <h6 style={{ color: 'white', margin: '0', fontWeight: 'normal', marginBottom: '8px' }}>Valor</h6>
                        <IonInput 
                            type="text" 
                            value={valor}
                            onIonChange={handleInputChange}
                            placeholder="R$ 0,00" 
                            style={{ 
                                color: 'white', 
                                background: 'transparent', 
                                borderBottom: '0.5px solid white', 
                                fontSize: '1.8rem', 
                                fontWeight: 'bold',
                                maxWidth: '250px',
                            }} 
                        />
                    </div>
                </IonHeader>
                <IonCard className='sm ion-padding rounded-card-content'>
                    <IonItem className="custom-item">
                        <IonLabel className="custom-label">Data</IonLabel>
                        <IonDatetimeButton datetime="datetime" className="custom-datetime-button"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime
                                id="datetime"
                                value={data}
                                onIonChange={e => setData(e.detail.value as string)}
                                className="custom-datetime"
                                presentation="date"
                            ></IonDatetime>
                        </IonModal>
                    </IonItem>
                    <IonItem className="custom-item">
                        <IonLabel className="custom-label">Categorias</IonLabel>
                        <IonSelect value={categoria} placeholder="Selecione uma" onIonChange={e => setCategoria(e.detail.value)} className="custom-select" interface="action-sheet">
                            {categorias.map((cat) => (
                                <IonSelectOption key={cat.categoriaID} value={cat.categoriaID}>{cat.nomeCategoria}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem className="custom-item">
                        <IonLabel className="custom-label">Contas</IonLabel>
                        <IonSelect value={conta} placeholder="Selecione uma" onIonChange={e => setConta(e.detail.value)} className="custom-select" interface="action-sheet">
                            {contas.map((conta) => (
                                <IonSelectOption key={conta.contaID} value={conta.contaID}>
                                    {conta.nomeInstituicaoBancaria} - {conta.nomeConta}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem className='custom-item'>
                        <IonLabel className="custom-label">Descrição</IonLabel>
                    </IonItem>
                    <IonItem className="custom-item ion-padding-bottom">                                                
                        <IonInput 
                            value={descricao} 
                            onIonChange={e => {
                                setDescricao(e.detail.value!);
                                setDescricaoTocada(true); // Marca o campo como tocado
                            }} 
                            className="custom-input ion-padding" 
                            placeholder='Descrição da despesa ...'
                        ></IonInput>
                    </IonItem>
                    {descricaoTocada && descricao.length < 4 && (
                        <IonText color="danger" className="ion-padding-start">
                            <p>A descrição deve ter pelo menos 4 caracteres.</p>
                        </IonText>
                    )}
                </IonCard>
                <div className='ion-margin ion-padding-top'>
                    <IonButton expand="block" onClick={salvarDados} disabled={isButtonDisabled || isSubmitting}>Salvar</IonButton>
                </div>
            </IonContent>
        </IonPage>   
    );
};

export default CadastrarDespesa;