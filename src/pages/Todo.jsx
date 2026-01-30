import { useEffect, useState } from "react";
import {
  getTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../service/todo";

import { toast } from "react-toastify";
import { LogOut, Trash2, Plus, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Todo() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const fetchTodos = async () => {
    const res = await getTodosApi();
    setTodos(res.data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    setErrors({});

    try {
      await createTodoApi({
        title,
        descriptions,
      });

      setTitle("");
      setDescriptions("");
      toast.success("Todo berhasil ditambahkan");
      fetchTodos();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        toast.error("Gagal menambahkan todo");
      }
    }
  };

  const handleUpdate = async () => {
    setEditErrors({});

    try {
      await updateTodoApi(editTodo.id, {
        title: editTodo.title,
        descriptions: editTodo.descriptions,
        is_done: editTodo.is_done,
      });

      toast.success("Todo berhasil diupdate");
      setEditTodo(null);
      fetchTodos();
    } catch (err) {
      if (err.response?.status === 422) {
        setEditErrors(err.response.data.errors);
      } else {
        toast.error("Gagal update todo");
      }
    }
  };

  const toggleDone = async (todo) => {
    await updateTodoApi(todo.id, {
      is_done: !todo.is_done,
    });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus todo ini?")) return;
    await deleteTodoApi(id);
    toast.success("Todo dihapus");
    fetchTodos();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-bold">My Todos</h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6"
        >
          <div className="flex flex-col">
            <input
              className={`border p-2 rounded focus:outline-none ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {errors.title && (
              <span className="text-xs text-red-500 mt-1">
                {errors.title[0]}
              </span>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <input
              className={`border p-2 rounded focus:outline-none ${
                errors.descriptions ? "border-red-500" : ""
              }`}
              placeholder="Description"
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
            />

            {errors.descriptions && (
              <span className="text-xs text-red-500 mt-1">
                {errors.descriptions[0]}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 flex items-center justify-center gap-2 h-[42px]"
          >
            <Plus size={18} />
            Add
          </button>
        </form>

        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-12 text-center">No</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2 w-40 text-center">Status</th>
              <th className="border p-2 w-32 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {todos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  Belum ada todo
                </td>
              </tr>
            )}

            {todos.map((todo, index) => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{index + 1}</td>

                <td className="border p-2">{todo.title}</td>

                <td className="border p-2">{todo.descriptions || "-"}</td>

                <td className="border p-2 text-center">
                  <button
                    onClick={() => toggleDone(todo)}
                    className={`px-3 py-1 text-xs rounded-full font-semibold transition
                    ${
                      todo.is_done
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }
                    `}
                  >
                    {todo.is_done ? "Sudah Selesai" : "Belum Selesai"}
                  </button>
                </td>

                <td className="border p-2 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setEditTodo(todo)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editTodo && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">Edit Todo</h2>

                <button
                  onClick={() => {
                    setEditTodo(null);
                    setEditErrors({});
                  }}
                >
                  <X />
                </button>
              </div>

              <input
                className={`border w-full p-2 mb-1 rounded ${
                  editErrors.title ? "border-red-500" : ""
                }`}
                value={editTodo.title}
                onChange={(e) =>
                  setEditTodo({ ...editTodo, title: e.target.value })
                }
              />

              {editErrors.title && (
                <p className="text-xs text-red-500 mb-2">
                  {editErrors.title[0]}
                </p>
              )}

              <textarea
                className={`border w-full p-2 mb-1 rounded ${
                  editErrors.descriptions ? "border-red-500" : ""
                }`}
                rows="3"
                value={editTodo.descriptions}
                onChange={(e) =>
                  setEditTodo({
                    ...editTodo,
                    descriptions: e.target.value,
                  })
                }
              />

              {editErrors.descriptions && (
                <p className="text-xs text-red-500 mb-2">
                  {editErrors.descriptions[0]}
                </p>
              )}

              <label className="flex items-center gap-2 mb-4 text-sm">
                <input
                  type="checkbox"
                  checked={editTodo.is_done}
                  onChange={(e) =>
                    setEditTodo({
                      ...editTodo,
                      is_done: e.target.checked,
                    })
                  }
                />
                Tandai sebagai selesai
              </label>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setEditTodo(null);
                    setEditErrors({});
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
