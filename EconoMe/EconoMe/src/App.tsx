import React, { useEffect, useState } from 'react';
import { IonApp, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/action';
import { buscarUsuarioAtual } from './firebaseConfig';
import TabsLayout from './components/TabsLayout/TabsLayout';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Bemvindo from './pages/BemVindo/Bemvindo';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from './firebaseConfig';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [busy, setBusy] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    buscarUsuarioAtual().then((user: any) => {
      if (user) {
        dispatch(setUserState(user.email));
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('firebaseUID', user.uid);
      } else {
        window.history.replaceState({}, '', '/login');
      }
      setBusy(false);
    });
  }, [dispatch]);

  return (
    <IonApp>
      {busy ? <IonSpinner /> : (
        <IonReactRouter>
          <MainRoutes />
        </IonReactRouter>
      )}
    </IonApp>
  );
};

const MainRoutes: React.FC = () => {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Registro} />
      <Route path="/bemvindo" component={Bemvindo} />
      <Route path="/" render={() => (
        isUserLoggedIn() ? <TabsLayout /> : <Redirect to="/login" />
      )} />
    </>
  );
};

export default App;