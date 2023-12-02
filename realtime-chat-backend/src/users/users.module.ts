import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { DataModule } from '../data/data.module';

@Module({
  imports: [DataModule],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
