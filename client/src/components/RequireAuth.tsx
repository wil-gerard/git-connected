import { Children } from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const storageId = window.localStorage.getItem('id');

  if (!storageId) {
    return <Navigate to="/" />;
  }
  return children;
}
