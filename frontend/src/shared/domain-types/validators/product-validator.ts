import * as yup from 'yup';

export const productFormValidation = yup.object({
  price: yup.number()
    .typeError('O preço deve ser um número válido')
    .moreThan(0, 'O preço deve ser maior que zero')
    .required('O campo é obrigatório'),
  title: yup.string().required('O campo é obrigatório'),
  description: yup.string().required('O campo é obrigatório'),
});