import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import {AuthProvider} from '../hooks/auth';

import Route from './Route';

import Login from '../pages/login/Index';
import SignUp from '../pages/signup/Index';

import Transactions from '../pages/transactions/Index';
import Form from '../pages/form/Index';
import Upload from '../pages/upload/Index';

import GlobalStyle from './styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          
          <Route exact isPrivate path="/transactions/new"  component={Form} />
          <Route exact isPrivate path="/transactions/:id+"  component={Form} />
          <Route exact isPrivate path="/transactions"  component={Transactions} />
          <Route exact isPrivate path="/upload_csv"  component={Upload} />
        </Switch>
      </AuthProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;