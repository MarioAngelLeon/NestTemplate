import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { UdisService } from './udis.service';
import { UdisController } from './udis.controller';
import { UdiEntity } from './entities/udi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UdiEntity]),
  ],
  controllers: [UdisController],
  providers: [UdisService],
})
export class UdisModule {}
