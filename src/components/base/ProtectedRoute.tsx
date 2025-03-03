import { useAuthContext } from "@/context/auth";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const {
    state: { isAuthenticated },
  } = useAuthContext();

  if (isAuthenticated) return <>{children}</>;
  return <Navigate to={"/auth"} replace />;
};

export default ProtectedRoute;
