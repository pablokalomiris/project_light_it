import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { LoginPage } from './login/LoginPage';
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import { PatientsPage } from './patients/PatientsPage';
import { routes } from './routes/routes';


const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route element={<PublicRoute />}>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path="*" element={<Navigate to={routes.login} />}/>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={routes.patients} element={<PatientsPage />} />
        <Route path="*" element={<Navigate to={routes.patients} />}/>
      </Route>
    </>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
