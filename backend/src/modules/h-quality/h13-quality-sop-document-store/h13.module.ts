import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H13Controller } from './h13.controller';
import { H13Service } from './h13.service';
import { H13Entity } from './h13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H13Entity])],
  controllers: [H13Controller],
  providers: [H13Service],
  exports: [H13Service],
})
export class H13Module {}
