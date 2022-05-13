import { Navigate } from 'react-router-dom';

// unsure if I should be declaring type inline or some other way
export default function RequireAuth({ children }: { children: JSX.Element }) {
  const storageId = window.localStorage.getItem('id');

  // initially tried checking for user in context with local storage - felt more robust
  // redirecting back from logging in user context isnt set yet failing the auth check
  if (!storageId) {
    return <Navigate to="/" />;
  }
  return children;
}
