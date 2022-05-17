import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/UserContext';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}
