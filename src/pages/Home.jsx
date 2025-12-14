import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <div className="container">
      <h1>FastAPI + React Todo App</h1>
      <TodoForm refresh={() => window.location.reload()} />
      <TodoList />
    </div>
  );
};

export default Home;
