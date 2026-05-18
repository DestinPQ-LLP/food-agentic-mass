import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { J12Controller } from './j12.controller';
import { J12Service } from './j12.service';
import { J12Entity } from './j12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([J12Entity])],
  controllers: [J12Controller],
  providers: [J12Service],
  exports: [J12Service],
})
export class J12Module {}
