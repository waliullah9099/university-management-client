import { ReactNode } from "react";
import { useAppSelector } from "../../redux/feather/hook";
import { useCurrentToken } from "../../redux/feather/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
