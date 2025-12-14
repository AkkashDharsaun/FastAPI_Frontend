import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodos = () => API.get("/todos");
export const getTodoById = (id) => API.get(`/todos/${id}`);
export const createTodo = (data) => API.post("/todos", data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
