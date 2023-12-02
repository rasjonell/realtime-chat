import {
  MessageBody,
  OnGatewayInit,
  ConnectedSocket,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { ChatService } from './chat.service';
import { DataService } from './data/data.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  constructor(
    private readonly chatService: ChatService,
    private readonly dataService: DataService,
  ) {}

  @SubscribeMessage('messageToserver')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    const newMessage = this.chatService.handleMessageToServer(data, socket);
    this.server.emit('messageFromServer', newMessage);
  }

  afterInit(_server: Server) {
    this.logger.log('Chat ChatGateway Initiated');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const updatedUsers = this.chatService.handleDisconnect(client);

    this.server.emit('users', updatedUsers);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    const updatedUsers = this.chatService.handleConnect(client);

    client.send('connected', {
      users: updatedUsers,
      messages: this.dataService.messages,
    });

    this.server.emit('users', updatedUsers);
  }
}
