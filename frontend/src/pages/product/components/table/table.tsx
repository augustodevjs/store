import { FaEdit, FaTrash } from "react-icons/fa"
import * as S from './table.styles'

type TableProps = {
  title: string;
  description: string;
  price: number;
  onDelete: () => void
  onEdit: () => void
}

export const Table: React.FC<TableProps> = ({ title, description, price, onDelete, onEdit }) => {
  return (
    <S.Container>
      <div>
        <p className="name">Título: {title}</p>
        <p className="cpf">Descrição: {description}</p>
        <p className="email">Preço: {price}</p>
      </div>

      <S.IconGroup>
        <FaEdit onClick={onEdit} />
        <FaTrash onClick={onDelete} />
      </S.IconGroup>
    </S.Container>
  )
}