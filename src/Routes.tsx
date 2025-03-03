import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {

  Login,
} from "./features";
import UnProtectedRoute from "./components/base/UnprotectedRoute";
import { routePathes } from "./constants/routePathes";

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
