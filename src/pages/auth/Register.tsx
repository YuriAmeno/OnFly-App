export default function RegisterApp() {
  return (
    <div className="bg-pink-100 min-h-screen px-10 flex items-center">
      <div className="container max-w-lg mx-auto h-fit p-5 bg-white rounded shadow-md shadow-gray-300">
        <div className="mb-3">
          <h3 className="block text-5xl font-bold text-pink-600 mb-2">Criar conta</h3>
          <h3>
            Ja tem uma conta ? <a href="/login">Clique Aqui</a>
          </h3>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">Nome completo</label>
          <input
            className="p-2 outline-none focus:ring focus:ring-bg-pink-600 transition-all container rounded bg-gray-100"
            type="text"
            placeholder="Nome completo"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">E-mail</label>
          <input
            className="p-2 outline-none focus:ring focus:ring-bg-pink-600 transition-all container rounded bg-gray-100"
            type="email"
            placeholder="E-mail"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-sm">Senha</label>
          <input
            className="p-2 outline-none focus:ring focus:ring-bg-pink-600 transition-all container rounded bg-gray-100"
            type="password"
            placeholder="Senha"
          />
        </div>

        <button className="container focus:ring focus:ring-bg-pink-300 hover:bg-pink-500 transition-all outline-none mt-6 bg-pink-400 py-2 font-semibold text-white uppercase rounded">
          Cadastrar
        </button>
      </div>
    </div>
  );
}
