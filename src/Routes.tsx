import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
  ResetPassword,
  VerifyEmail,
  Login,
  Home,
} from "./features";
import UnProtectedRoute from "./components/base/UnprotectedRoute";
import { routePathes } from "./constants/routePathes";
import ProtectedRoute from "./components/base/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path={routePathes.auth}
        element={
          <UnProtectedRoute>
            <Login />
          </UnProtectedRoute>
        }
      />
      <Route path={"/"} element={<RootLayout />}>
        <Route
          path={routePathes.home}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path={routePathes.verifyEmail}
        element={
          <UnProtectedRoute>
            <VerifyEmail />
          </UnProtectedRoute>
        }
      />
      <Route
        path={routePathes.resetPassword}
        element={
          <UnProtectedRoute>
            <ResetPassword />
          </UnProtectedRoute>
        }
      />
      <Route path={"/"} element={<RootLayout />}>
        <Route
          path="/"
          element={<Navigate to={routePathes.home} replace />}
        />
      </Route>
      <Route path="/" element={<Navigate to={routePathes.auth} replace />} />
      <Route path="*" element={<Navigate to={routePathes.auth} replace />} />
    </Route>
  )
);
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
