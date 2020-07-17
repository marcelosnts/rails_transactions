import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';

import {Form as Unform} from '@unform/web';
import {FormHandles} from '@unform/core';

import {FiStar, FiMinimize2, FiInfo, FiDollarSign} from 'react-icons/fi';

import api from '../../services/api';

import Header from '../../components/header/Index';
import Input from '../../components/input/Index';
import Button from '../../components/button/Index'

import {Container} from './styles';

interface TransactionParams {
    id: string;
}

interface Transaction {
    id: number;
    title: string;
    transaction_type: string;
    description: string;
    value: number;
}

const Form : React.FC = () => {
    const {params} = useRouteMatch<TransactionParams>();
    const [transaction, setTransaction] = useState<Transaction>();
    const formRef = useRef<FormHandles>(null);

    const history = useHistory();

    useEffect(() => {
        api.get(`transactions/${params.id}/edit`).then(response => {
            setTransaction(response.data);
        }).catch(error => {
            console.log('Transaction not found. Creating a new');
        });
    }, []);

    const handleSubmit = useCallback((data : Transaction) => {
        const {id} = params;
        const {title, transaction_type, description, value} = data;

        api.put(`transactions/${id}`, {transaction: {
            title, transaction_type, description, value
        }}).then(response => {
            history.push('/transactions');
        }).catch(error => {
            api.post('transactions', {
                title, transaction_type, description, value
            }).then(response => {
                history.push('/transactions');
            }).catch(error => {
                console.log('Something went wrong. It was not possible to update nor create a new transaction')
            })
        });
        
    }, []);

    return(
        <Container>
            <Header />
            <Unform ref={formRef} onSubmit={handleSubmit}>
                <Input 
                    name="title" 
                    icon={FiStar} 
                    placeholder="Title" 
                    defaultValue={transaction && transaction.title} 
                />
                <Input 
                    name="transaction_type" 
                    icon={FiMinimize2} 
                    placeholder="Income or Outcome" 
                    defaultValue={transaction && transaction.transaction_type}
                />
                <Input 
                    name="description" 
                    icon={FiInfo} 
                    placeholder="Description" 
                    defaultValue={transaction && transaction.description}
                />
                <Input 
                    name="value" 
                    icon={FiDollarSign}
                    placeholder="Value" 
                    defaultValue={transaction && transaction.value}
                />

                <Button type="submit">Save</Button>
            </Unform>
        </Container>
    );
}

export default Form;