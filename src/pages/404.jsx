import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500 mb-6">Page not found</p>

      <Link
        to="/"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Back Home
      </Link>
    </div>
  );
}
