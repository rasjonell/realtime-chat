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
  userName: string;
  joinError: boolean;
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
  joinError: false,
  isConnected: false,
  sendMessage: () => {},
});

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [joinError, setJoinError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isConnected, setIsConnected] = useState(false);

  const join = (newUserName: string) => {
    setUserName(newUserName);
    socket.connect();
    setJoinError(false);
    socket.emit('join', newUserName);
  };

  const sendMessage = (message: string): void => {
    const filtered = message.trim();
    if (filtered) {
      socket.emit('addNewMessage', filtered);
    }
  };

  const onConnect = (): void => {
    console.info('onConnect');
  };

  const onDisconnect = (): void => {
    setUserName('');
    setJoinError(false);
    setIsConnected(false);
  };

  const onMessageFromServer = (data: Message): void => {
    setMessages((prev) => [...prev, data]);
  };

  const onUserExists = () => {
    setJoinError(true);
    setIsConnected(false);
  };

  const onUsersChanged = (data: UsersChangedEventData): void => {
    // show toast
    if (data.event === 'joined') {
      setUsers((prev) => [...prev, data.user]);
    } else if (data.user) {
      setUsers((prev) => prev.filter((user) => user.userName !== data.user?.userName));
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
    if (!joinError && users.find((user) => user.userName === userName)) {
      setIsConnected(true);
    }
  }, [userName, users, joinError]);

  useEffect(() => {
    // WS Connection Events
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // RealTime Chat Events
    socket.on('joined', onJoined);
    socket.on('userExists', onUserExists);
    socket.on('usersChanged', onUsersChanged);
    socket.on('message', onMessageFromServer);
    socket.on('connected', onConnectionEstablished);

    return () => {
      // WS Connection Events
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

      // RealTime Chat Events
      socket.off('joined', onJoined);
      socket.off('userExists', onUserExists);
      socket.off('usersChanged', onUsersChanged);
      socket.off('message', onMessageFromServer);
      socket.off('connected', onConnectionEstablished);
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{ join, sendMessage, joinError, userName, users, messages, isConnected }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
