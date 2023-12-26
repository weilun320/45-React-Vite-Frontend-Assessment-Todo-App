import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import { Button, Form, Modal } from "react-bootstrap";

export default function AddTodoModal({ show, handleClose, token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!title || !description) {
      setErrorMessage("Please fill up all field.");
      return;
    }

    dispatch(addTodo({ userId: token, title, description }));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Abs"
              type="text"
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Russian twist (20reps - 3sets)\nPlank (20s - 3sets)\nHeel touch (20reps - 3sets)"}
              rows={3}
              value={description}
            />
          </Form.Group>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
