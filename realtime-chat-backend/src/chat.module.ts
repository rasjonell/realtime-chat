import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { UsersModule } from './users/users.module';
import { DataModule } from './data/data.module';

@Module({
  controllers: [],
  imports: [UsersModule, DataModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
