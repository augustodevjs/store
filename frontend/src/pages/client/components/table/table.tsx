import { FaEdit, FaTrash } from "react-icons/fa"
import * as S from './table.styles'

type TableProps = {
  name: string;
  cpf: string;
  email: string;
  onDelete: () => void
  onEdit: () => void
}

export const Table: React.FC<TableProps> = ({ name, cpf, email, onDelete, onEdit }) => {
  return (
    <S.Container>
      <div>
        <p className="name">Nome: {name}</p>
        <p className="cpf">CPF: {cpf}</p>
        <p className="email">Email: {email}</p>
      </div>

      <S.IconGroup>
        <FaEdit onClick={onEdit} />
        <FaTrash onClick={onDelete} />
      </S.IconGroup>
    </S.Container>
  )
}