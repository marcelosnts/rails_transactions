import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom';

import api from '../../services/api';

interface Transaction {
  id: number;
  title: string;
  transaction_type: string;
  description: string;
  value: number;
}

const Index : React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions').then(response => {
      setTransactions(response.data);
    });   
  }, []);

  return (
      <React.Fragment>
        <h1>Transactions</h1>
        {transactions.map(transaction => {
          return (
            <>
              <div key={transaction.id}>{transaction.title}</div>
              <Link to={`/transactions/${transaction.id}`}>Edit</Link>
            </>
          )}
        )}
      </React.Fragment>
    );
}

export default Index
