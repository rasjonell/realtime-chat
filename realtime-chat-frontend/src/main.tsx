import React from 'react';
import ReactDOM from 'react-dom/client';

import ChatRoom from './Components/ChatRoom';
import { ChatContextProvider } from './contexts/ChatContext.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatContextProvider>
      <ChatRoom />
    </ChatContextProvider>
  </React.StrictMode>,
);
