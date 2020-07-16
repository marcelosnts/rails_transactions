import React, {useEffect, useState} from 'react';
import {useRouteMatch} from 'react-router-dom';

import api from '../../services/api';

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

    useEffect(() => {
        api.get(`transactions/${params.id}/edit`).then(response => {
            setTransaction(response.data);
        });
    }, []);

    return(
        <>
            {params.id}
            <h1>Form</h1>
        </>
    );
}

export default Form;