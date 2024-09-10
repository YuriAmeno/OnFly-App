import { useFormik } from 'formik';
import { initial_values, loginSchema } from 'schemaFormik';

export default function LoginApp() {
  // const [loading, setLoading] = useState(false);
  // const { saveAuth, setCurrentUser } = useAuth();
  // const rota = useNavigate()

  const formik = useFormik({
    initialValues: initial_values,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        // const { data: auth } = await login(values.email, values.cpf, values.password)
        // saveAuth(auth.data)
        // const userByToken = await getUserByToken(auth.data.api_token)
        // setCurrentUser(userByToken)
        // if (userByToken.first_login) {
        //   rota('/auth/firstLogin')
        // } else {
        //   rota('/auth/chooseFranchise')
        // }
      } catch (error) {
        saveAuth(undefined);
        setStatus('The login details are incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen px-10 flex items-center bg-pink-100">
      <div
        className="container mx-auto max-w-lg h-fit p-5 
      bg-white rounded-xl shadow-md shadow-gray-300"
      >
        <div className="mb-1">
          <h3 className="block text-5xl font-bold text-pink-600 mb-1">Login</h3>
          <h3 className="mt-5">
            Não possui conta ? <a href="/register">Clique aqui</a>
          </h3>
        </div>
        <div className="mb-1">
          <label className="block mb-1 font-semibold text-sm">Nome completo</label>
          <input
            className="p-2 outline-none focus:ring-2 focus:ring-pink-600 transition-all container rounded bg-gray-100 mb-2"
            type="text"
            placeholder="Nome completo"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">Senha</label>
          <input
            className="p-2 outline-none focus:ring-2 focus:ring-pink-600 transition-all container rounded bg-gray-100 mb-2"
            type="password"
            placeholder="Senha"
          />
        </div>
        <button className="container focus:ring focus:ring-pink-600 hover:bg-pink-500 transition-all outline-none mt-6 bg-pink-500 py-2 font-semibold text-white uppercase rounded">
          Login
        </button>
      </div>
    </div>
  );
}
