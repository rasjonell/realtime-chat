declare module RealtimeChat {
  type UserData = {
    userName: string;
  };

  type User = Map<string, UserData>;

  type AuthUser = {
    id: number;
    userName: string;
    password: string;
  };

  type Message = {
    author: string;
    message: string;
    createdAt: Date;
  };

  type NewcomerData = {
    users: UserData[];
    messages: Message[];
  };
}
