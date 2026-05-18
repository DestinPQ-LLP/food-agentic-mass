import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M01Controller } from './m01.controller';
import { M01Service } from './m01.service';
import { M01Entity } from './m01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M01Entity])],
  controllers: [M01Controller],
  providers: [M01Service],
  exports: [M01Service],
})
export class M01Module {}
