import { ButtonProps } from '../types';
import * as S from './button.styles';

export const Button = ({
  children,
  onClick,
  type,
  transparent = false,
  variant,
  disabled,
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
      {children}
    </S.Button>
  );
};
