/**
 * Chat Service is responsible for handling WS Events.
 */
import { Injectable, Logger } from '@nestjs/common';

import { DataService } from './data/data.service';

@Injectable()
export class ChatService {
  private logger = new Logger('ChatService');

  constructor(private readonly dataService: DataService) {}

  handleNewUserJoin(
    id: string,
    username: string,
  ): RealtimeChat.UserData | null {
    return this.dataService.addUser(id, username.trim());
  }

  handleMessageToServer(data: string, username: string): RealtimeChat.Message {
    this.logger.log(`New Message ${data}`);
    const message = this.formatMessage(username, data);

    this.dataService.addMessage(message);
    return message;
  }

  retrieveNewConnectionData(id: string): RealtimeChat.NewcomerData {
    const messages = this.dataService.messages;
    const users = this.dataService.users.filter(
      (user) => user.username !== this.dataService.getUser(id)?.username,
    );

    return { users, messages };
  }

  handleDisconnect(id: string): RealtimeChat.UserData | null {
    return this.dataService.removeUser(id);
  }

  formatMessage(username: string, data: string): RealtimeChat.Message {
    return {
      author: username,
      message: data.trim(),
      createdAt: new Date(),
    };
  }
}
