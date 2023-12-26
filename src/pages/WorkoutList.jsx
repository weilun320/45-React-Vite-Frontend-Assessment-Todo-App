import { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TodoContext } from "../Context/TodoContext";
import { addWorkout, deleteWorkout, editWorkout } from "../features/workoutList/workoutListSlice";

export default function WorkoutList() {
  const [workout, setWorkout] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateWorkout, setUpdateWorkout] = useState(null);

  const token = useContext(TodoContext).token;
  const workoutList = useSelector((state) =>
    state.workoutList.find((list) => list.userId === token)
  );
  const workoutInputRef = useRef();
  const dispatch = useDispatch();

  const handleFocusWorkoutInput = () => {
    workoutInputRef.current.focus();
  };

  useEffect(() => {
    handleFocusWorkoutInput();
  });

  const handleAdd = () => {
    if (!workout) {
      return;
    }

    const existed = workoutList.workoutLists.find((list) => list.name === workout);

    if (!existed) {
      dispatch(addWorkout({ userId: token, name: workout }));
      setWorkout("");
      handleFocusWorkoutInput();
    }
  };

  const handleEdit = (id) => {
    if (!isEdit) {
      const editWorkout = workoutList.workoutLists.find((list) => list.id === id);
      setIsEdit(true);
      setWorkout(editWorkout.name);
      setUpdateWorkout(editWorkout);
      handleFocusWorkoutInput();
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteWorkout({ userId: token, id }))
  }

  const handleUpdate = () => {
    if (!workout) {
      setWorkout(updateWorkout.name);
      return;
    }

    const existed = workoutList.workoutLists.find((list) => list.name === workout);

    if (!existed) {
      dispatch(editWorkout({ userId: token, id: updateWorkout.id, name: workout }));
      handleCancel();
    }
  }

  const handleCancel = () => {
    setIsEdit(false);
    setWorkout("");
    setUpdateWorkout("");
    handleFocusWorkoutInput();
  }

  return (
    <Container>
      <h2 className="my-3">Workout List</h2>
      <p className="my-3">Add your workout preferences.</p>
      <Container>
        <Link to="/">Skip for now</Link>
      </Container>
      <InputGroup className="my-3">
        <Form.Control
          onChange={(e) => setWorkout(e.target.value)}
          placeholder="Plank / Squat / Lunge / Russian twist"
          ref={workoutInputRef}
          type="text"
          value={workout}
        />
        {isEdit ?
          <>
            <Button variant="success" onClick={handleUpdate}>
              <i className="bi bi-check-lg"></i>
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              <i className="bi bi-x-lg"></i>
            </Button>
          </>
          :

          <Button variant="success" onClick={handleAdd}>
            <i className="bi bi-plus"></i>
          </Button>
        }
      </InputGroup>
      {workoutList && workoutList.workoutLists && (
        [...workoutList.workoutLists].reverse().map((list) =>
          <InputGroup className="my-1" key={list.id}>
            <Form.Control
              readOnly
              type="text"
              value={list.name}
            />
            <Button variant="outline-primary" onClick={() => handleEdit(list.id)}>
              <i className="bi bi-pencil"></i>
            </Button>
            <Button variant="outline-danger" onClick={() => handleDelete(list.id)}>
              <i className="bi bi-trash"></i>
            </Button>
          </InputGroup>
        ))}
    </Container>
  );
}
