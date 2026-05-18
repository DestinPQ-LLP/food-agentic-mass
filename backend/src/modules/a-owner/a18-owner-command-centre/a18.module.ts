import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A18Controller } from './a18.controller';
import { A18Service } from './a18.service';
import { A18Entity } from './a18.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A18Entity])],
  controllers: [A18Controller],
  providers: [A18Service],
  exports: [A18Service],
})
export class A18Module {}
