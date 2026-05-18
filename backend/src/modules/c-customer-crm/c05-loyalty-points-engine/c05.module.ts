import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C05Controller } from './c05.controller';
import { C05Service } from './c05.service';
import { C05Entity } from './c05.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C05Entity])],
  controllers: [C05Controller],
  providers: [C05Service],
  exports: [C05Service],
})
export class C05Module {}
