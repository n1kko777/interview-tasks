import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import UserListPage from './pages/UserListPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/users" component={UserListPage} />
        <Redirect exact from="/" to="/users" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
