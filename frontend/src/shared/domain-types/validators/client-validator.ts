import * as yup from 'yup';

export const clientFormValidaon = yup.object({
  name: yup.string().required('O campo é obrigatório'),
  cpf: yup.string().required('O campo é obrigatório'),
  email: yup.string().required('O campo é obrigatório'),
});
