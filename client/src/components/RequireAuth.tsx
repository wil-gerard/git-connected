import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const session = window.localStorage.getItem('session')

  return session ? children : <Navigate to="/" replace />
}
