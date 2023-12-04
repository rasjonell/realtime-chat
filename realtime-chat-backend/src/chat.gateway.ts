/**
 * Chat Gateway is a WebSocketGateway. It is responsible for
 * setting up WS events, authorization, and exception handling.
 */
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
import { Socket, Server } from 'socket.io';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';

import { ChatService } from './chat.service';
import { AuthGuard } from './auth/auth.guard';
import { WebsocketExceptionsFilter } from './ws-exception.filter';

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

  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @UseFilters(new WebsocketExceptionsFilter())
  @SubscribeMessage('addNewMessage')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody('text') text: string,
    @MessageBody('username') username: string,
  ): void {
    this.logger.log(`[addNewMessage] ${text}`);
    const newMessage = this.chatService.handleMessageToServer(text, username);
    this.server.emit('message', newMessage);
  }

  @UseGuards(AuthGuard)
  @UseFilters(new WebsocketExceptionsFilter())
  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody('username') username: string,
  ): void {
    const user = this.chatService.handleNewUserJoin(socket.id, username);
    const newcomerData = this.chatService.retrieveNewConnectionData(socket.id);

    if (!user) {
      this.logger.log('Already existing user trying to join');
    } else {
      this.server.sockets.sockets.get(socket.id).emit('joined', newcomerData);
      this.server.emit('usersChanged', { user, event: 'joined' });
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
