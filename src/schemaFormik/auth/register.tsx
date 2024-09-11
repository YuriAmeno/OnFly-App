import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail com formato inválido')
    .min(11, 'E-mail deve conter 11 caracteres no minimo.')
    .max(50, 'E-mail deve conter 50 caracteres no máximo.')
    .required('E-mail é um campo obrigatorio.'),
  name: Yup.string()
    .min(2, 'Nome deve conter 2 caracteres no minimo.')
    .max(40, 'É nome NÃO testamento (40 caracteres maximo).')
    .required('Nome é um campo obrigatorio.'),
  password: Yup.string()
    .min(8, 'Senha deve conter no minimo 8 caracters')
    .max(25, 'Maximum 50 symbols')
    .required('Senha é um campo obrigatorio.'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Senhas devem ser iguais.')
    .required('Confirme sua senha.'),
});
export const initial_values_register = {
  email: '',
  password: '',
  password_confirmation: '',
  name: '',
};
