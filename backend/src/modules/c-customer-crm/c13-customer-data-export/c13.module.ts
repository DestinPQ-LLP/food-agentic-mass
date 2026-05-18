import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C13Controller } from './c13.controller';
import { C13Service } from './c13.service';
import { C13Entity } from './c13.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C13Entity])],
  controllers: [C13Controller],
  providers: [C13Service],
  exports: [C13Service],
})
export class C13Module {}
