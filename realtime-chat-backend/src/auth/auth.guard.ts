import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

import { AuthConstants } from './constants';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient() as Socket;
    const token = this.extractTokenFromHeader(client);
    if (!token) {
      throw new WsException('Invalid credentials');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: AuthConstants.jwtSecret,
      });

      context.switchToWs().getData().username = payload.username;
    } catch {
      throw new WsException('Invalid credentials');
    }

    return true;
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    const [type, token] =
      client.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
