import { WsException } from '@nestjs/websockets';
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

  addUser(userName: string): RealtimeChat.UserData[] {
    const userData = { userName };
    this.#users.set(userName, userData);
    this.logger.log(`User Added: ${userData}`);
    return this.users;
  }

  removeUser(userName: string): RealtimeChat.UserData[] {
    const existingUser = this.#users.get(userName);
    if (!existingUser) {
      throw new WsException(`Disconnected User Does Not Exist: ${userName}`);
    }

    this.logger.log(`User Removed: ${existingUser}`);
    this.#users.delete(userName);
    return this.users;
  }

  addMessage(message: RealtimeChat.Message): RealtimeChat.Message[] {
    this.#messages.push(message);
    this.logger.log(`Message Added ${message}]`);
    return this.#messages;
  }
}
