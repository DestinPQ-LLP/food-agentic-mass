import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A01Controller } from './a01.controller';
import { A01Service } from './a01.service';
import { A01Entity } from './a01.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A01Entity])],
  controllers: [A01Controller],
  providers: [A01Service],
  exports: [A01Service],
})
export class A01Module {}
