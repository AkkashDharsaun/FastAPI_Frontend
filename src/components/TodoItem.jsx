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
    <div className={`group relative bg-white border rounded-2xl p-6 mb-4 transition-all duration-300 hover:shadow-xl hover:border-gray-200 ${
      todo.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      {/* Decorative accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
        todo.completed ? 'bg-green-500' : 'bg-blue-500'
      }`}></div>
      
      <div className="flex items-start ml-4">
        {/* Status indicator */}
        <button
          onClick={toggleStatus}
          disabled={isUpdating}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 ${
            todo.completed 
              ? 'bg-green-100 hover:bg-green-200' 
              : 'bg-gray-100 hover:bg-gray-200'
          } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUpdating ? (
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : todo.completed ? (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold truncate ${
              todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            <span className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full ${
              todo.completed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          
          <p className={`mt-2 text-gray-600 ${
            todo.completed ? 'opacity-75' : ''
          }`}>
            {todo.description}
          </p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Created just now</span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={toggleStatus}
                disabled={isUpdating}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                  todo.completed
                    ? 'text-green-700 bg-green-50 hover:bg-green-100'
                    : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : todo.completed ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Mark Incomplete
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Mark Complete
                  </>
                )}
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
