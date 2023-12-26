import { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import DeleteTodoModal from "./DeleteTodoModal";
import UpdateTodoModal from "./UpdateTodoModal";
import TodoModal from "./TodoModal";

export default function TodoCard({ todos }) {
  const [show, setShow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [action, setAction] = useState("");

  const handleClose = () => {
    setSelectedTodo(null);
    setAction("");
    setShow(false);
  }

  const handleOpen = (todo) => {
    setSelectedTodo(todo);
    setAction("open");
    setShow(true);
  }

  const handleUpdate = (todo) => {
    setSelectedTodo(todo);
    setAction("update");
    setShow(true);
  }

  const handleDelete = (todo) => {
    setSelectedTodo(todo);
    setAction("delete");
    setShow(true);
  }

  return (
    <>
      {todos && todos.todos && todos.todos.map((todo) => {
        const completed = todo.completed;
        const completedDate = new Date(todo.completedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isCompletedToday = completedDate.getTime() >= today.getTime();

        return (isCompletedToday || !completed) && (
          <Col className="mb-3" md={4} key={todo.id}>
            <Card border={completed ? "success" : "danger"} bg="light" className="h-100">
              <Card.Header className={`text-light ${completed ? "bg-success" : "bg-danger"}`}>
                {!completed && "Not "}Completed
              </Card.Header>
              <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                {todo.description.split("\n").map((desc, index) => (
                  <Card.Text key={index}>
                    {desc}
                  </Card.Text>
                ))}
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={() => handleOpen(todo)}>
                  <i className="bi bi-box-arrow-up-right"></i>
                </Button>
                <Button className="border-0" variant="outline-secondary ms-2" onClick={() => handleUpdate(todo)}>
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button className="border-0" variant="outline-danger ms-2" onClick={() => handleDelete(todo)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        );
      })}
      {action === "open" && selectedTodo && (
        <TodoModal
          show={show}
          handleClose={handleClose}
          todo={selectedTodo}
        />
      )}
      {action === "update" && selectedTodo && (
        <UpdateTodoModal show={show} handleClose={handleClose} todo={selectedTodo} />
      )}
      {action === "delete" && selectedTodo && (
        <DeleteTodoModal show={show} handleClose={handleClose} todo={selectedTodo} />
      )}
    </>
  );
}
