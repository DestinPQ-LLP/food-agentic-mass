import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K10Controller } from './k10.controller';
import { K10Service } from './k10.service';
import { K10Entity } from './k10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K10Entity])],
  controllers: [K10Controller],
  providers: [K10Service],
  exports: [K10Service],
})
export class K10Module {}
