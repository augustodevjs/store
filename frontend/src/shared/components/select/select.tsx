import { Props as ReactSelectProps } from 'react-select'
import * as S from './styles'

type SelectOption = {
  value: any;
  label: string;
}

export type SelectProps = ReactSelectProps<SelectOption | any> & {
  placeholder: string;
}

export const Select = ({ placeholder, ...rest }: SelectProps) => {
  return (
    <S.Select
      {...rest}
      isSearchable={false}
      menuPosition="fixed"
      classNamePrefix="select"
      placeholder={placeholder}
      theme={(theme: any) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: 'black',
          primary: '#212121',
        },
      })}
      noOptionsMessage={() => 'Nenhum Resultado'}
    />
  )
}