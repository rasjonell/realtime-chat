import { Routes, Route } from 'react-router-dom';

import ChatPage from './Pages/Chat';
import LoginPage from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
