import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setTodos(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedTodos = todos.filter((t) => t.completed);
  const activeTodos = todos.filter((t) => !t.completed);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="py-10 px-3 sm:px-0 max-w-md mx-auto">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-5">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-6">Loading tasks...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="py-12 px-3 sm:px-0 text-center">
        <h3 className="text-lg font-semibold mb-2">Unable to load tasks</h3>
        <p className="text-gray-600 mb-5">{error}</p>
        <button
          onClick={fetchTodos}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (todos.length === 0) {
    return (
      <div className="py-12 px-3 sm:px-0 text-center">
        <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started 🚀</p>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0">
      {/* ================= SUMMARY ================= */}
      <div className="mb-6 p-4 rounded-xl border bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Progress Summary
            </p>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="w-full sm:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${
                      todos.length
                        ? (completedTodos.length / todos.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 sm:ml-4">
                {completedTodos.length} of {todos.length} completed
              </span>
            </div>
          </div>

          <button
            onClick={fetchTodos}
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* ================= ACTIVE TASKS ================= */}
      {activeTodos.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <h3 className="text-base sm:text-lg font-semibold">
              Active Tasks
            </h3>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {activeTodos.length}
            </span>
          </div>

          <div className="space-y-4">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                refresh={fetchTodos}
              />
            ))}
          </div>
        </div>
      )}

      {/* ================= COMPLETED TASKS ================= */}
      {completedTodos.length > 0 && (
        <div>
          <div className="flex items-center mb-3">
            <h3 className="text-base sm:text-lg font-semibold">
              Completed Tasks
            </h3>
            <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              {completedTodos.length}
            </span>
          </div>

          <div className="space-y-4">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                refresh={fetchTodos}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
