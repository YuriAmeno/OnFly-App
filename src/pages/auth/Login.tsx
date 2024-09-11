import { useAlert, useAuth } from 'Contexts';
import { getUserByToken, IAuthModel, IUser_Auth, login, TLogin } from 'cores';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initial_values, loginSchema } from 'schemaFormik';
import { ErrorSpinner, LoadingSpinner } from 'utils';
import { SuccessSpinner } from 'utils/alerts/spinnerSuccess';

export default function LoginApp() {
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

  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleCatch = (msg: string | any) => {
    saveAuth(undefined);
    setIsLoading(false);
    setIsLoadingError(true);
    setMsg(msg);
  };
  const handleFinally = () => {
    setIsLoading(false);
    setIsLoadingError(false);
  };
  const handleSucces = (msg: string | any, auth: any, userByToken: IUser_Auth | undefined) => {
    setIsLoading(false);
    setIsLoadingError(false);
    setIsLoadingError(true);
    setMsg(msg);
    saveAuth(auth.data);
    setCurrentUser(userByToken);
  };

  const formik = useFormik({
    initialValues: initial_values,
    validationSchema: loginSchema,
    onSubmit: async (val, { setStatus, setSubmitting }) => {
      setIsLoading(true);
      try {
        const { data: auth } = await login(val);
        const userByToken = await getUserByToken(auth.data.api_token);
        const text = 'Login realizado com sucesso!!!!';
        handleSucces(text, auth, userByToken);
      } catch (error: any) {
        setStatus('Os dados de login estão incorretos.');
        setSubmitting(false);
        handleCatch(error.response.data.message);
      } finally {
        setTimeout(() => {
          handleFinally();
        }, 2000);
        navigate('/auth');
      }
    },
  });

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
        <div className="min-h-screen px-10 flex items-center bg-pink-100">
          <div
            className="container mx-auto max-w-lg h-fit p-5 
      bg-white rounded-xl shadow-md shadow-gray-300"
          >
            <div className="mb-6">
              <h3 className="block text-5xl text-center font-bold text-pink-600 mb-1 ">Login</h3>
            </div>
            <div className="mb-1">
              <label className="block mb-1 font-semibold text-sm">Nome completo</label>
              <input
                {...formik.getFieldProps('email')}
                className="p-2 outline-none focus:ring-2 focus:ring-pink-600 transition-all container rounded bg-gray-100 mb-2"
                type="text"
                placeholder="Nome completo"
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
                className="p-2 outline-none focus:ring-2 focus:ring-pink-600 transition-all container rounded bg-gray-100 mb-2"
                type="password"
                placeholder="Senha"
              />
              {formik.touched?.password && formik.errors?.password && formik.errors?.password ? (
                <div className="block mb-1 font-semibold text-sm">
                  <h5 className="block text-sm text-start p-3 font-bold text-red-700 mb-4">
                    {formik.errors?.password}
                  </h5>
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={check_disable_button()}
              className="container focus:ring focus:ring-bg-pink-400 hover:bg-pink-500 transition-all outline-none mt-6 bg-pink-600 py-2 font-semibold text-white uppercase rounded"
            >
              Login
            </button>

            <button
              disabled={formik.isSubmitting}
              onClick={() => navigate('/auth/register')}
              className="container focus:ring focus:ring-bg-blue-400 hover:bg-blue-500 transition-all outline-none mt-6 bg-blue-600 py-2 font-semibold text-white uppercase rounded"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
