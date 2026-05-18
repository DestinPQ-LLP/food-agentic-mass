import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A06Controller } from './a06.controller';
import { A06Service } from './a06.service';
import { A06Entity } from './a06.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A06Entity])],
  controllers: [A06Controller],
  providers: [A06Service],
  exports: [A06Service],
})
export class A06Module {}
