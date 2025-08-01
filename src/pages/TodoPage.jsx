import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import EditModal from '../components/EditModal';
import ConfirmDelete from '../components/ConfirmDelete';
import FilterSearchBar from '../components/FilterSearchBar';
import { getTodos } from '../api/todo';
import Navbar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';
import ExportDropdown from '../components/ExportDropdown';


export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', search: '', page: 1 });
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState({ message: '', variant: '', show: false });

  const showToast = (msg, variant = "success") => setToast({ show: true, message: msg, variant });
  const hideToast = () => setToast({ show: false, message: '', variant: '' });

  const fetchTodos = async () => {
    try {
      const res = await getTodos(filters);
      setTodos(res.data.todos);
      setTotal(res.data.total);
    } catch (err) {
      showToast('Error fetching todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  return (
    <>
    <Navbar />
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h2 className="mb-4 text-center">Your Todos</h2>
          <div className="d-flex justify-content-between mb-3">
            
            <FilterSearchBar filters={filters} setFilters={setFilters} />
            <ExportDropdown />
          </div>
          <TodoForm onSuccess={fetchTodos} onToast={showToast}/>
          <TodoList
            todos={todos}
            setEditTodo={setEditTodo}
            setDeleteTodo={setDeleteTodo}
            filters={filters}
            setFilters={setFilters}
            total={total}
            refreshTodos={fetchTodos}
          />
          {/* Modals */}
          {editTodo && <EditModal todo={editTodo} onClose={() => setEditTodo(null)} onSuccess={fetchTodos} onToast={showToast}/>}
          {deleteTodo && <ConfirmDelete todo={deleteTodo} onClose={() => setDeleteTodo(null)} onSuccess={fetchTodos} onToast={showToast}/>}
        </div>
      </div>
     
    </div>
     <ToastMessage
      show={toast.show}
      message={toast.message}
      onClose={hideToast}
      variant={toast.variant || 'success'}
    />
    </>
  );
}
