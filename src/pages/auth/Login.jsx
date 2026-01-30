import { useState } from "react";
import { setAuth } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../../service/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const res = await loginApi(form);

      setAuth(res.data.token, res.data.expires_in);
      toast.success("Login berhasil");

      navigate("/");
    } catch (err) {
      const apiErrors = err.response?.data?.errors;

      if (apiErrors) {
        const formattedErrors = {};

        Object.keys(apiErrors).forEach((key) => {
          formattedErrors[key] = apiErrors[key][0];
        });

        setErrors(formattedErrors);
      } else {
        toast.error(
          err.response?.data?.message || "Login gagal"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-blue-300"
                }
              `}
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: null });
              }}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-blue-300"
                }
              `}
              value={form.password}
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
                setErrors({ ...errors, password: null });
              }}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
