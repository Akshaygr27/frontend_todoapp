import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { updateTodo } from '../api/todo';

export default function EditModal({ todo, onClose, onSuccess, onToast }) {
  const [form, setForm] = useState({ title: todo.title, dueDate: todo.dueDate.slice(0, 10) });

  const handleSubmit = async () => {
    try {
      await updateTodo(todo._id, form);
      onToast('Todo updated successfully!', 'success');
      onSuccess();
      onClose();
      
    } catch (err) {
      onToast(err.response?.data?.error || 'Update failed', 'danger');
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="date"
          className="form-control"
          value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}