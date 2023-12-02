import { NestFactory } from '@nestjs/core';

import { ChatModule } from './chat.module';

async function bootstrap() {
  const chatApp = await NestFactory.create(ChatModule);
  await chatApp.listen(3000);
}
bootstrap();
