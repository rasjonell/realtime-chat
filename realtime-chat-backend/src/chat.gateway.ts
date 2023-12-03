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
    origin: 'http://localhost:5173',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('addNewMessage')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    this.logger.log(`[addNewMessage], ${data}`);
    const newMessage = this.chatService.handleMessageToServer(data, socket);
    this.server.emit('message', newMessage);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    this.logger.log('[join]', data);
    const user = this.chatService.handleNewUserJoin(socket.id, data);
    const newcomerData = this.chatService.retrieveNewConnectionData(socket.id);

    if (user) {
      this.server.sockets.sockets.get(socket.id).emit('joined', newcomerData);
      this.server.emit('usersChanged', { user, event: 'joined' });
    } else {
      this.server.sockets.sockets.get(socket.id).emit('userExists');
    }
  }

  afterInit(_server: Server) {
    this.logger.log('Chat ChatGateway Initiated');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const user = this.chatService.handleDisconnect(client.id);

    this.server.emit('usersChanged', { user, event: 'left' });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
