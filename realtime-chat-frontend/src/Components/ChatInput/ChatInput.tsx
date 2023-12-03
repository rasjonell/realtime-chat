import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useChatContext } from '../../Contexts/ChatContext';

function ChatInput() {
  const { sendMessage } = useChatContext();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    sendMessage(message);
    setMessage('');
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-gray-700 w-full px-4">
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            value={message}
            onKeyDown={handleKeyPress}
            onChange={handleMessageChange}
            className="flex w-full border border-gray-500 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-gray-600"
          />
        </div>
      </div>
      <div className="ml-4">
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
        >
          <span>Send</span>
          <span className="ml-2">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transform rotate-45 -mt-px"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
export default ChatInput;
