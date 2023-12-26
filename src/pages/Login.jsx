import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../Context/TodoContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const users = useSelector((state) => state.user);
  const setToken = useContext(TodoContext).setToken;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Please fill up all field.");
      return;
    }

    const existed = users.find((user) =>
      user.username === username && user.password === password
    );

    if (existed) {
      setToken(existed.id);
      navigate("/");
    }
    else {
      setErrorMessage("Invalid email/password.");
      return;
    }
  }

  return (
    <Container>
      <h2 className="my-3">Login</h2>
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
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Button variant="warning" type="submit">Login</Button>
      </Form>
    </Container>
  );
}
