import { IconButtonProps } from '../types';
import * as S from './icon-button.styles';

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  variant,
}) => {
  return (
    <S.ButtonWrapper variant={variant} onClick={onClick}>
      <Icon />
    </S.ButtonWrapper>
  );
};
