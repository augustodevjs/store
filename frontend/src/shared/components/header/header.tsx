import { useNavigate } from 'react-router-dom';
import * as S from './header.styles';

export const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <S.Container>
      <div>
        <h1>Store</h1>
        <S.Links>
          <li onClick={() => handleNavigate('/home')}>Home</li>
          <li onClick={() => handleNavigate('/preferences')}>Preferências</li>
          <li onClick={() => handleNavigate('/product')}>Produtos</li>
          <li onClick={() => handleNavigate('/client')}>Clientes</li>
        </S.Links>
      </div>
    </S.Container>
  );
};