import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';

import { DataService } from '../data/data.service';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(private readonly dataService: DataService) {}

  get usersCount(): number {
    return this.dataService.users.length;
  }

  get users(): RealtimeChat.UserData[] {
    return this.dataService.users;
  }

  addUser(usersName: string): RealtimeChat.UserData[] {
    const updatedUsers = this.dataService.addUser(usersName);
    this.logger.log(`New User Added ${usersName}`);
    return updatedUsers;
  }

  removeUser(usersName: string): RealtimeChat.UserData[] {
    const updatedUsers = this.dataService.removeUser(usersName);
    this.logger.log(`User Removed ${usersName}`);
    return updatedUsers;
  }

  retrieveUsername(client: Socket): string {
    const userName = client.handshake.headers['CHAT-USERNAME'] as string;
    if (!userName) {
      throw new WsException('Username is not provided');
    }

    return userName;
  }
}
