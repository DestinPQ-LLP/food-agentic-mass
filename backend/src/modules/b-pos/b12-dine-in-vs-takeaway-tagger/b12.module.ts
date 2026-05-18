import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B12Controller } from './b12.controller';
import { B12Service } from './b12.service';
import { B12Entity } from './b12.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B12Entity])],
  controllers: [B12Controller],
  providers: [B12Service],
  exports: [B12Service],
})
export class B12Module {}
