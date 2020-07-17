import React, {useState, useEffect} from "react"
import {Link, useHistory} from 'react-router-dom';

import moment from 'moment';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import Header from '../../components/header/Index';

import {Container, TableContainer} from './styles';

interface Transaction {
  id: number;
  title: string;
  transaction_type: string;
  description: string;
  value: number;
  created_at: Date;
}

const Index : React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const history = useHistory();

  useEffect(() => {
    api.get('transactions').then(response => {
      setTransactions(response.data);
    });   
  }, []);

  const handleEditTransaction = (id) => {
    history.push(`/transactions/${id}`);
  }

  return (
    <React.Fragment>
      <Container>
        <Header />

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} onClick={() => {handleEditTransaction(transaction.id)}}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.transaction_type}>
                    {transaction.transaction_type === 'income'
                      ? formatValue(transaction.value)
                      : `- ${formatValue(transaction.value)}`}
                  </td>
                  <td>{transaction.description}</td>
                  <td>{moment(transaction.created_at).format('DD/MM/YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}

export default Index
