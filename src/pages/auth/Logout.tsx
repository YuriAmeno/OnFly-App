import { useAuth } from 'Contexts';
import { useEffect } from 'react';
import { Navigate, Routes } from 'react-router-dom';

export function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    document.location.reload();
  }, [logout]);

  return <Navigate to="/auth/login" />;
}
