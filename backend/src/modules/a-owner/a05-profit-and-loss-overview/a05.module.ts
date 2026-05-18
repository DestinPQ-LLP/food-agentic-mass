import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A05Controller } from './a05.controller';
import { A05Service } from './a05.service';
import { A05Entity } from './a05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A05Entity])],
  controllers: [A05Controller],
  providers: [A05Service],
  exports: [A05Service],
})
export class A05Module {}
