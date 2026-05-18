import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M14Controller } from './m14.controller';
import { M14Service } from './m14.service';
import { M14Entity } from './m14.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M14Entity])],
  controllers: [M14Controller],
  providers: [M14Service],
  exports: [M14Service],
})
export class M14Module {}
