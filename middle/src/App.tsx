import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import NotesPage from './pages/NotesPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/notes" component={NotesPage} />
        <Redirect exact from="/" to="/notes" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
