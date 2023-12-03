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

  signIn(userName: string, password: string): { accessToken: string } {
    const user = this.usersService.findOne(userName);

    if (user?.password !== password) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const payload = { sub: user.id, userName: user.userName };

    return { accessToken: this.jwtService.sign(payload) };
  }

  singUp(userName: string, password: string): { accessToken: string } {
    const user = this.usersService.findOne(userName);
    if (user) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = this.usersService.create(userName, password);
    const payload = { sub: newUser.id, userName: newUser.userName };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
