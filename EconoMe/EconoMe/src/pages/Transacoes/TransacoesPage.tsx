import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonCardHeader,
  IonIcon,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
  IonFooter,
  IonButtons,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { getTransacoes, getTransacaoById, atualizarTransacao, excluirTransacao, getCategorias, getContas, getEntradasSaidas } from '../../services/apiServices'; // Implemente esta função no seu serviço de API
import '../../theme/Transacoes/Transacoes.css'; // Importando o CSS
import { ToastComIcone } from '../../utilities/Utils'; // Importando o ToastComIcone
import { trash, create, arrowUpCircle, arrowDownCircle } from 'ionicons/icons'; // Importando os ícones
import bankLogos from '../../components/Contas/bankLogos'; // Importando o mapeamento de logos e cores

interface Transacao {
  transacaoID: number;
  descricao: string;
  tipo: string;
  categoria: {
    nomeCategoria: string;
    categoriaID: number;
  };
  valor: number;
  dataTransacao: string;
  conta: {
    contaID: number;
    nomeConta: string;
    instituicaoBancariaID: number;
    saldo: number;
    dataCriacao: string;
    instituicaoBancaria: string;
    nomeInstituicaoBancaria: string;
  };
}

interface Categoria {
  categoriaID: number;
  nomeCategoria: string;
  tipo: string;
}

const TransacoesGenericPage: React.FC = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [selectedTransacao, setSelectedTransacao] = useState<Transacao | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | string>('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [contas, setContas] = useState<any[]>([]);
  const [totalEntradas, setTotalEntradas] = useState<number>(0);
  const [totalSaidas, setTotalSaidas] = useState<number>(0);
  const GerenciarToastComIcone = ToastComIcone();
  const modal = useRef<HTMLIonModalElement>(null);

  const fetchData = async () => {
    try {
      // Buscar as entradas e saídas
      const entradasSaidasResponse = await getEntradasSaidas();
      if (entradasSaidasResponse.status === 200) {
        const { totalEntradas, totalSaidas } = entradasSaidasResponse.data;
        setTotalEntradas(totalEntradas);
        setTotalSaidas(totalSaidas);
      } else {
        console.error('Erro ao buscar entradas e saídas:', entradasSaidasResponse.message);
      }

      // Buscar as transações
      const transacoesResponse = await getTransacoes();
      if (transacoesResponse.status === 200) {
        setTransacoes(transacoesResponse.data.$values);
      } else {
        console.error('Erro ao buscar transações:', transacoesResponse.message);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const categoriasResponse = await getCategorias();
        if (categoriasResponse.status === 200) {
          setCategorias(categoriasResponse.data.$values);
        } else {
          console.error('Erro ao buscar categorias:', categoriasResponse.message);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }

    fetchCategorias();
  }, []);

  const openModal = async (transacaoID: number) => {
    try {
      const transacaoResponse = await getTransacaoById(transacaoID);
      if (transacaoResponse.status === 200) {
        setSelectedTransacao(transacaoResponse.data);
        setDescricao(transacaoResponse.data.descricao);
        setValor(transacaoResponse.data.valor);
        setCategoria(transacaoResponse.data.categoria.nomeCategoria);
        setIsModalOpen(true);
      } else {
        console.error('Erro ao buscar transação:', transacaoResponse.message);
      }
    } catch (error) {
      console.error('Erro ao buscar transação:', error);
    }
  };

  const closeModal = () => {
    setSelectedTransacao(null);
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleSalvarEdicao = async () => {
    if (selectedTransacao) {
      try {
        const categoriaSelecionada = categorias.find(cat => cat.nomeCategoria === categoria);
        const updatedTransacao = {
          ...selectedTransacao,
          descricao,
          valor: Number(valor),
          categoria: {
            ...selectedTransacao.categoria,
            categoriaID: categoriaSelecionada ? categoriaSelecionada.categoriaID : selectedTransacao.categoria.categoriaID,
            nomeCategoria: categoriaSelecionada ? categoriaSelecionada.nomeCategoria : selectedTransacao.categoria.nomeCategoria
          }
        };
        await atualizarTransacao(updatedTransacao);
        GerenciarToastComIcone('Transação atualizada com sucesso!', 'Success');
        setTransacoes(transacoes.map(t => t.transacaoID === selectedTransacao.transacaoID ? updatedTransacao : t));
        closeModal();
      } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        GerenciarToastComIcone('Erro ao atualizar transação!', 'Error');
      }
    }
  };

  const handleExcluirTransacao = async (transacaoID: number) => {
    try {
      await excluirTransacao(transacaoID);
      GerenciarToastComIcone('Transação excluída com sucesso!', 'Success');
      setTransacoes(transacoes.filter(t => t.transacaoID !== transacaoID));
      closeModal();
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      GerenciarToastComIcone('Erro ao excluir transação!', 'Error');
    }
  };

  const getInstituicaoBancariaCor = (nomeInstituicaoBancaria: string) => {
    return bankLogos[nomeInstituicaoBancaria]?.color || 'black';
  };

  return (
    <IonPage>      
      <IonContent fullscreen>
        <IonCard className='header-card'>
          <IonCardHeader>
            <div className='header-content'>            
              <IonCardSubtitle className='header-month'>Transações</IonCardSubtitle>            
            </div>
            <IonCardTitle className='header-balance' style={{fontSize: '1.8rem', paddingBottom: '15px'}}>Balanço mensal</IonCardTitle>          
          </IonCardHeader>
        </IonCard>
        <IonCard className="ion-padding rounded-card-content" style={{marginTop: '-25px'}}>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6" style={{ textAlign: 'center' }}>
                  <IonIcon icon={arrowDownCircle} style={{ fontSize: '2rem', color: 'green' }} />
                  <IonLabel>
                    <h4 style={{fontSize: '1rem', fontWeight: 'normal'}}>Entradas</h4>
                    <p style={{fontSize: '1.2rem', color: 'green'}}>R$ {totalEntradas.toFixed(2)}</p>
                  </IonLabel>
                </IonCol>
                <IonCol size="6" style={{ textAlign: 'center' }}>
                  <IonIcon icon={arrowUpCircle} style={{ fontSize: '2rem', color: 'red' }} />
                  <IonLabel>
                    <h4 style={{fontSize: '1rem', fontWeight: 'normal'}}>Despesas</h4>
                    <p style={{fontSize: '1.2rem', color: 'red'}}>R$ {totalSaidas.toFixed(2)}</p>
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard className="ion-padding rounded-card-content">
          <IonCardContent className='ion-padding-left' style={{ borderBottom: '1px solid #f6f6f6', textAlign: 'center' }}>
            <IonLabel>
              <h4>Transações</h4>
            </IonLabel>           
          </IonCardContent>
          <IonList style={{ borderBottom: '1px solid #f6f6f6' }}>
              {transacoes.length > 0 ? (
                transacoes.map(transacao => (
                  <IonItem 
                    key={transacao.transacaoID} 
                    className={`transacao-item ${transacao.tipo === 'Entrada' ? 'transacao-entrada' : 'transacao-saida'}`} 
                    button 
                    onClick={() => openModal(transacao.transacaoID)}
                    style={{ borderBottom: `2.5px solid ${getInstituicaoBancariaCor(transacao.conta.nomeInstituicaoBancaria)}`, borderRadius: '12px' }}
                  >
                    <IonGrid>
                      <IonRow>
                        <IonCol size="6">
                          <IonLabel>
                            <h6>{transacao.descricao || "Descrição não disponível"}</h6>
                            <p>{transacao.categoria?.nomeCategoria || "Categoria não especificada"}</p>
                          </IonLabel>
                        </IonCol>
                        <IonCol size="6">
                          <IonLabel className="ion-text-right">
                            <p style={{ color: transacao.tipo === 'Entrada' ? 'green' : 'red' }}>R$ {transacao.valor.toFixed(2)}</p>
                            <p>{transacao.conta.nomeInstituicaoBancaria}</p>
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                ))
              ) : (
                <IonItem>
                  <IonLabel>Nenhuma transação encontrada.</IonLabel>
                </IonItem>
              )}
            </IonList>
        </IonCard>

        <IonModal ref={modal} isOpen={isModalOpen} onDidDismiss={closeModal} initialBreakpoint={0.6} breakpoints={[0, 0.5, 1]}>
          {selectedTransacao && (
            <IonContent style={{ backgroundColor: getInstituicaoBancariaCor(selectedTransacao.conta.nomeInstituicaoBancaria) }}>
              <IonCard className='rounded-card-content'>
                <IonCardHeader>
                  <IonCardSubtitle>{selectedTransacao.conta.nomeInstituicaoBancaria}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className='ion-text-center'>
                  <IonCardSubtitle>{selectedTransacao.tipo}</IonCardSubtitle>
                  <IonCardTitle>{isEditing ? (
                    <IonInput className="editable-input" value={descricao} onIonChange={e => setDescricao(e.detail.value!)} />
                  ) : (
                    <p className="non-editable" style={{ fontWeight: 'normal', fontSize: '1.5rem' }}>{selectedTransacao.descricao || "Descrição não disponível"}</p>
                  )}</IonCardTitle>
                </IonCardContent>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="6">
                        <IonLabel>
                          <h4>Categoria</h4>
                          {isEditing ? (
                            <IonSelect className="editable-input" value={categoria} onIonChange={e => setCategoria(e.detail.value)}>
                              {categorias.filter(cat => cat.tipo === selectedTransacao.tipo).map(cat => (
                                <IonSelectOption key={cat.categoriaID} value={cat.nomeCategoria}>
                                  {cat.nomeCategoria}
                                </IonSelectOption>
                              ))}
                            </IonSelect>
                          ) : (
                            <p className="non-editable">{selectedTransacao.categoria.nomeCategoria}</p>
                          )}
                        </IonLabel>
                      </IonCol>
                      <IonCol size="6">
                        <IonLabel>
                          <h4>Valor</h4>
                          {isEditing ? (
                            <IonInput className="editable-input" type="number" value={valor} onIonChange={e => setValor(e.detail.value!)} />
                          ) : (
                            <p className="non-editable" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>R$ {selectedTransacao.valor.toFixed(2)}</p>
                          )}
                          <p>{selectedTransacao.conta.nomeInstituicaoBancaria}</p>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="6">
                        <IonLabel>
                          <h4>Data da Transação</h4>
                          <p className="non-editable">{new Date(selectedTransacao.dataTransacao).toLocaleDateString()}</p>
                        </IonLabel>
                        </IonCol>
                      <IonCol size="6">
                        <IonLabel>
                          <h4>Conta</h4>
                          <p className="non-editable">{selectedTransacao.conta.nomeConta}</p>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="12" className="ion-text-center">
                        {isEditing ? (
                          <IonButton expand="block" color="success" onClick={handleSalvarEdicao}>
                            Salvar
                          </IonButton>
                        ) : (
                          <IonButton expand="block" color="medium" onClick={() => setIsEditing(true)}>
                            <IonIcon slot="start" icon={create} />
                            Editar
                          </IonButton>
                        )}
                        <IonButton expand="block" color="danger" onClick={() => handleExcluirTransacao(selectedTransacao.transacaoID)}>
                          <IonIcon slot="start" icon={trash} />
                          Excluir Transação
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonContent>
          )}
        </IonModal>
                
      </IonContent>
    </IonPage>
  );
};

export default TransacoesGenericPage;

