import { Navigate } from "react-router-dom";
import { getToken, isTokenExpired, logout } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token || isTokenExpired()) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
}
