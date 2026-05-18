import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { K12Controller } from './k12.controller';
import { K12Service } from './k12.service';
import { K12Entity } from './k12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([K12Entity])],
  controllers: [K12Controller],
  providers: [K12Service],
  exports: [K12Service],
})
export class K12Module {}
