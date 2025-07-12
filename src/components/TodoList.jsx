import React from 'react';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';

export default function TodoList({ todos, setEditTodo, setDeleteTodo, filters, setFilters, total }) {
  const totalPages = Math.ceil(total / 5);

  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-muted text-center">No todos found.</p>
      ) : (
        todos.map(todo => (
          <div key={todo._id} className="card mb-2 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-1">{todo.title}</h5>
                <p className="card-text mb-0"><strong>Due:</strong> {new Date(todo.dueDate).toLocaleDateString()}</p>
                <small className={`badge ${todo.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {todo.status}
                </small>
              </div>
              <div>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => setEditTodo(todo)}>Edit</Button>
                <Button variant="outline-danger" size="sm" onClick={() => setDeleteTodo(todo)}>Delete</Button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="outline-secondary"
            disabled={filters.page === 1}
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            className="me-2"
          >
            Prev
          </Button>
          <span className="align-self-center">Page {filters.page} of {totalPages}</span>
          <Button
            variant="outline-secondary"
            disabled={filters.page === totalPages}
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            className="ms-2"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}