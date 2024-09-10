import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail com formato inválido')
    .min(11, 'E-mail deve conter 11 caracteres no minimo.')
    .max(50, 'E-mail deve conter 50 caracteres no máximo.')
    .required('E-mail é um campo obrigatorio.'),
  password: Yup.number()
    .min(8, 'Senha deve conter no minimo 8 caracters')
    .max(25, 'Maximum 50 symbols')
    .required('Senha é um campo obrigatorio.'),
});
export const initial_values = {
  email: -1,
  password: '',
};
