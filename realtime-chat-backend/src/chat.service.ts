import { Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

import { DataService } from './data/data.service';
import { UsersService } from './users/users.service';

@Injectable()
export class ChatService {
  private logger = new Logger('ChatService');

  constructor(
    private readonly dataService: DataService,
    private readonly usersService: UsersService,
  ) {}

  handleMessageToServer(data: string, socket: Socket): RealtimeChat.Message {
    this.logger.log(`New Message ${data}`);
    const message = this.formatMessage(socket, data);

    this.dataService.addMessage(message);
    return message;
  }

  handleConnect(socket: Socket): RealtimeChat.UserData[] {
    const userName = this.usersService.retrieveUsername(socket);
    return this.usersService.addUser(userName);
  }

  handleDisconnect(socket: Socket): RealtimeChat.UserData[] {
    const userName = this.usersService.retrieveUsername(socket);
    return this.usersService.removeUser(userName);
  }

  formatMessage(socket: Socket, data: string): RealtimeChat.Message {
    const author = this.usersService.retrieveUsername(socket);

    return {
      author,
      message: data.trim(),
      createdAt: new Date(),
    };
  }
}
