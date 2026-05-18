import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F02Controller } from './f02.controller';
import { F02Service } from './f02.service';
import { F02Entity } from './f02.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F02Entity])],
  controllers: [F02Controller],
  providers: [F02Service],
  exports: [F02Service],
})
export class F02Module {}
