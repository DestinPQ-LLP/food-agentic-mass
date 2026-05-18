import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A13Controller } from './a13.controller';
import { A13Service } from './a13.service';
import { A13Entity } from './a13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A13Entity])],
  controllers: [A13Controller],
  providers: [A13Service],
  exports: [A13Service],
})
export class A13Module {}
