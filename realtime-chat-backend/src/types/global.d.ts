declare module RealtimeChat {
  type UserData = {
    userName: string;
  };

  type User = Map<string, UserData>;

  type Message = {
    author: string;
    message: string;
    createdAt: Date;
  };
}
