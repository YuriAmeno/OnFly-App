import * as Yup from 'yup';

export const CreateProductSchema = Yup.object().shape({
  description: Yup.string()
    .min(5, 'Descrição deve conter 5 caracteres no minimo.')
    .max(50, 'Descrição deve conter 50 caracteres no máximo.')
    .required('Descrição é um campo obrigatorio.'),
  value: Yup.number().min(0.01, 'Valor deve conter no minimo 0.01').required('Valor é um campo obrigatorio.'),
  user_id: Yup.number().required('Usuário é um campo obrigatorio.'),
  category_id: Yup.number().required('Categoria é um campo obrigatorio.'),
});
export const initial_values_product_create = {
  description: '',
  value: -1,
  user_id: -1,
  category_id: -1,
  data: '',
};
