import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useChatContext } from '../../contexts/ChatContext';

function ChooseUsername() {
  const [userName, setUserName] = useState('');
  const { join, joinError, userName: registeredUserName } = useChatContext();

  const handleJoin = () => {
    join(userName);
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoin();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <section className="bg-white dark:bg-gray-900 w-1/2 sm:w-3/4 rounded-xl">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Join The Chat!
            </h2>
            <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Enter a username and connect with friends, family and communities of people and
              dicsuss any topics of interest.
            </p>
            <div>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <input
                  value={userName}
                  onKeyDown={handleKeyPress}
                  onChange={handleUserNameChange}
                  placeholder="Enter Your Username"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                />
                <button
                  onClick={handleJoin}
                  className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <svg
                    fill="none"
                    aria-hidden="true"
                    viewBox="0 0 14 10"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 text-gray-800 dark:text-white"
                  >
                    <path
                      strokeWidth="2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                  Join!
                </button>
              </div>
              {joinError ? (
                <p className="text-red-300 mt-3">
                  Username: "{registeredUserName}" is already registered.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChooseUsername;
