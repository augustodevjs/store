import { Theme } from 'react-select'
import { SelectProps } from '..'
import * as S from './styles'

export const Select = ({ placeholder, ...rest }: SelectProps) => {
  return (
    <S.Select
      {...rest}
      isSearchable={false}
      menuPosition="fixed"
      classNamePrefix="select"
      placeholder={placeholder}
      theme={(theme: Theme) => ({
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