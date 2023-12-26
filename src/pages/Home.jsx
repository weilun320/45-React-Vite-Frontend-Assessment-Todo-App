import { Button, Container, Image, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard";
import { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import AddTodoModal from "../components/AddTodoModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const token = useContext(TodoContext).token;
  const todos = useSelector((state) =>
    state.todos.find((todo) => todo.userId === token)
  );
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleOpen = () => {
    setShow(true);
  }

  return (
    <>
      {token ? (
        <Container>
          <Button variant="warning my-3" onClick={handleOpen}>
            <i className="bi bi-plus-square"></i>
          </Button>
          {todos && todos.todos.length === 0 ? (
            <p>
              You don&apos;t have any workout todo. Click on the above button to add one.
            </p>
          )
            : (
              <CardGrid todos={todos} />
            )
          }
        </Container>
      )
        : (
          <div className="position-relative">
            <Image
              alt="Workout"
              className="w-100 object-fit-cover home-bg"
              src="./assets/home-bg.jpg"
            />
            <div className="position-absolute h-100 w-100 top-50 start-50 translate-middle darken-bg">
            </div>
            <div className="position-absolute top-50 start-50 translate-middle text-center">
              <h1 className="text-light title mb-3 mb-sm-5">Track Your Fitness Session</h1>
              <Button as={Link} className="home-button" to="/register" variant="warning">Register Now!</Button>
            </div>
          </div>
        )
      }
      <AddTodoModal show={show} handleClose={handleClose} token={token} />
    </>
  );
}

export function CardGrid({ todos }) {
  return (
    <Row className="my-3">
      <TodoCard todos={todos} />
    </Row>
  );
}