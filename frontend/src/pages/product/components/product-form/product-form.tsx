import * as S from './product-form.styles'
import { TextInput, FormProductInputModel, TextAreaInput } from '../../../../shared';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type Props = {
  onSubmit: SubmitHandler<FormProductInputModel>;
  id: string;
};

export const ProductForm: React.FC<Props> = ({ onSubmit, id }) => {
  const { register, handleSubmit, formState } = useFormContext<FormProductInputModel>();

  return (
    <S.Form autoComplete='off' onSubmit={handleSubmit(onSubmit)} id={id}>
      <TextInput
        type="text"
        label="Nome"
        isRequired
        placeholder="Digite o nome do produto"
        error={formState.errors.title?.message}
        {...register('title')}
      />

      <TextInput
        type="number"
        label="preço"
        isRequired
        placeholder="Digite o preço do produto"
        error={formState.errors.price?.message}
        {...register('price')}
      />

      <TextAreaInput
        label="descrição"
        isRequired
        placeholder="Digite a descrição do produto"
        error={formState.errors.description?.message}
        {...register('description')}
      />
    </S.Form>
  );
};
