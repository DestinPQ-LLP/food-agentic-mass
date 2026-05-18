import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F18Controller } from './f18.controller';
import { F18Service } from './f18.service';
import { F18Entity } from './f18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F18Entity])],
  controllers: [F18Controller],
  providers: [F18Service],
  exports: [F18Service],
})
export class F18Module {}
