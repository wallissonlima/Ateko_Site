import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: any}) {
  const token = localStorage.getItem('access_token');
console.log(token);
  if (!token) {
    
    return <Navigate to="/" replace />;
  }

  return children;
}
