import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F13Controller } from './f13.controller';
import { F13Service } from './f13.service';
import { F13Entity } from './f13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F13Entity])],
  controllers: [F13Controller],
  providers: [F13Service],
  exports: [F13Service],
})
export class F13Module {}
