import { useState } from 'react';
import { createTodo } from '../api/todo';

export default function TodoForm({ onSuccess, onToast }) {
  const [form, setForm] = useState({ title: '', dueDate: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTodo(form);
      onToast('Todo created successfully!', 'success');
      setForm({ title: '', dueDate: '' });
      onSuccess();
    } catch (err) {
      onToast(err.response?.data?.error || 'Create failed', 'danger');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border rounded p-3 shadow-sm">
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter todo title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}