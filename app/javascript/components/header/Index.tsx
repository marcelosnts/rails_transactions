import React, { useCallback } from 'react';
import {Link} from 'react-router-dom';

import {useAuth} from '../../hooks/auth';

import {Container} from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'small' }: HeaderProps) => {
  const {signOut} = useAuth();

  const handleLogout = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <Container size={size}>
      <header>
        <h1>Transactions</h1>
        <nav>
          <Link to="/transactions/new">Nova Transação</Link>
          <Link to="/transactions">Listagem</Link>
          <Link to="/upload_csv">Importar CSV</Link>
          <Link to="#" onClick={handleLogout}>Sair</Link>        
        </nav>
      </header>
    </Container>
  );
}

export default Header;