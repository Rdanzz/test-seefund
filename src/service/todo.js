import api from "./api";

export const getTodosApi = () => api.get("/todos");

export const createTodoApi = (data) => api.post("/todos", data);

export const updateTodoApi = (id, data) =>
  api.put(`/todos/${id}`, data);

export const deleteTodoApi = (id) =>
  api.delete(`/todos/${id}`);
