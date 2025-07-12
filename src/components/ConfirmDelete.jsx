import { Modal, Button } from 'react-bootstrap';
import { deleteTodo } from '../api/todo';

export default function ConfirmDelete({ todo, onClose, onSuccess }) {
  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>{todo.title}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>No</Button>
        <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}