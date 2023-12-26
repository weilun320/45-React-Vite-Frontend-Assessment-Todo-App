import { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../features/todos/todosSlice";
import { TodoContext } from "../Context/TodoContext";
import { updateStatistic } from "../features/statistics/statisticsSlice";

export default function TodoModal({ show, handleClose, todo }) {
  const [completed, setCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerHours, setTimerHours] = useState(0);

  const token = useContext(TodoContext).token;
  const statistics = useSelector((state) =>
    state.statistics.find((statistic) => statistic.userId === token)
  );
  const currentStatistic = statistics.statistics.find((statistic) => statistic.todoId === todo.id);
  const dispatch = useDispatch();

  useEffect(() => {
    setCompleted(todo.completed);

    if (currentStatistic && currentStatistic.duration) {
      setTimer(currentStatistic.duration);
      const newMinutes = Math.floor(currentStatistic.duration / 60) % 60;
      const newHours = Math.floor(currentStatistic.duration / 3600);

      setTimerMinutes(newMinutes);
      setTimerHours(newHours);
    }
  }, [todo, currentStatistic]);

  const startTimer = () => {
    if (timerInterval === null) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;

          const newMinutes = Math.floor(newTimer / 60) % 60;
          const newHours = Math.floor(newTimer / 3600);

          if (newTimer % 60 === 0) {
            setTimerMinutes(newMinutes);
          }

          if (newTimer % 3600 === 0) {
            setTimerHours(newHours);
          }

          return newTimer;
        });
      }, 1000);

      setTimerInterval(intervalId);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(0);
    setTimerMinutes(0);
    setTimerHours(0);
  };

  useEffect(() => {
    return () => clearInterval(timerInterval);
  }, [timerInterval]);

  const handleCompletedChange = () => {
    if (todo.completed !== completed) {
      dispatch(updateStatus({ userId: token, id: todo.id, completed }));
    }
    dispatch(updateStatistic({ userId: token, todoId: todo.id, duration: timer, completed }));

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCompletedChange} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{todo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {todo.description.split("\n").map((desc, index) => (
          <p key={index}>
            {desc}
          </p>
        ))}
      </Modal.Body>
      <Modal.Footer className="justify-content-center justify-content-sm-between">
        <div>
          <p className="text-center">
            {timerHours < 10 && "0"}{timerHours}:{timerMinutes < 10 && "0"}{timerMinutes}:{timer % 60 < 10 && "0"}{timer % 60}
          </p>
          <InputGroup>
            <Button variant="secondary" onClick={startTimer} disabled={completed}>
              <i className="bi bi-play-fill"></i>
            </Button>
            <Button variant="secondary" onClick={pauseTimer} disabled={completed}>
              <i className="bi bi-pause-fill"></i>
            </Button>
            <Button variant="secondary" onClick={resetTimer} disabled={completed}>
              <i className="bi bi-arrow-clockwise"></i>
            </Button>
          </InputGroup>
        </div>
        <Form.Group controlId="completed">
          <Form.Check
            checked={completed}
            label="Mark as completed"
            onChange={(e) => setCompleted(e.target.checked)}
            type="checkbox"
          />
        </Form.Group>
      </Modal.Footer>
    </Modal>
  );
}
