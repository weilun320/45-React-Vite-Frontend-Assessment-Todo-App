import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../Context/TodoContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { newUserTodos } from "../features/todos/todosSlice";
import { newUserStatistics } from "../features/statistics/statisticsSlice";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const users = useSelector((state) => state.user);
  const setToken = useContext(TodoContext).setToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Please fill up all field.");
      return;
    }
    else if (password !== confirmPassword) {
      setErrorMessage("Password does not match confirm password.");
      return;
    }

    const existed = users.find((user) => user.username === username);

    if (existed) {
      setErrorMessage("User existed. Please use another email.");
      return;
    }
    else {
      const id = Date.now();

      dispatch(addUser({ id, username, password }));
      dispatch(newUserTodos({ userId: id }));
      dispatch(newUserStatistics({ userId: id }));
      setToken(id);
      navigate("/");
    }
  }

  return (
    <Container>
      <h2 className="my-3">Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter email"
            type="email"
            value={username}
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
          />
        </Form.Group>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Button variant="warning" type="submit">Register</Button>
      </Form>
    </Container>
  );
}
