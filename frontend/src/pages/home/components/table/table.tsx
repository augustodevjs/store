import * as S from './table.styles'

type TableProps = {
  title: string;
  description: string;
  price: number;
}

export const Table: React.FC<TableProps> = ({ title, description, price }) => {
  return (
    <S.Container>
      <div>
        <p className="name">Título: {title}</p>
        <p className="cpf">Descrição: {description}</p>
        <p className="email">Preço: {price}</p>
      </div>
    </S.Container>
  )
}