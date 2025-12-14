import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} refresh={fetchTodos} />
      ))}
    </>
  );
};

export default TodoList;
