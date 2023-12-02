import { Module } from '@nestjs/common';
import { DataService } from './data.service';

@Module({
  exports: [DataService],
  providers: [DataService],
})
export class DataModule {}
