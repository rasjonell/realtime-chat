import { ChangeEvent, useState } from 'react';

import { useAuthContext } from '../Contexts/AuthContext';

function LoginPage() {
  const { login, signup, isLoading } = useAuthContext();
  const [action, setAction] = useState<'signin' | 'signup'>('signin');
  const [authData, setAuthData] = useState({ username: '', password: '' });

  const toggleAction = () => {
    setAction(action === 'signin' ? 'signup' : 'signin');
  };

  const handleInputChange =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      setAuthData({ ...authData, [name]: e.target.value });
    };

  const handleSubmit = () => {
    const submitter = action === 'signin' ? login : signup;
    submitter(authData.username, authData.password);
  };

  const disabled = !(authData.username && authData.password);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {action === 'signin' ? 'Sign in to your account' : 'Create a new account'}
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  required
                  type="text"
                  value={authData.username}
                  placeholder="Your Username"
                  onChange={handleInputChange('username')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={authData.password}
                  onChange={handleInputChange('password')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  disabled={disabled}
                  onClick={handleSubmit}
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? '...' : action === 'signin' ? 'Sign in' : 'Create Account'}
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {action === 'signin' ? 'Don’t have an account yet? ' : 'Already have an account? '}
                <button
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={toggleAction}
                >
                  {action === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
