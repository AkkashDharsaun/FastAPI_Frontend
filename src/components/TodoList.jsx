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
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-md mx-auto">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="inline-flex items-center text-gray-500">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading tasks...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load tasks</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchTodos}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary Stats */}
      <div className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Progress Summary</p>
            <div className="flex items-center mt-1">
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  style={{ width: `${todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-semibold text-gray-900">
                {completedTodos.length} of {todos.length} completed
              </span>
            </div>
          </div>
          <button
            onClick={fetchTodos}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Active Tasks Section */}
      {activeTodos.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Tasks</h3>
            <span className="ml-2 px-2 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">
              {activeTodos.length}
            </span>
          </div>
          <div className="space-y-4">
            {activeTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} refresh={fetchTodos} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks Section */}
      {completedTodos.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Completed Tasks</h3>
            <span className="ml-2 px-2 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
              {completedTodos.length}
            </span>
          </div>
          <div className="space-y-4">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} refresh={fetchTodos} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
