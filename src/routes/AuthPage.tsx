import LoginApp from 'pages/auth/Login';
import RegisterApp from 'pages/auth/Register';
import { Route, Routes } from 'react-router-dom';

const AuthPage = () => (
  <Routes>
    <Route>
      <Route path="login" element={<LoginApp />} />
      <Route path="registration" element={<RegisterApp />} />
      <Route index element={<LoginApp />} />
    </Route>
  </Routes>
);

export { AuthPage };
