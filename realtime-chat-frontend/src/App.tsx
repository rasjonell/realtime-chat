import { Routes, Route } from 'react-router-dom';

import ChatPage from './Pages/Chat';
import LoginPage from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import { ChatContextProvider } from './Contexts/ChatContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatContextProvider>
                <ChatPage />
              </ChatContextProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
