import { routePathes } from "@/constants/routePathes";
import { useAuthContext } from "@/context/auth";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({ children }: PropsWithChildren) => {
  const {
    state: { isAuthenticated },
  } = useAuthContext();
  if (!isAuthenticated) return <>{children}</>;
  return <Navigate to={routePathes.patients} replace />;
};

export default UnProtectedRoute;
