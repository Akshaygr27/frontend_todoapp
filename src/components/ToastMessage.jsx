import { Toast, ToastContainer } from 'react-bootstrap';

export default function ToastMessage({ show, message, onClose, variant }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide bg={variant}>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

