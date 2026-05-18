import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J05Controller } from './j05.controller';
import { J05Service } from './j05.service';
import { J05Entity } from './j05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J05Entity])],
  controllers: [J05Controller],
  providers: [J05Service],
  exports: [J05Service],
})
export class J05Module {}
