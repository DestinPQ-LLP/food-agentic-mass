import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A15Controller } from './a15.controller';
import { A15Service } from './a15.service';
import { A15Entity } from './a15.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A15Entity])],
  controllers: [A15Controller],
  providers: [A15Service],
  exports: [A15Service],
})
export class A15Module {}
