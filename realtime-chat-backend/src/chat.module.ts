import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  imports: [DataModule, AuthModule, UsersModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
