import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import TodoPage from './pages/TodoPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/todo" component={TodoPage} />
        <Redirect exact from="/" to="/todo" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
