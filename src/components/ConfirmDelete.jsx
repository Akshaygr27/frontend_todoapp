import { Modal, Button } from 'react-bootstrap';
import { deleteTodo } from '../api/todo';

export default function ConfirmDelete({ todo, onClose, onSuccess, onToast }) {
  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      onToast('Todo deleted successfully!', 'success');
      onSuccess();
      onClose();
    } catch (err) {
      onToast(err.response?.data?.error || 'Delete failed', 'danger');
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