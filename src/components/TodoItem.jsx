import { deleteTodo, updateTodo } from "../api/todoApi";

const TodoItem = ({ todo, refresh }) => {
  const toggleStatus = async () => {
    await updateTodo(todo.id, {
      title: todo.title,
      description: todo.description,
      completed: !todo.completed,
    });
    refresh();
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    refresh();
  };

  return (
    <div className={`todo-item ${todo.completed ? "done" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>

      <button onClick={toggleStatus}>
        {todo.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
