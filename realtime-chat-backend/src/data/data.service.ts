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

  addUser(id: string, userName: string): RealtimeChat.UserData {
    const userData = { userName };
    this.#users.set(id, userData);
    this.logger.log(`User Added: ${userData}`);
    return userData;
  }

  getUser(id: string): RealtimeChat.UserData | undefined {
    return this.#users.get(id);
  }

  removeUser(id: string): RealtimeChat.UserData {
    const existingUser = this.#users.get(id);
    if (!existingUser) {
      console.warn('Disconnecting user that does not exist');
    }

    this.logger.log(`User Removed: ${existingUser}`);
    this.#users.delete(id);
    return existingUser;
  }

  addMessage(message: RealtimeChat.Message): RealtimeChat.Message[] {
    this.#messages.push(message);
    this.logger.log(`Message Added ${message}]`);
    return this.#messages;
  }
}
