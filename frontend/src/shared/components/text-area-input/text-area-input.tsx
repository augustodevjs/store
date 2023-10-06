import { forwardRef } from 'react';
import { TextAreaInputProps } from '../types';
import * as S from './text-area-input.styles';

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(({ label, isRequired, error, ...rest }, ref) => {
  return (
    <S.TextAreaInputForm error={error} isRequired={isRequired}>
      <label>{label}</label>
      <textarea rows={4} {...rest} ref={ref} />
      {error !== undefined && <span>{error}</span>}
    </S.TextAreaInputForm>
  );
});
