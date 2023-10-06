import * as S from './client-form.styles'
import { TextInput, FormClientInputModel } from '../../../../shared';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type Props = {
  onSubmit: SubmitHandler<FormClientInputModel>;
  id: string;
};

export const ClientForm: React.FC<Props> = ({ onSubmit, id }) => {
  const { register, handleSubmit, formState } = useFormContext<FormClientInputModel>();

  return (
    <S.Form autoComplete='off' onSubmit={handleSubmit(onSubmit)} id={id}>
      <TextInput
        type="text"
        label="Nome"
        isRequired
        placeholder="Digite o seu nome"
        error={formState.errors.name?.message}
        {...register('name')}
      />

      <TextInput
        type="text"
        label="cpf"
        isRequired
        placeholder="Digite o seu CPF"
        error={formState.errors.name?.message}
        {...register('cpf')}
      />

      <TextInput
        type="email"
        label="email"
        isRequired
        placeholder="Digite o seu email"
        error={formState.errors.email?.message}
        {...register('email')}
      />
    </S.Form>
  );
};
