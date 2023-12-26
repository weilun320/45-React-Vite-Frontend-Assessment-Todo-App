import { useContext } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import { TodoContext } from "../Context/TodoContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TodoHistory() {
  const token = useContext(TodoContext).token;
  const todos = useSelector((state) =>
    state.todos.find((todo) => todo.userId === token)
  );
  const statistics = useSelector((state) =>
    state.statistics.find((statistic) => statistic.userId === token)
  );
  const completedTodos = todos.todos.filter((todo) => todo.completed);

  if (todos.todos.length === 0 || completedTodos.length === 0 || statistics.statistics.length === 0) {
    return (
      <Container>
        <h2 className="my-3">History</h2>
        <p>You not complete any workout yet.</p>
        <Button as={Link} to="/" variant="warning">Click here to start workout!</Button>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-3">History</h2>
      <Accordion>
        {todos && todos.todos && [...todos.todos].reverse().map((todo) => {
          const currentStatistic = statistics.statistics.find((statistic) =>
            statistic.todoId === todo.id
          );
          const duration = currentStatistic ? currentStatistic.duration : 0;
          const durationHours = duration ? Math.floor(duration / 3600) : 0;
          const durationMinutes = duration ? Math.floor(duration / 60) % 60 : 0;

          const completedDate = new Date(todo.completedDate);

          return todo.completed && (
            <Accordion.Item key={todo.id} eventKey={todo.id}>
              <Accordion.Header>{todo.title}</Accordion.Header>
              <Accordion.Body>
                {todo.description.split("\n").map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
                <p>
                  <i className="bi bi-clipboard-check me-2"></i>
                  {completedDate.toLocaleString("en-GB")}
                </p>
                <p>
                  <i className="bi bi-stopwatch me-2"></i>
                  {durationHours < 10 && "0"}{durationHours}:
                  {durationMinutes < 10 && "0"}{durationMinutes}:
                  {duration % 60 < 10 && "0"}{duration % 60}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
}
