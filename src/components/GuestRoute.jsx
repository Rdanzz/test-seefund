import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function GuestRoute({ element }) {
  const token = getToken();

  return token ? <Navigate to="/" replace /> : element;
}
