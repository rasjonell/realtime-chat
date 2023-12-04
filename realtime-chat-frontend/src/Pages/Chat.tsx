import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../Components/Loading';
import ChatRoom from '../Components/ChatRoom';
import { useAuthContext } from '../Contexts/AuthContext';
import { useChatContext } from '../Contexts/ChatContext';

function ChatPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { join, isConnected } = useChatContext();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isConnected) {
      return;
    }

    join();
  }, [user, isConnected]);

  return isConnected ? <ChatRoom /> : <Loading />;
}

export default ChatPage;
