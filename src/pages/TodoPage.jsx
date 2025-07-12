import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import EditModal from '../components/EditModal';
import ConfirmDelete from '../components/ConfirmDelete';
import FilterSearchBar from '../components/FilterSearchBar';
import { getTodos } from '../api/todo';
import Navbar from '../components/Navbar';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', search: '', page: 1 });
  const [total, setTotal] = useState(0);

  const fetchTodos = async () => {
    try {
      const res = await getTodos(filters);
      setTodos(res.data.todos);
      setTotal(res.data.total);
    } catch (err) {
      alert('Error fetching todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  return (
    <>
    <Navbar />
    <div className="container py-4">
      <h2 className="mb-4 text-center">Your Todos</h2>
      <FilterSearchBar filters={filters} setFilters={setFilters} />
      <TodoForm onSuccess={fetchTodos} />
      <TodoList
        todos={todos}
        setEditTodo={setEditTodo}
        setDeleteTodo={setDeleteTodo}
        filters={filters}
        setFilters={setFilters}
        total={total}
      />
      {editTodo && <EditModal todo={editTodo} onClose={() => setEditTodo(null)} onSuccess={fetchTodos} />}
      {deleteTodo && <ConfirmDelete todo={deleteTodo} onClose={() => setDeleteTodo(null)} onSuccess={fetchTodos} />}
    </div>
    </>
  );
}
