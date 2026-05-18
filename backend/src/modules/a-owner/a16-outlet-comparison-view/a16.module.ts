import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A16Controller } from './a16.controller';
import { A16Service } from './a16.service';
import { A16Entity } from './a16.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A16Entity])],
  controllers: [A16Controller],
  providers: [A16Service],
  exports: [A16Service],
})
export class A16Module {}
