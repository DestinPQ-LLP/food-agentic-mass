import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C12Controller } from './c12.controller';
import { C12Service } from './c12.service';
import { C12Entity } from './c12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C12Entity])],
  controllers: [C12Controller],
  providers: [C12Service],
  exports: [C12Service],
})
export class C12Module {}
