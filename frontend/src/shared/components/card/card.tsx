import { BiTime } from 'react-icons/bi';
import { FaEllipsisV } from 'react-icons/fa';
import { MdList } from 'react-icons/md';
import * as S from './card.styles';
import { CardProps } from '../types';


export const Card: React.FC<CardProps> = ({
  stateTask,
  titleTask,
  description,
  dateTime,
}) => {
  return (
    <S.Container>
      <h3>{stateTask}</h3>

      <S.TitleContent>
        <S.Text>
          <h2>{titleTask}</h2>
          <p>{description}</p>
        </S.Text>
        <FaEllipsisV size={12} />
      </S.TitleContent>

      <S.Group>
        <S.Content>
          <MdList size={16} />
          Tarefas
        </S.Content>

        <S.Content>
          <BiTime size={16} />
          {dateTime}
        </S.Content>
      </S.Group>
    </S.Container>
  );
};
