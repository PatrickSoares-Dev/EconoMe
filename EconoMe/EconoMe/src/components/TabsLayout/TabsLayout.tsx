import React, { useRef, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet, IonPopover, IonContent, IonMenu, IonPage, IonList, IonItem, IonLabel } from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { home, barChart, addCircle, wallet, menu, arrowUpCircle, arrowDownCircle, statsChart } from 'ionicons/icons';
import Home from '../../pages/Home/Home';
import GastosPorCategoria from '../../pages/Categoria/GastosPorCategoria';
import CadastrarEntradas from '../../pages/Entradas/CadastrarEntrada';
import CadastrarDespesa from '../../pages/Despesas/CadastrarDespesas';
import GerenciarContas from '../../pages/Contas/GerenciarContas';
import Transacoes from '../../pages/Transacoes/TransacoesPage';
import TransacoesContaPage from '../../pages/Transacoes/TransacoesPage';
import TransacoesContaGenericPage from '../../pages/Transacoes/TransacoesGenericPage';
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import CadastrarContas from '../../pages/Contas/CadastrarContas';
import './TabsLayout.css'; // Importando o arquivo CSS

const TabsLayout: React.FC = () => {
  const history = useHistory();
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopover = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (popover.current) {
      if (popoverOpen) {
        await popover.current.dismiss();
      } else {
        await popover.current.present();
      }
      setPopoverOpen(!popoverOpen);
    }
  };

  return (
    <>
      <IonMenu contentId="main-content" type="overlay">
        <MenuComponent />
      </IonMenu>

      <IonPage id="main-content">
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/gastos-por-categoria" component={GastosPorCategoria} />
              <Route exact path="/cadastrar-contas" component={CadastrarContas} />
              <Route exact path="/cadastrar-entradas" component={CadastrarEntradas} />
              <Route exact path="/cadastrar-despesas" component={CadastrarDespesa} />
              <Route exact path="/gerenciar-contas" component={GerenciarContas} />
              <Route exact path="/transacoes" component={Transacoes} />
              <Route exact path="/transacoes-conta/:contaID" component={TransacoesContaPage} />
              <Route exact path="/transacoes-conta-all" component={TransacoesContaGenericPage} />
              <Redirect exact path="/" to="/home" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="custom-tab-bar">
              <IonTabButton tab="home" onClick={() => history.push('/home')}>
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="gastos-por-categoria" onClick={() => history.push('/gastos-por-categoria')}>
                <IonIcon icon={barChart} />
              </IonTabButton>
              <IonTabButton tab="cadastrar" id="cadastrar-trigger" className="tab-add" onClick={handlePopover}>
                <IonIcon icon={addCircle} />
              </IonTabButton>
              <IonTabButton tab="gerenciar-contas" onClick={() => history.push('/gerenciar-contas')}>
                <IonIcon icon={wallet} />
              </IonTabButton>
              <IonTabButton tab="menu" onClick={() => {
                const menu = document.querySelector('ion-menu');
                if (menu) {
                  menu.open();
                }
              }}>
                <IonIcon icon={menu} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
        <IonPopover ref={popover} side="top" alignment="center" className="custom-popover">
          <IonContent>
            <IonList>
              <IonItem button onClick={() => { history.push('/cadastrar-entradas'); popover.current?.dismiss(); setPopoverOpen(false); }}>
                <IonIcon slot="start" icon={arrowUpCircle} color="success" />
                <IonLabel>Cadastrar Entrada</IonLabel>
              </IonItem>
              <IonItem button onClick={() => { history.push('/cadastrar-despesas'); popover.current?.dismiss(); setPopoverOpen(false); }}>
                <IonIcon slot="start" icon={arrowDownCircle} color="danger" />
                <IonLabel>Cadastrar Despesa</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </IonPage>
    </>
  );
};

export default TabsLayout;