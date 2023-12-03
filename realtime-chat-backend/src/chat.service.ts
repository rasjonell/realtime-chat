import { Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

import { DataService } from './data/data.service';

@Injectable()
export class ChatService {
  private logger = new Logger('ChatService');

  constructor(private readonly dataService: DataService) {}

  handleNewUserJoin(id: string, userName: string): RealtimeChat.UserData {
    return this.dataService.addUser(id, userName.trim());
  }

  handleMessageToServer(data: string, socket: Socket): RealtimeChat.Message {
    this.logger.log(`New Message ${data}`);
    const message = this.formatMessage(socket, data);

    this.dataService.addMessage(message);
    return message;
  }

  handleDisconnect(id: string): RealtimeChat.UserData {
    return this.dataService.removeUser(id);
  }

  formatMessage(socket: Socket, data: string): RealtimeChat.Message {
    const user = this.dataService.getUser(socket.id);

    return {
      message: data.trim(),
      createdAt: new Date(),
      author: user.userName,
    };
  }
}
