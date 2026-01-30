import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Todo from "../pages/Todo";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import NotFound from "../pages/404";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<GuestRoute element={<Login />} />} />

        <Route
          path="/register"
          element={<GuestRoute element={<Register />} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
