import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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

const RoutingSystem: React.FC = () => {
      return(
        <IonReactRouter>
          <IonRouterOutlet>          
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
        {busy ? <IonSpinner/> : <RoutingSystem />}
    </IonApp>
  )   
};

export default App;
