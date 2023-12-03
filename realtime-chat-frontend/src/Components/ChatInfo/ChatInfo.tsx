import { useChatContext } from '../../contexts/ChatContext';
import Avatar from '../Avatar';

function ChatInfo() {
  const { userName, users } = useChatContext();

  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="ml-2 font-bold text-2xl">RealTime Chat</div>
      </div>
      <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <Avatar userName={userName} />
        </div>
        <div className="text-sm font-semibold mt-2">{userName}</div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Online Users</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {users.length}
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.userName}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                <Avatar userName={user.userName} />
              </div>
              <div className="ml-2 text-sm font-semibold">{user.userName}</div>
              {user.userName === userName ? (
                <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-8 w-8 rounded leading-none">
                  You
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInfo;
