import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { socket } from '../socket';

export type User = {
  userName: string;
  avatarURL: string;
};

export type Message = {
  author: string;
  message: string;
  createdAt: string;
};

type UsersChangedEventData = {
  user: User;
  event: 'joined' | 'left';
};

type ChatContextData = {
  users: User[];
  userName: string;
  messages: Message[];
  isConnected: boolean;
  join: (userName: string) => void;
  sendMessage: (message: string) => void;
};

export const ChatContext = createContext<ChatContextData>({
  users: [],
  userName: '',
  messages: [],
  join: () => {},
  isConnected: false,
  sendMessage: () => {},
});

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isConnected, setIsConnected] = useState(false);

  const join = (userName: string) => {
    console.log('joining');

    socket.connect();
    socket.emit('join', userName);
    setIsConnected(true);
    setUserName(userName);
  };

  const sendMessage = (message: string): void => {
    console.log('sending message', message);

    socket.emit('addNewMessage', message);
  };

  const onConnect = (): void => {
    console.log('onConnect');
  };

  const onDisconnect = (): void => {
    console.log('onDisconnect');
    setIsConnected(false);
  };

  const onMessageFromServer = (data: Message): void => {
    console.log('onMessageFromServer data', data);
    setMessages((prev) => [...prev, data]);
  };

  const onUsersChanged = (data: UsersChangedEventData): void => {
    console.log('onUsers data', data);
    // show toast
    if (data.event === 'joined') {
      setUsers((prev) => [...prev, data.user]);
    } else {
      setUsers((prev) => prev.filter((user) => user.userName !== data.user.userName));
    }
  };

  const onConnectionEstablished = (data: any): void => {
    console.log('onConnectionEstablished', data);
  };

  useEffect(() => {
    // WS Connection Events
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // RealTime Chat Events
    socket.on('usersChanged', onUsersChanged);
    socket.on('message', onMessageFromServer);
    socket.on('connected', onConnectionEstablished);

    return () => {
      // WS Connection Events
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

      // RealTime Chat Events
      socket.off('usersChanged', onUsersChanged);
      socket.off('message', onMessageFromServer);
      socket.off('connected', onConnectionEstablished);
    };
  }, []);

  return (
    <ChatContext.Provider value={{ join, sendMessage, userName, users, messages, isConnected }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
