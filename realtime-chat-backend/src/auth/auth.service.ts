import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  signIn(
    username: string,
    password: string,
  ): { username: string; accessToken: string } {
    const user = this.usersService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const payload = { sub: user.id, username: user.username };

    return { username, accessToken: this.jwtService.sign(payload) };
  }

  singUp(
    username: string,
    password: string,
  ): { username: string; accessToken: string } {
    const user = this.usersService.findOne(username);
    if (user) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = this.usersService.create(username, password);
    const payload = { sub: newUser.id, username: newUser.username };

    return { username, accessToken: this.jwtService.sign(payload) };
  }
}
