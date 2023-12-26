import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { TodoContext } from "../Context/TodoContext";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todos/todosSlice";
import { deleteStatistic } from "../features/statistics/statisticsSlice";

export default function DeleteTodoModal({ show, handleClose, todo }) {
  const token = useContext(TodoContext).token;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo({ userId: token, id: todo.id }));
    dispatch(deleteStatistic({ userId: token, todoId: todo.id }));
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
