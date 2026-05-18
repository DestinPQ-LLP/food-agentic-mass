import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C06Controller } from './c06.controller';
import { C06Service } from './c06.service';
import { C06Entity } from './c06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C06Entity])],
  controllers: [C06Controller],
  providers: [C06Service],
  exports: [C06Service],
})
export class C06Module {}
