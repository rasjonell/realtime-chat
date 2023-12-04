/**
 * Chat Context is responsible for holding global state
 * for the ongoing chat. It also sets up WS Connection and event handlers.
 */
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { Socket } from 'socket.io-client';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { initateSocket } from '../socket';
import { useAuthContext } from './AuthContext';

export type User = {
  username: string;
};

export type Message = {
  author: string;
  message: string;
  createdAt: string;
};

type NewMessageResponse = string | Message;

type NewcomerData = {
  users: User[];
  messages: Message[];
};

type UsersChangedEventData =
  | {
      user: User;
      event: 'joined';
    }
  | {
      event: 'left';
      user: User | null;
    };

type ChatContextData = {
  users: User[];
  join: () => void;
  messages: Message[];
  isConnected: boolean;
  disconnect: () => void;
  sendMessage: (message: string) => void;
};

export const ChatContext = createContext<ChatContextData>({
  users: [],
  messages: [],
  join: () => {},
  isConnected: false,
  disconnect: () => {},
  sendMessage: () => {},
});

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const join = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isConnected) {
      return;
    }

    const newSocket = initateSocket(user.accessToken);

    newSocket.connect();
    setSocket(newSocket);
    newSocket.emit('join', { username: user.username });
  };

  const sendMessage = (message: string): void => {
    if (!(user && socket)) {
      navigate('/login');
      return;
    }

    const filtered = message.trim();
    if (filtered) {
      socket.emit('addNewMessage', { text: filtered });
    }
  };

  const onConnect = (): void => {
    setIsConnected(true);
  };

  const onDisconnect = (): void => {
    setUsers([]);
    setIsConnected(false);
  };

  const disconnect = () => {
    socket?.disconnect();
    onDisconnect();
  };

  const onMessageFromServer = (data: NewMessageResponse): void => {
    if (typeof data === 'string') {
      // Unathorized Error Interceptor sends error messages as string
      toast.error(data);
      logout();
      navigate('/login');
      return;
    } else {
      setMessages((prev) => [...prev, data]);
    }
  };

  const onUsersChanged = (data: UsersChangedEventData): void => {
    if (data.event === 'joined') {
      setUsers((prev) => [...prev, data.user]);
    } else if (data.user) {
      toast(`${data.user.username} Left The Chat`);
      setUsers((prev) => prev.filter((user) => user.username !== data.user?.username));
    }
  };

  const onJoined = (data: NewcomerData): void => {
    setUsers(data.users);
    setMessages(data.messages);
  };

  const onConnectionEstablished = (): void => {
    console.info('onConnectionEstablished');
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (!user) {
      disconnect();
    }
  }, [user]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    // WS event handler
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Realtime Chat Event Handlers
    socket.on('joined', onJoined);
    socket.on('usersChanged', onUsersChanged);
    socket.on('message', onMessageFromServer);
    socket.on('connected', onConnectionEstablished);

    return () => {
      // WS Event Handlers
      socket.off('conect', onConnect);
      socket.off('joined', onJoined);

      // Realtime Chat Event Handlers
      socket.off('disconnect', onDisconnect);
      socket.off('usersChanged', onUsersChanged);
      socket.off('message', onMessageFromServer);
      socket.off('connected', onConnectionEstablished);
    };
  }, [socket]);

  return (
    <ChatContext.Provider value={{ join, sendMessage, users, messages, isConnected, disconnect }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
