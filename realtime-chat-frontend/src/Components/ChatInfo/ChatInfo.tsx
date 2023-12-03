import Avatar from '../Avatar';
import { useChatContext } from '../../Contexts/ChatContext';
import { useAuthContext } from '../../Contexts/AuthContext';

function ChatInfo() {
  const { logout } = useAuthContext();
  const { userName, users } = useChatContext();

  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-gray-900 flex-shrink-0 text-white">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="ml-2 font-bold text-2xl">RealTime Chat</div>
      </div>
      <div className="flex flex-col items-center bg-gray-700 border border-gray-600 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <Avatar userName={userName} />
        </div>
        <div className="flex items-center mt-2">
          <div className="text-sm font-semibold">{userName}</div>
          <button onClick={logout} className="ml-2 bg-blue-500 hover:bg-blue-600 p-1 rounded-full">
            <svg
              fill="none"
              aria-hidden="true"
              viewBox="0 0 20 18"
              xmlns="http://www.w3.org/2000/svg"
              className="p-0.5 w-5 h-5 text-white"
            >
              <path
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Online Users</span>
          <span className="flex items-center justify-center bg-blue-700 h-4 w-4 rounded-full">
            {users.length}
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.userName}
              className="flex flex-row items-center hover:bg-gray-700 rounded-xl p-2"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full">
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
