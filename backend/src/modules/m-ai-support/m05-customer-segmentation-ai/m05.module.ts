import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M05Controller } from './m05.controller';
import { M05Service } from './m05.service';
import { M05Entity } from './m05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M05Entity])],
  controllers: [M05Controller],
  providers: [M05Service],
  exports: [M05Service],
})
export class M05Module {}
