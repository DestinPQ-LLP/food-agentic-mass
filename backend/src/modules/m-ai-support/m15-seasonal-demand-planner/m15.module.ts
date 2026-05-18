import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M15Controller } from './m15.controller';
import { M15Service } from './m15.service';
import { M15Entity } from './m15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M15Entity])],
  controllers: [M15Controller],
  providers: [M15Service],
  exports: [M15Service],
})
export class M15Module {}
