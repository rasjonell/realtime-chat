import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  #id = 0;
  #users: RealtimeChat.AuthUser[] = [];

  findOne(userName: string): RealtimeChat.AuthUser | undefined {
    return this.#users.find((user) => user.userName === userName);
  }

  create(userName: string, password: string): RealtimeChat.AuthUser {
    const user = { id: ++this.#id, userName, password };
    this.#users.push(user);
    return user;
  }
}
