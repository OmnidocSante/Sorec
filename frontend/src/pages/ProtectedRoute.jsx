import { Navigate, Outlet } from "react-router-dom";
import useUser from "@/auth/useUser";

export default function ProtectedRoute({ allowedRoles }) {
  const user = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
