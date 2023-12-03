import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { DataModule } from './data/data.module';

@Module({
  controllers: [],
  imports: [DataModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
