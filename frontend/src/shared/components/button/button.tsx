import { ClipLoader } from 'react-spinners';
import { ButtonProps } from '../types';
import * as S from './button.styles';

export const Button = ({
  children,
  onClick,
  type,
  transparent = false,
  variant,
  disabled,
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button
      disabled={disabled}
      variant={variant}
      transparent={transparent}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? (
        <S.ContainerLoading>
          <ClipLoader color="#fff" loading size={18} speedMultiplier={1} />
        </S.ContainerLoading>
      ) : (
        children
      )}
    </S.Button>
  );
};
