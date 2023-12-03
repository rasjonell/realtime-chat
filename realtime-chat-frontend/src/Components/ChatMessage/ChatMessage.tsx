import Avatar from '../Avatar';
import type { Message } from '../../contexts/ChatContext';

type Props = {
  isOwn: boolean;
  message: Message;
};

function ChatMessage({ message: { message, author, createdAt }, isOwn }: Props) {
  return isOwn ? (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex flex-items-center justify-center h-15 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          <Avatar userName={author} />
        </div>
        <div className="flex flex-col mr-3">
          <div className="relative text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl max-w-md break-words">
            <div>{message}</div>
          </div>
          <p className="text-xs mt-1.5 text-gray-800 text-end">
            {author} - {new Date(createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          <Avatar userName={author} />
        </div>
        <div className="flex flex-col ml-3">
          <div className="relative text-sm bg-white py-2 px-4 shadow rounded-xl max-w-md break-words">
            <div>{message}</div>
          </div>
          <p className="text-xs mt-1.5 text-gray-800 text-start">
            {author} - {new Date(createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
