import { useAlert } from 'Contexts';
import { register, TRegister } from 'cores';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initial_values_register, registerSchema } from 'schemaFormik';
import Swal from 'sweetalert2';
import { ErrorSpinner, LoadingSpinner } from 'utils';
import { SuccessSpinner } from 'utils/alerts/spinnerSuccess';

export default function RegisterApp() {
  const {
    setIsLoading,
    setMsg,
    setIsLoadingError,
    isLoading,
    isLoadingError,
    msg,
    isLoadingSuccess,
    setIsLoadingSuccess,
  } = useAlert();
  const navigate = useNavigate();

  const handleCatch = (msg: string | any) => {
    setIsLoading(false);
    setIsLoadingError(true);
    setMsg(msg);
  };

  const handleSucces = (msg: string | any) => {
    setIsLoading(false);
    setIsLoadingError(false);
    setIsLoadingSuccess(true);
    setMsg(msg);
  };

  const handleFinally = () => {
    setIsLoading(false);
    setIsLoadingError(false);
    setIsLoadingSuccess(false);
  };

  const formik = useFormik({
    initialValues: initial_values_register,
    validationSchema: registerSchema,
    onSubmit: async (val: TRegister) => {
      setIsLoading(true);
      try {
        setIsLoading(false);
        await register(val);
        setIsLoadingSuccess(true);
        handleSucces('Usuário criado com sucesso! Muito Obrigado');
      } catch (error: any) {
        handleCatch(error.response.data.message);
      } finally {
        setTimeout(() => {
          handleFinally();
        }, 2000);
        navigate('/auth');
      }
    },
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  const check_disable_button = () => {
    if (!formik.isValid) {
      return true;
    }
    if (formik.isSubmitting) {
      return true;
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner title={'Validando informações...'} />}
      {isLoadingSuccess && <SuccessSpinner title={'Registro concluido com sucesso!!!!'} />}
      {isLoadingError && <ErrorSpinner title={'Error'} text={msg} />}

      <form className="form w-100" onSubmit={formik.handleSubmit} noValidate id="kt_login_signin_form">
        <div className="bg-pink-100 min-h-screen px-10 flex items-center">
          <div className="container max-w-lg mx-auto h-fit p-5 bg-white rounded shadow-md shadow-gray-300">
            <div className="mb-3">
              <h3 className="block text-5xl text-center font-bold text-pink-600 mb-4">Cadastro</h3>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-sm">Nome completo</label>
              <input
                {...formik.getFieldProps('name')}
                className="p-2 outline-none focus:ring focus:ring-bg-pink-600 transition-all container rounded bg-pink-100 mb-3"
                type="text"
                placeholder="Nome completo"
              />
              {formik.touched?.name && formik.errors?.name && formik.errors?.name ? (
                <div className="block mb-1 font-semibold text-sm">
                  <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">{formik.errors?.name}</h5>
                </div>
              ) : null}
            </div>
            <div>
              <label className="block mb-1 font-semibold text-sm">E-mail</label>
              <input
                {...formik.getFieldProps('email')}
                className="p-2 outline-none focus:ring focus:ring-bg-pink-600 transition-all container rounded bg-pink-100 mb-3"
                type="email"
                placeholder="E-mail"
              />
              {formik.touched?.email && formik.errors?.email && formik.errors?.email ? (
                <div className="block mb-1 font-semibold text-sm">
                  <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">{formik.errors?.email}</h5>
                </div>
              ) : null}
            </div>
            <div>
              <label className="block mb-1 font-semibold text-sm">Senha</label>
              <input
                {...formik.getFieldProps('password')}
                className="p-2 outline-none focus:ring focus:ring-bg-pink-600 transition-all container rounded bg-pink-100 mb-3"
                type="password"
              />
              {formik.touched?.password && formik.errors?.password && formik.errors?.password ? (
                <div className="block mb-1 font-semibold text-sm">
                  <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">
                    {formik.errors?.password}
                  </h5>
                </div>
              ) : null}
            </div>

            <div>
              <label className="block mb-1 font-semibold text-sm">Confirme a senha</label>
              <input
                {...formik.getFieldProps('password_confirmation')}
                className="p-2 outline-none focus:ring focus:ring-bg-pink-600 transition-all container rounded bg-pink-100 mb-3"
                type="password"
              />
              {formik.touched?.password_confirmation &&
              formik.errors?.password_confirmation &&
              formik.errors?.password_confirmation ? (
                <div className="block mb-1 font-semibold text-sm">
                  <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">
                    {formik.errors?.password_confirmation}
                  </h5>
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={check_disable_button()}
              className="container focus:ring focus:ring-bg-pink-400 hover:bg-pink-500 transition-all outline-none mt-6 bg-pink-600 py-2 font-semibold text-white uppercase rounded"
            >
              Cadastrar
            </button>

            <button
              onClick={() => navigate('/auth')}
              disabled={formik.isSubmitting}
              className="container focus:ring focus:ring-bg-blue-400 hover:bg-blue-500 transition-all outline-none mt-6 bg-blue-600 py-2 font-semibold text-white uppercase rounded"
            >
              Voltar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
