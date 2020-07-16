import React, {useRef, useCallback} from "react";
import {useHistory} from 'react-router-dom';
import {FiUser, FiLock} from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';

import {useAuth} from '../../hooks/auth';

import {Container} from './styles';

import Input from '../../components/input/Index'

interface LoginFormData {
  name : string;
  password : string;
}

const Index : React.FC = () => {  
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data : LoginFormData) => {
    try{
      await signIn({
        name: data.name, 
        password: data.password
      });

      const user_id = localStorage.getItem('@RailsTransactions:user_id');
      if(user_id){
        history.push('/transactions');
      }
    }catch(err){
      console.log('catch', err);
    }
  }, [signIn],
);

  return (
    <React.Fragment>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" icon={FiUser} placeholder="Username" />
              <Input
                name="password"
                type="password"
                icon={FiLock}
                placeholder="Password"
              />

              <button type="submit">Login</button>

              <a href="forgot">Esqueci a senha</a>
            </Form>
      </Container>
    </React.Fragment>
  );
}

export default Index
