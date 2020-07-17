import React, {useRef, useCallback} from "react";
import {FiUser, FiLock} from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';

import api from '../../services/api';

import {Container, Content, Background} from './styles';

import Input from '../../components/input/Index'
import Button from '../../components/button/Index'

interface SignUpFormData {
  name : string;
  password : string;
  password_confirmation : string;
}

const Index : React.FC = () => {  
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data : SignUpFormData) => {
		const {name, password, password_confirmation} = data;

    api.post('users', {user: {name, password, password_confirmation}}).then(response => {
			console.log('post');
		});
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} placeholder="Usuário"/>
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Repita a senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </React.Fragment>
  );
}

export default Index
