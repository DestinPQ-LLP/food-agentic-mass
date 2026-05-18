import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F06Controller } from './f06.controller';
import { F06Service } from './f06.service';
import { F06Entity } from './f06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F06Entity])],
  controllers: [F06Controller],
  providers: [F06Service],
  exports: [F06Service],
})
export class F06Module {}
