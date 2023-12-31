import { Navigate } from 'react-router-dom';

import ChatInfo from '../ChatInfo';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';
import { useChatContext } from '../../Contexts/ChatContext';
import { useAuthContext } from '../../Contexts/AuthContext';

function ChatRoom() {
  const { user } = useAuthContext();
  const { messages } = useChatContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen antialiased text-white bg-gray-900">
      <div className="w-0 invisible md:visible md:w-64">
        <ChatInfo />
      </div>
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-800 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                {messages.length ? (
                  <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((message) => (
                      <ChatMessage
                        message={message}
                        key={message.createdAt}
                        isOwn={message.author === user.username}
                      />
                    ))}
                    <div className="col-start-1 col-end-8 p-3 rounded-lg"></div>
                  </div>
                ) : (
                  <h1 className="text-center">No Messages Yet</h1>
                )}
              </div>
            </div>
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
