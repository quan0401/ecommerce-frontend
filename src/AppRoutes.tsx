import { FC, ReactNode, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import ConfirmEmail from '~features/auth/components/ConfirmEmail';
import ResetPasswordModal from '~features/auth/components/ResetPassword';
import { ReactElement } from 'react';
import AppPage from './features/AppPage';
import Home from './features/home/Home';
import HomeHeader from '~shared/header/components/HomeHeader';
import ProtectedRoute from '~features/ProtectedRoute';
import BuyerDashboard from '~features/buyer/components/Dashboard';
import AddSeller from '~features/seller/components/add/AddSeller';
interface ILayeroutProps {
  backgroundColor: string;
  children: ReactNode;
}

const Layout: FC<ILayeroutProps> = ({ backgroundColor = '#fff', children }): ReactElement => (
  <div style={{ backgroundColor }} className="flex flex-grow">
    {children}
  </div>
);

export const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: 'reset_password',
      element: (
        <Suspense>
          <ResetPasswordModal />
        </Suspense>
      )
    },
    {
      path: 'confirm_email',
      element: <ConfirmEmail />
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fffff">
            <Home />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/users/:username/:buyerId/orders',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fffff">
            <BuyerDashboard />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/seller_onboarding',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fffff">
            <AddSeller />
          </Layout>
        </ProtectedRoute>
      )
    }
  ];
  return useRoutes(routes);
};
