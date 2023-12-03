import { NestFactory } from '@nestjs/core';

import { ChatModule } from './chat.module';

async function bootstrap() {
  const chatApp = await NestFactory.create(ChatModule, {
    cors: { origin: 'http://localhost:5173' },
  });

  await chatApp.listen(3000);
}
bootstrap();
