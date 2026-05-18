import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M13Controller } from './m13.controller';
import { M13Service } from './m13.service';
import { M13Entity } from './m13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M13Entity])],
  controllers: [M13Controller],
  providers: [M13Service],
  exports: [M13Service],
})
export class M13Module {}
