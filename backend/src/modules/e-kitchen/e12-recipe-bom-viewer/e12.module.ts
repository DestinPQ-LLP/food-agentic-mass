import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { E12Controller } from './e12.controller';
import { E12Service } from './e12.service';
import { E12Entity } from './e12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([E12Entity])],
  controllers: [E12Controller],
  providers: [E12Service],
  exports: [E12Service],
})
export class E12Module {}
