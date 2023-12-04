declare module RealtimeChat {
  type UserData = {
    username: string;
  };

  type User = Map<string, UserData>;

  type AuthUser = {
    id: number;
    username: string;
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
