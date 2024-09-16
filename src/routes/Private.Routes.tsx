import { Routes, Route, Navigate } from 'react-router-dom';
import { CreateProductPage, DashboardApp, ProductPage } from 'pages';
import { MasterLayout } from 'layout';

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/dashboard" element={<DashboardApp />} />
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        //Products
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
      </Route>
    </Routes>
  );
};
