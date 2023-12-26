import { Toast, ToastContainer } from "react-bootstrap";

export default function ReminderToast() {
  return (
    <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
      <Toast bg="warning">
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Reminder!</strong>
        </Toast.Header>
        <Toast.Body>You have not done any workout today.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
