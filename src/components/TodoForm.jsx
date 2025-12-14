import { useState } from "react";
import { createTodo } from "../api/todoApi";

const TodoForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTodo({
      title,
      description,
      completed: false,
    });

    setTitle("");
    setDescription("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button>Add Todo</button>
    </form>
  );
};

export default TodoForm;
