import api from "./api";

export const loginApi = (payload) => api.post("/login", payload);

export const registerApi = (payload) => api.post("/register", payload);
