import { useContext } from 'react'
import { TodoContext } from '../Context/TodoContext';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const token = useContext(TodoContext).token;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
