import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageLoader from "./PageLoader";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader label="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
