import { Routes } from 'react-router-dom';
import AuthRoutes from './authRoutes';
import MainRoutes from './mainRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {AuthRoutes}
      {MainRoutes}
    </Routes>
  );
};

export default AppRoutes;