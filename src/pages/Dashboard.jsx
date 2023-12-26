import { useContext } from "react";
import { Button, Container, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TodoContext } from "../Context/TodoContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const token = useContext(TodoContext).token;
  const todos = useSelector((state) =>
    state.todos.find((todo) => todo.userId === token)
  );
  const statistics = useSelector((state) =>
    state.statistics.find((statistic) => statistic.userId === token)
  );

  if (todos.todos.length === 0 || statistics.statistics.length === 0) {
    return (
      <Container>
        <h2 className="my-3">Dashboard</h2>
        <p>You have not created any workout.</p>
        <Button as={Link} to="/" variant="warning">Click here to add!</Button>
      </Container>
    );
  }

  const completedTodos = todos.todos.filter((todo) => todo.completed);
  const completedTodosCount = completedTodos.length * 100 / todos.todos.length;
  const uncompletedTodosCount = (todos.todos.length - completedTodos.length) * 100 / todos.todos.length;

  const completedTodosDuration = statistics.statistics.filter((statistic) => statistic.completed);
  const totalDuration = completedTodosDuration.reduce((total, statistic) => total + statistic.duration, 0);
  const totalDurationHours = totalDuration ? Math.floor(totalDuration / 3600) : 0;
  const totalDurationMinutes = totalDuration ? Math.floor(totalDuration / 60) % 60 : 0;

  const avgDurtionHours = completedTodos.length ? Math.floor(totalDuration / completedTodos.length / 3600) : 0;
  const avgDurationMinutes = completedTodos.length ? Math.floor(totalDuration / completedTodos.length / 60) % 60 : 0;
  const avgDurationSeconds = completedTodos.length ? Math.floor(totalDuration / completedTodos.length) % 60 : 0;

  return (
    <Container>
      <h2 className="my-3">Dashboard</h2>
      <h4 className="my-3">Overall Todos Completion</h4>
      <ProgressBar className="fs-5 mb-5" style={{ height: 32 }}>
        <ProgressBar
          variant="success"
          now={completedTodosCount}
          label={"Completed: " + completedTodos.length}
          key={1}
        />
        <ProgressBar
          variant="danger"
          now={uncompletedTodosCount}
          label={"Uncompleted: " + (todos.todos.length - completedTodos.length)}
          key={2}
        />
      </ProgressBar>
      <h4 className="my-3">
        {"Total Workout Duration: "}
        {totalDurationHours < 10 && "0"}{totalDurationHours}:
        {totalDurationMinutes < 10 && "0"}{totalDurationMinutes}:
        {totalDuration % 60 < 10 && "0"}{totalDuration % 60}
      </h4>
      <h4 className="my-3">
        {"Average Workout Duration: "}
        {avgDurtionHours < 10 && "0"}{avgDurtionHours}:
        {avgDurationMinutes < 10 && "0"}{avgDurationMinutes}:
        {avgDurationSeconds % 60 < 10 && "0"}{avgDurationSeconds}
      </h4>
    </Container>
  );
}
