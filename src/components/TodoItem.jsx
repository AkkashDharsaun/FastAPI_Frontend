import { deleteTodo, updateTodo } from "../api/todoApi";
import { useState } from "react";

const TodoItem = ({ todo, refresh }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleStatus = async () => {
    setIsUpdating(true);
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });
      refresh();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setIsDeleting(true);
    try {
      await deleteTodo(todo.id);
      refresh();
    } finally {
      setIsDeleting(false);
    }
  };
return (
  <div
    className={`relative bg-white border rounded-2xl p-4 sm:p-6 mb-4 transition-all duration-300 hover:shadow-xl ${
      todo.completed ? "border-green-200 bg-green-50" : "border-gray-200"
    }`}
  >
    {/* Left accent */}
    <div
      className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
        todo.completed ? "bg-green-500" : "bg-blue-500"
      }`}
    />

    <div className="flex gap-3 sm:gap-4 ml-3 sm:ml-4">
      {/* Status button */}
      <button
        onClick={toggleStatus}
        disabled={isUpdating}
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          todo.completed
            ? "bg-green-100"
            : "bg-gray-100"
        }`}
      >
        {todo.completed ? "✓" : ""}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3
            className={`text-base sm:text-lg font-semibold break-words ${
              todo.completed
                ? "line-through text-gray-500"
                : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>

          <span
            className={`self-start sm:self-auto px-3 py-1 text-xs rounded-full ${
              todo.completed
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {todo.completed ? "Completed" : "Active"}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm sm:text-base text-gray-600 break-words">
          {todo.description}
        </p>

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xs sm:text-sm text-gray-500">
            Created just now
          </span>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={toggleStatus}
              disabled={isUpdating}
              className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-700"
            >
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
    

export default TodoItem;
