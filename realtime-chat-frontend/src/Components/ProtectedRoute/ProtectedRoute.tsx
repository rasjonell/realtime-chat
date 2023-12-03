import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

import { useAuthContext } from '../../Contexts/AuthContext';

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAuthContext();

  console.log('user is', user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
