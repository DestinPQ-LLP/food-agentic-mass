import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A12Controller } from './a12.controller';
import { A12Service } from './a12.service';
import { A12Entity } from './a12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A12Entity])],
  controllers: [A12Controller],
  providers: [A12Service],
  exports: [A12Service],
})
export class A12Module {}
