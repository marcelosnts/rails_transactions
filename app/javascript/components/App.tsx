import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {AuthProvider} from '../hooks/auth';

import Login from '../pages/login/Index'

import Transactions from '../pages/transactions/Index'

import Form from '../pages/form/Index'

import Upload from '../pages/upload/Index'

const App: React.FC = () => {
  return (
    <BrowserRouter> 
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/transactions/:id+" component={Form} />
          <Route exact path="/upload_csv" component={Upload} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;