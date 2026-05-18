import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D06Controller } from './d06.controller';
import { D06Service } from './d06.service';
import { D06Entity } from './d06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([D06Entity])],
  controllers: [D06Controller],
  providers: [D06Service],
  exports: [D06Service],
})
export class D06Module {}
