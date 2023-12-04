/**
 * UsersModule and Service are responsible for User registration
 * and retrieval. Chat members and users are separate entities.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  #id = 0;
  #users: RealtimeChat.AuthUser[] = [];

  findOne(username: string): RealtimeChat.AuthUser | undefined {
    return this.#users.find((user) => user.username === username);
  }

  create(username: string, password: string): RealtimeChat.AuthUser {
    const user = { id: ++this.#id, username, password };
    this.#users.push(user);
    return user;
  }
}
