import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A10Controller } from './a10.controller';
import { A10Service } from './a10.service';
import { A10Entity } from './a10.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A10Entity])],
  controllers: [A10Controller],
  providers: [A10Service],
  exports: [A10Service],
})
export class A10Module {}
