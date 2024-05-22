import { FC, ReactNode, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import ConfirmEmail from '~features/auth/components/ConfirmEmail';
import ResetPasswordModal from '~features/auth/components/ResetPassword';
import { ReactElement } from 'react';
import AppPage from './features/AppPage';
import Home from './features/home/Home';
import ProtectedRoute from '~features/ProtectedRoute';
import BuyerDashboard from '~features/buyer/components/Dashboard';
import AddSeller from '~features/seller/components/add/AddSeller';
import CurrentSellerProfile from '~features/seller/components/profile/CurrentSellerProfile';
import SellerProfile from '~features/seller/components/profile/SellerProfile';
import Seller from '~features/seller/components/dashboard/Seller';
import SellerDashboard from '~features/seller/components/dashboard/SellerDashboard';
import ManageOrders from '~features/seller/components/dashboard/ManageOrders';
import ManageEarnings from '~features/seller/components/dashboard/ManageEarnings';
import Error from '~features/error/Error';
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
      element: (
        <Suspense>
          <AppPage />
        </Suspense>
      )
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
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#fffff">
              <Home />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/users/:username/:buyerId/orders',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#fffff">
              <BuyerDashboard />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/seller_onboarding',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#fffff">
              <AddSeller />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/seller_profile/:username/:sellerId/edit',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#fffff">
              <CurrentSellerProfile />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/seller_profile/:username/:sellerId/view',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#fffff">
              <SellerProfile />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/:username/:sellerId',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#fffff">
              <Seller />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: 'seller_dashboard',
          element: <SellerDashboard />
        },
        {
          path: 'manage_orders',
          element: <ManageOrders />
        },
        {
          path: 'manage_earnings',
          element: <ManageEarnings />
        }
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ];
  return useRoutes(routes);
};
