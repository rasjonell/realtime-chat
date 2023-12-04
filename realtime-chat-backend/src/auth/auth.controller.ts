/**
 * Auth Controller is responsible for the REST
 * endpoints for sign-in and sign-up functionality.
 */
import { Body, Post, HttpCode, Controller, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInBody: { username: string; password: string }) {
    return this.authService.signIn(signInBody.username, signInBody.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpBody: { username: string; password: string }) {
    return this.authService.singUp(signUpBody.username, signUpBody.password);
  }
}
