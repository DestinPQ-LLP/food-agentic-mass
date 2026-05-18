import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { H18Controller } from './h18.controller';
import { H18Service } from './h18.service';
import { H18Entity } from './h18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([H18Entity])],
  controllers: [H18Controller],
  providers: [H18Service],
  exports: [H18Service],
})
export class H18Module {}
