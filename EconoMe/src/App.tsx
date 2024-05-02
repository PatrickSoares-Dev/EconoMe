import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonSpinner, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { playCircle, radio, library, search, home, menuOutline, barChart, apps, add } from 'ionicons/icons';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import { useEffect, useState } from 'react';

setupIonicReact();
import { buscarUsuarioAtual } from './firebaseConfig'
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/action';
import Bemvindo from './pages/BemVindo/Bemvindo';
import { menuController } from '@ionic/core';
import Menu from './components/Menu/Menu';

const RoutingSystem: React.FC = () => {
      return(
        <IonReactRouter>
           {/* <IonTabs> */}
            <IonRouterOutlet id="main-content">         
              <Route exact path="/">
                <Home />
              </Route>
              {/* Bemvindo */}
              <Route exact path="/Bemvindo">
                <Bemvindo />
              </Route>
              {/* Login */}
              <Route exact path="/Login">
                <Login />
              </Route>
              {/* Registro */}
              <Route exact path="/Registro">
                <Registro />
              </Route>                      
            </IonRouterOutlet>

            {/* <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/">
                <IonIcon icon={home} />                
              </IonTabButton>

              <IonTabButton tab="Categoria" href="/Categoria">
                <IonIcon icon={apps} />                
              </IonTabButton>

              <IonTabButton tab="Add" href="/" className="custom-add-button">
                <IonIcon icon={add} className="custom-add-icon" />
              </IonTabButton>

              <IonTabButton tab="Contas" href="/Contas">
                <IonIcon icon={barChart} />                
              </IonTabButton>

              <IonTabButton tab="Menu" onClick={() => menuController.open()}>
                <IonIcon icon={menuOutline} />
              </IonTabButton>

            </IonTabBar>       */}

          {/* </IonTabs> */}
          
        </IonReactRouter>
      )      
}
const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  useEffect(() =>{
    buscarUsuarioAtual().then((user: any) =>{
      console.log(user)
      if(user){
        //Usuário Logado
        dispatch(setUserState(user.email))
        window.history.replaceState({}, '', '/')
      }else{
        window.history.replaceState({}, '', '/Login')
      }
      setBusy(false)
    })
  }, [])

  return(
    <IonApp>
        <Menu />
        {busy ? <IonSpinner/> : <RoutingSystem />}
    </IonApp>
  )   
};

export default App;

