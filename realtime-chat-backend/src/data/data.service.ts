/*
 * DataModule and Service are an abstraction over the
 * Data Access Layer. If we decide to have a database,
 * we can change the internals of this service, without
 * refactoring the services depending on it.
 */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DataService {
  #messages: RealtimeChat.Message[] = [];
  #users: RealtimeChat.User = new Map<string, RealtimeChat.UserData>();

  private logger = new Logger('DataService');

  get users(): RealtimeChat.UserData[] {
    return Array.from(this.#users.values());
  }

  get messages(): RealtimeChat.Message[] {
    return this.#messages;
  }

  addUser(id: string, username: string): RealtimeChat.UserData | null {
    if ([...this.#users.values()].find((user) => user.username === username)) {
      return null;
    }

    const userData = { username };
    this.#users.set(id, userData);
    this.logger.log(`User Added: ${username}`);
    return userData;
  }

  getUser(id: string): RealtimeChat.UserData | undefined {
    return this.#users.get(id);
  }

  removeUser(id: string): RealtimeChat.UserData | null {
    const existingUser = this.#users.get(id);
    if (!existingUser) {
      console.warn('Disconnecting user that does not exist');
      return null;
    }

    this.logger.log(`User Removed: ${existingUser.username}`);
    this.#users.delete(id);
    return existingUser;
  }

  addMessage(message: RealtimeChat.Message): RealtimeChat.Message[] {
    this.#messages.push(message);
    this.logger.log(`Message Added ${message.message}]`);
    return this.#messages;
  }
}
