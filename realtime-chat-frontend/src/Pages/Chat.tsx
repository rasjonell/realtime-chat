import ChatRoom from '../Components/ChatRoom';
import { ChatContextProvider } from '../contexts/ChatContext';

function ChatPage() {
  return (
    <ChatContextProvider>
      <ChatRoom />
    </ChatContextProvider>
  );
}

export default ChatPage;
