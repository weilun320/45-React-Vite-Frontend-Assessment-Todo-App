import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { TodoContext } from "./Context/TodoContext";
import { useSelector } from "react-redux";
import useLocalStorage from "use-local-storage";
import RequireAuth from "./auth/RequireAuth";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TodoHistory from "./pages/TodoHistory";
import ReminderToast from "./components/ReminderToast";
import "./App.css";

export function Layout({ token, setToken }) {
  const todos = useSelector((state) =>
    state.todos.find((todo) => todo.userId === token)
  );

  const todayCompletedTodo = todos && todos.todos
    ? todos.todos.filter((todo) => {
      if (todo.completedDate) {
        const completedDate = new Date(todo.completedDate);
        const today = new Date();

        completedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (completedDate.getTime() === today.getTime()) {
          return todo;
        }
      }
    })
    : [];

  const handleLogout = () => {
    setToken(null);
    return <Navigate to="/" />;
  };

  return (
    <>
      <Navbar bg="light" expand="md" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Fitness Todo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {token ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/history">History</Nav.Link>
                  <Nav.Link className="text-dark text-opacity-75 link-danger" onClick={handleLogout}>Logout</Nav.Link>
                </>
              )
                : (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="main-container">
        {token ? (
          <>
            <Outlet />
            {!todayCompletedTodo.length && (<ReminderToast />)}
          </>
        )
          : (
            <Outlet />
          )
        }
        <Footer />
      </div>
    </>
  );
}

export function Footer() {
  return (
    <Container className="text-center p-3 mt-auto">
      &copy; 2023 Wei Lun. All rights reserved.
    </Container>
  );
}

function App() {
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <TodoContext.Provider value={{ token, setToken }}>
      <BrowserRouter basename="/45-React-Vite-Frontend-Assessment-Todo-App/">
        <Routes>
          <Route path="/" element={<Layout token={token} setToken={setToken} />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
            />
            <Route path="history" element={
              <RequireAuth>
                <TodoHistory />
              </RequireAuth>
            }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App;
