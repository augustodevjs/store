import { forwardRef } from 'react';
import { TextAreaInputProps } from '../types';
import * as S from './text-area-input.styles';

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(({ label, isRequired, ...rest }, ref) => {
  return (
    <S.TextAreaInputForm isRequired={isRequired}>
      <label>{label}</label>
      <textarea rows={4} {...rest} ref={ref} />
    </S.TextAreaInputForm>
  );
});
